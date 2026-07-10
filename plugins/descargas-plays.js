import yts from 'yt-search'
import fetch from 'node-fetch'

let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) return m.reply(`⚡ *RAYO PREM* | REPRODUCTOR

╭─〔 *Team Nightwish* 〕─╮
│ 📌 *Uso:*.play <cancion> - Audio
│ 📌 *Uso:*.play2 <cancion> - Video
│ 🎵 *Ejemplo:*.play nightwish
╰──────────────────────╯

> "El trueno reproduce lo que pidas"`)

  await m.react('🔍')

  let res = await yts(text)
  let vid = res.videos[0]
  if (!vid) {
    await m.react('❌')
    return m.reply(`🌙 *Rayo Prem* | No encontré nada con ese trueno.`)
  }

  await m.react('⏳')

  let isVideo = command === 'play2'
  let apiUrl = isVideo
   ? `https://api.evogb.org/dl/ytmp4?url=${encodeURIComponent(vid.url)}&quality=720&key=sasuke`
    : `https://api.evogb.org/dl/ytmp3?url=${encodeURIComponent(vid.url)}&key=sasuke`

  let json = await (await fetch(apiUrl)).json()
  if (!json.status ||!json.data) {
    await m.react('❌')
    return m.reply(`⛈️ *Rayo Prem* | Error al procesar la descarga. Intenta de nuevo.`)
  }

  let cap = `⚡ *RAYO PREM* | DESCARGA YOUTUBE ⚡
╭─〔 *Team Nightwish* 〕─╮
│ 🎵 *Título:* ${vid.title}
│ ⏱️ *Duración:* ${vid.timestamp}
│ 👤 *Artista:* ${vid.author.name}
│ 👁️ *Vistas:* ${vid.views.toLocaleString()}
│ 📁 *Formato:* ${isVideo? 'VIDEO MP4 720p' : 'AUDIO MP3'}
╰──────────────────────╯

> "Canalizando el trueno..."`

  await conn.sendMessage(m.chat, {
    image: { url: vid.thumbnail },
    caption: cap,
    contextInfo: {
      forwardingScore: 999,
      isForwarded: true,
      externalAdReply: {
        title: `RAYO PREM - ${vid.title}`,
        body: `Team Nightwish | ${isVideo? 'Video' : 'Audio'} Descargado`,
        thumbnail: { url: vid.thumbnail },
        sourceUrl: vid.url
      }
    }
  }, { quoted: m })

  await conn.sendMessage(m.chat, {
    [isVideo? 'video' : 'audio']: { url: json.data.dl },
    mimetype: isVideo? 'video/mp4' : 'audio/mpeg',
    fileName: `${vid.title}.${isVideo? 'mp4' : 'mp3'}`
  }, { quoted: m })

  await m.react('✅')
}

handler.help = ['play <busqueda>', 'play2 <busqueda>']
handler.tags = ['downloader']
handler.command = /^(play|play2)$/i

export default handler