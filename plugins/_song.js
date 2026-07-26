// Desarrollado por Ander
import fetch from 'node-fetch'
import { FormData, Blob } from 'formdata-node'
import { fileTypeFromBuffer } from 'file-type'
import { spawn } from 'child_process'
import crypto from 'crypto'
import fs from 'fs'
import os from 'os'
import path from 'path'
import yts from 'yt-search'

/* ====== CONFIG ====== */
const keySasuke = 'sasuke' // KEY para EvoGB
const SONGFINDER_API = 'https://songfinder.gg/api/recognize/url'
const UGUU_UPLOAD = 'https://uguu.se/upload'
const CLIP_SECONDS = 30

const BOX_TOP = `╭─「 🎵 *BUSCADOR DE MUSICA* 」`
const BOX_MID = `│`
const BOX_BOT = `╰─────────────────`

/* ====== SONGFINDER ====== */
async function recognizeUrl(audioUrl) {
  const res = await fetch(SONGFINDER_API, {
    method: 'POST',
    headers: {'content-type': 'application/json', 'origin': 'https://songfinder.gg'},
    body: JSON.stringify({ url: audioUrl, startTime: 0, recaptchaToken: crypto.randomBytes(24).toString('base64url') })
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
  return (await res.json())?.files?.[0]?.url
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

/* ====== EVOGB PLAY ====== */
async function searchYT(query) {
  let res = await yts(query)
  let vid = res.videos[0]
  if (!vid) throw new Error('No se encontró en YouTube')
  return vid
}

async function downloadEvoGB(url) {
  let apiUrl = `https://api.evogb.org/dl/ytmp3?url=${encodeURIComponent(url)}&key=${keySasuke}`
  let json = await (await fetch(apiUrl)).json()
  if (!json.status) throw new Error('Error al descargar')
  return { downloadUrl: json.data.dl, title: json.data.title }
}

/* ====== HANDLER.SONG ====== */
let handler = async (m, { conn }) => {
  let q = m.quoted? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime ||!/audio|video/.test(mime)) return m.reply(`${BOX_TOP}
${BOX_MID} *Como usar:* Responde a un audio o video
${BOX_MID} *Comando:*.song
${BOX_BOT}`)

  await m.react('🔍')
  let buffer = await q.download()
  if (!buffer) return m.reply('❌ Error al descargar')

  try {
    // PASO 1: DETECTAR
    let msg = await conn.reply(m.chat, `${BOX_TOP}
${BOX_MID} 🔍 *Detectando canción...*
${BOX_MID} ⏳ Procesando ${CLIP_SECONDS}s de audio
${BOX_BOT}`, m)

    let clip = await prepareClip(buffer, CLIP_SECONDS)
    let url = await uploadUguu(clip)
    let song = await recognizeUrl(url)
    let searchQuery = `${song.title} ${song.artist}`.replace(/\[.*?\]|\(feat.*?\)/gi, '').trim()

    await conn.editMessage(msg.key, `${BOX_TOP}
${BOX_MID} ✅ *Canción encontrada*
${BOX_MID} 🎶 *Título:* ${song.title}
${BOX_MID} 👤 *Artista:* ${song.artist}
${BOX_BOT}`)

    await new Promise(r => setTimeout(r, 1500))
    await m.react('📥')

    // PASO 2: DESCARGAR
    await conn.editMessage(msg.key, `${BOX_TOP}
${BOX_MID} 📥 *Descargando de YouTube...*
${BOX_MID} 🔎 Buscando: ${searchQuery}
${BOX_BOT}`)

    let vid = await searchYT(searchQuery)
    let audio = await downloadEvoGB(vid.url)
    let audioBuffer = await (await fetch(audio.downloadUrl)).buffer()

    // PASO 3: ENVIAR RESULTADO FINAL
    await conn.editMessage(msg.key, `${BOX_TOP}
${BOX_MID} ✅ *Descarga completada*
${BOX_MID} 🎶 *Título:* ${song.title}
${BOX_MID} 👤 *Artista:* ${song.artist}
${BOX_MID} ⏱️ *Duración:* ${vid.timestamp}
${BOX_MID} 👁️ *Vistas:* ${vid.views.toLocaleString()}
${BOX_BOT}`)

    await conn.sendMessage(m.chat, {
      audio: audioBuffer,
      mimetype: 'audio/mpeg',
      fileName: `${song.title}.mp3`
    }, { quoted: m })
    await m.react('✅')

  } catch(e) {
    await m.react('❌')
    m.reply(`${BOX_TOP}
${BOX_MID} ❌ *Error*
${BOX_MID} ${e.message}
${BOX_BOT}`)
  }
}

handler.help = ['song']
handler.tags = ['buscador']
handler.command = ['song']
export default handler