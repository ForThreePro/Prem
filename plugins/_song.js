// Desarrollado por Ander
import fetch from 'node-fetch'
import { FormData, Blob } from 'formdata-node'
import { fileTypeFromBuffer } from 'file-type'
import { spawn } from 'child_process'
import crypto from 'crypto'
import fs from 'fs'
import os from 'os'
import path from 'path'

const SONGFINDER_API = 'https://songfinder.gg/api/recognize/url'
const UGUU_UPLOAD = 'https://uguu.se/upload'
const CLIP_SECONDS = 30 // Lo subí a 30s porque 60s tarda mucho y 15s falla
const MAX_INPUT_BYTES = 60 * 1024 * 1024

const SF_HEADERS = {
  accept: '*/*',
  'accept-language': 'es-419,es;q=0.9,es-ES;q=0.8,en;q=0.7',
  'content-type': 'application/json',
  origin: 'https://songfinder.gg',
  referer: 'https://songfinder.gg/',
  'sec-ch-ua': '"Not;A=Brand";v="8", "Chromium";v="150"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': '"Windows"',
  'sec-fetch-dest': 'empty',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'same-origin',
  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
}

function makeToken() {
  return crypto.randomBytes(24).toString('base64url')
}

async function recognizeUrl(audioUrl, startTime = 0) {
  const res = await fetch(SONGFINDER_API, {
    method: 'POST',
    headers: SF_HEADERS,
    body: JSON.stringify({ url: audioUrl, startTime, recaptchaToken: makeToken() })
  })
  const texto = await res.text()
  let json = null
  try { json = JSON.parse(texto) } catch {}
  if (!res.ok) throw new Error(`SongFinder HTTP ${res.status}`)
  if (!json?.success || !json?.track) throw new Error(json?.message || json?.error || 'No se encontró coincidencia')
  const t = json.track
  return {
    title: t.title || 'Desconocido',
    artist: t.artist || 'Desconocido',
    album: t.album || '',
    releaseDate: t.releaseDate || '',
    genre: t.genre || '',
    label: t.label || '',
    coverArt: t.coverArt || '',
    isrc: t.isrc || ''
  }
}

async function uploadUguu(buffer) {
  const { ext, mime } = (await fileTypeFromBuffer(buffer)) || { ext: 'mp3', mime: 'audio/mpeg' }
  const blob = new Blob([buffer], { type: mime })
  const form = new FormData()
  form.append('files[]', blob, crypto.randomBytes(5).toString('hex') + '.' + ext)
  const res = await fetch(UGUU_UPLOAD, {
    method: 'POST',
    body: form,
    headers: { 'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64)' }
  })
  const json = await res.json()
  const url = json?.files?.[0]?.url
  if (!url) throw new Error('uguu.se no devolvió enlace')
  return url
}

function prepareClip(buffer, seconds = CLIP_SECONDS) {
  return new Promise(resolve => {
    const tmpIn = path.join(os.tmpdir(), `sf_${Date.now()}_${crypto.randomBytes(3).toString('hex')}`)
    try { fs.writeFileSync(tmpIn, buffer) } catch { return resolve(buffer) }
    const ff = spawn('ffmpeg', [
      '-hide_banner', '-loglevel', 'error',
      '-i', tmpIn, '-t', String(seconds),
      '-vn', '-acodec', 'libmp3lame', '-ar', '44100', '-ac', '2', '-b:a', '128k',
      '-f', 'mp3', 'pipe:1'
    ])
    const chunks = []
    const limpiar = () => { try { fs.unlinkSync(tmpIn) } catch {} }
    ff.stdout.on('data', c => chunks.push(c))
    ff.on('error', () => { limpiar(); resolve(buffer) })
    ff.on('close', code => { limpiar(); if (code === 0 && chunks.length) return resolve(Buffer.concat(chunks)); resolve(buffer) })
  })
}

async function identifySong(buffer, options = {}) {
  if (!Buffer.isBuffer(buffer)) throw new Error('Se esperaba un Buffer')
  if (buffer.length > (options.maxBytes || MAX_INPUT_BYTES)) throw new Error('El archivo es demasiado grande')
  const clip = await prepareClip(buffer, options.seconds || CLIP_SECONDS)
  const url = await uploadUguu(clip)
  const track = await recognizeUrl(url, options.startTime || 0)
  return { ...track, sourceUrl: url }
}

// ===== HANDLER =====
let handler = async (m, { conn }) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime || !/audio|video/.test(mime)) return m.reply(`🎵 *BUSCADOR SONGFINDER*\n\nResponde a un audio, nota de voz o video con .song`)

  await m.react('🔍')
  let buffer = await q.download()
  if (!buffer) return m.reply('❌ Error al descargar')

  try {
    let song = await identifySong(buffer)
    await m.react('✅')

    let txt = `🎶 *ENCONTRADO CON SONGFINDER* 🎶\n\n`
    txt += `*Título:* ${song.title}\n`
    txt += `*Artista:* ${song.artist}\n`
    if(song.album) txt += `*Álbum:* ${song.album}\n`
    if(song.releaseDate) txt += `*Año:* ${song.releaseDate.split('-')[0]}\n`
    if(song.genre) txt += `*Género:* ${song.genre}\n`

    if(song.coverArt) {
      await conn.sendMessage(m.chat, { image: { url: song.coverArt }, caption: txt }, { quoted: m })
    } else {
      await conn.reply(m.chat, txt, m)
    }

  } catch(e) {
    await m.react('❌')
    m.reply(`❌ No se encontró\n*Error:* ${e.message}\n\n*Tip:* Usa 15-30s del coro con voz`)
  }
}

handler.help = ['song']
handler.tags = ['buscador']
handler.command = ['song']
handler.register = false 
export default handler