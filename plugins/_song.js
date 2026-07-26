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
const CLIP_SECONDS = 30
const MAX_INPUT_BYTES = 60 * 1024 * 1024
const PREVIEW_SECONDS = 15 // Duración del preview que mandará

const SF_HEADERS = {
  accept: '*/*',
  'accept-language': 'es-419,es;q=0.9',
  'content-type': 'application/json',
  origin: 'https://songfinder.gg',
  referer: 'https://songfinder.gg/',
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
  if (!json?.success || !json?.track) throw new Error(json?.message || 'No se encontró')
  return json.track
}

async function uploadUguu(buffer) {
  const { ext, mime } = (await fileTypeFromBuffer(buffer)) || { ext: 'mp3', mime: 'audio/mpeg' }
  const blob = new Blob([buffer], { type: mime })
  const form = new FormData()
  form.append('files[]', blob, crypto.randomBytes(5).toString('hex') + '.' + ext)
  const res = await fetch(UGUU_UPLOAD, { method: 'POST', body: form })
  const json = await res.json()
  const url = json?.files?.[0]?.url
  if (!url) throw new Error('uguu.se falló')
  return url
}

function prepareClip(buffer, seconds = CLIP_SECONDS) {
  return new Promise(resolve => {
    const tmpIn = path.join(os.tmpdir(), `sf_${Date.now()}`)
    try { fs.writeFileSync(tmpIn, buffer) } catch { return resolve(buffer) }
    const ff = spawn('ffmpeg', [
      '-hide_banner', '-loglevel', 'error',
      '-i', tmpIn, '-t', String(seconds),
      '-vn', '-acodec', 'libmp3lame', '-ar', '44100', '-ac', '2', '-b:a', '128k',
      '-f', 'mp3', 'pipe:1'
    ])
    const chunks = []
    ff.stdout.on('data', c => chunks.push(c))
    ff.on('close', () => { try{fs.unlinkSync(tmpIn)}catch{}; resolve(chunks.length? Buffer.concat(chunks) : buffer) })
  })
}

function cutPreview(buffer, seconds = PREVIEW_SECONDS) {
  return new Promise(resolve => {
    const tmpIn = path.join(os.tmpdir(), `prev_${Date.now()}`)
    const tmpOut = path.join(os.tmpdir(), `prev_out_${Date.now()}.mp3`)
    fs.writeFileSync(tmpIn, buffer)
    const ff = spawn('ffmpeg', [
      '-hide_banner', '-loglevel', 'error',
      '-i', tmpIn, '-t', String(seconds),
      '-acodec', 'libmp3lame', '-ar', '44100', '-ac', '2', '-b:a', '128k',
      tmpOut
    ])
    ff.on('close', () => { 
      try{fs.unlinkSync(tmpIn)}catch{}
      try{
        const out = fs.readFileSync(tmpOut)
        fs.unlinkSync(tmpOut)
        resolve(out)
      }catch{ resolve(null) }
    })
  })
}

async function identifySong(buffer) {
  if (!Buffer.isBuffer(buffer)) throw new Error('Se esperaba un Buffer')
  if (buffer.length > MAX_INPUT_BYTES) throw new Error('Archivo muy grande')
  const clip = await prepareClip(buffer, CLIP_SECONDS)
  const url = await uploadUguu(clip)
  const track = await recognizeUrl(url)
  const preview = await cutPreview(clip, PREVIEW_SECONDS) // Cortamos 15s del mismo clip
  return { ...track, sourceUrl: url, preview }
}

// ===== HANDLER =====
let handler = async (m, { conn }) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime || !/audio|video/.test(mime)) return m.reply(`🎵 Responde a un audio/video con .song`)

  await m.react('🔍')
  let buffer = await q.download()
  if (!buffer) return m.reply('❌ Error al descargar')

  try {
    let song = await identifySong(buffer)
    await m.react('✅')

    let txt = `🎶 *ENCONTRADO* 🎶\n\n*${song.title}*\n*${song.artist}*`
    if(song.album) txt += `\n*Álbum:* ${song.album}`

    // Mandar info + portada
    if(song.coverArt) {
      await conn.sendMessage(m.chat, { image: { url: song.coverArt }, caption: txt }, { quoted: m })
    } else {
      await conn.reply(m.chat, txt, m)
    }

    // Mandar preview de 15s
    if(song.preview) {
      await conn.sendMessage(m.chat, { 
        audio: song.preview, 
        mimetype: 'audio/mpeg',
        ptt: false // false = nota de voz normal, true = nota de voz circular
      }, { quoted: m })
    }

  } catch(e) {
    await m.react('❌')
    m.reply(`❌ No se encontró\n*Error:* ${e.message}`)
  }
}

handler.help = ['song']
handler.tags = ['buscador']
handler.command = ['song']
export default handler