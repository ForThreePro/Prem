// Desarrollado por Ander + Ander
import fetch from 'node-fetch'
import { FormData, Blob } from 'formdata-node'
import { fileTypeFromBuffer } from 'file-type'
import { spawn } from 'child_process'
import crypto from 'crypto'
import fs from 'fs'
import os from 'os'
import path from 'path'

/* ====== SONGFINDER SCRAPER ====== */
const SONGFINDER_API = 'https://songfinder.gg/api/recognize/url'
const UGUU_UPLOAD = 'https://uguu.se/upload'
const CLIP_SECONDS = 30

const SF_HEADERS = {
  accept: '*/*', 'content-type': 'application/json',
  origin: 'https://songfinder.gg', referer: 'https://songfinder.gg/',
  'user-agent': 'Mozilla/5.0'
}
function makeToken() { return crypto.randomBytes(24).toString('base64url') }

async function recognizeUrl(audioUrl) {
  const res = await fetch(SONGFINDER_API, {
    method: 'POST', headers: SF_HEADERS,
    body: JSON.stringify({ url: audioUrl, startTime: 0, recaptchaToken: makeToken() })
  })
  const json = await res.json()
  if (!json?.success ||!json?.track) throw new Error('No se encontró la canción')
  return json.track
}

async function uploadUguu(buffer) {
  const { ext, mime } = (await fileTypeFromBuffer(buffer)) || { ext: 'mp3', mime: 'audio/mpeg' }
  const blob = new Blob([buffer], { type: mime })
  const form = new FormData()
  form.append('files[]', blob, crypto.randomBytes(5).toString('hex') + '.' + ext)
  const res = await fetch(UGUU_UPLOAD, { method: 'POST', body: form })
  const json = await res.json()
  return json?.files?.[0]?.url
}

function prepareClip(buffer, seconds = CLIP_SECONDS) {
  return new Promise(resolve => {
    const tmpIn = path.join(os.tmpdir(), `sf_${Date.now()}`)
    fs.writeFileSync(tmpIn, buffer)
    const ff = spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-i', tmpIn, '-t', String(seconds), '-vn', '-acodec', 'libmp3lame', '-ar', '44100', '-ac', '2', '-b:a', '128k', '-f', 'mp3', 'pipe:1'])
    const chunks = []
    ff.stdout.on('data', c => chunks.push(c))
    ff.on('close', () => { try{fs.unlinkSync(tmpIn)}catch{}; resolve(chunks.length? Buffer.concat(chunks) : buffer) })
  })
}

/* ====== DLSRV YT SCRAPER TUYO ====== */
const API_BASE = 'https://embed.dlsrv.online'
const YT_SEARCH_API = 'https://api.darrell-bots.com/api/search/youtube' // Para buscar por nombre
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
const AUDIO_QUALITY = '128'

function apiHeaders(videoId) {
  return {
    accept: '*/*', 'accept-language': 'es-419,es;q=0.9',
    'content-type': 'application/json', origin: API_BASE,
    referer: `${API_BASE}/v2/full?videoId=${videoId}`, 'user-agent': USER_AGENT
  }
}

async function getInfo(videoId) {
  const res = await fetch(`${API_BASE}/api/info`, {
    method: 'POST', headers: apiHeaders(videoId),
    body: JSON.stringify({ videoId })
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const data = await res.json()
  if (data.status!== 'info' ||!data.info) throw new Error('No se pudo obtener info')
  return {
    title: data.info.title || 'YouTube',
    author: data.info.author || '',
    duration: Number(data.info.duration) || 0,
    thumbnail: data.info.thumbnail || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
  }
}

async function getDownload(videoId, format, quality) {
  const res = await fetch(`${API_BASE}/api/download/${format}`, {
    method: 'POST', headers: apiHeaders(videoId),
    body: JSON.stringify({ videoId, format, quality: String(quality) })
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const data = await res.json()
  if (data.status!== 'tunnel' ||!data.url) throw new Error('No se pudo generar link')
  return { url: data.url, filename: data.filename || '' }
}

async function searchYT(query) {
  const res = await fetch(`${YT_SEARCH_API}?query=${encodeURIComponent(query)}`)
  const json = await res.json()
  return json.data[0] // primer resultado
}

async function getAudioFromYT(url) {
  const videoId = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/)?.[1]
  if (!videoId) throw new Error('YT ID inválido')
  const info = await getInfo(videoId)
  const tunnel = await getDownload(videoId, 'mp3', AUDIO_QUALITY)
  return {...info, downloadUrl: tunnel.url, filename: tunnel.filename }
}

function formatDuration(seconds) {
  const s = Math.floor(seconds || 0)
  const min = Math.floor((s % 3600) / 60)
  const sec = s % 60
  return `${min}:${String(sec).padStart(2, '0')}`
}

/* ====== HANDLER ====== */
let handler = async (m, { conn }) => {
  let q = m.quoted? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime ||!/audio|video/.test(mime)) return m.reply(`🎵 *BUSCADOR SONG*\n\nResponde a un audio/video con.song`)

  await m.react('🔍')
  let buffer = await q.download()
  if (!buffer) return m.reply('❌ Error al descargar')

  try {
    // PASO 1: DETECTAR CON SONGFINDER
    let clip = await prepareClip(buffer, CLIP_SECONDS)
    let url = await uploadUguu(clip)
    let song = await recognizeUrl(url)

    await m.reply(`✅ *Encontrado:* \n*${song.title}*\n*${song.artist}*\n\nBuscando en YouTube...`)
    await m.react('📥')

    // PASO 2: BUSCAR EN YT Y DESCARGAR CON TU SCRAPER
    let yt = await searchYT(`${song.title} ${song.artist}`)
    let audio = await getAudioFromYT(yt.url)
    let audioRes = await fetch(audio.downloadUrl)
    let audioBuffer = await audioRes.buffer()

    // PASO 3: ENVIAR
    await conn.sendMessage(m.chat, {
      audio: audioBuffer,
      mimetype: 'audio/mpeg',
      fileName: `${audio.title}.mp3`
    }, { quoted: m })

    await conn.sendMessage(m.chat, {
      image: { url: audio.thumbnail },
      caption: `🎶 *${audio.title}*\n*Artista:* ${audio.author}\n*Duración:* ${formatDuration(audio.duration)}`
    }, { quoted: m })

    await m.react('✅')

  } catch(e) {
    await m.react('❌')
    m.reply(`❌ Error: ${e.message}`)
  }
}

handler.help = ['song']
handler.tags = ['buscador']
handler.command = ['song']
export default handler