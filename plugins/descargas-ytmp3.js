import yts from 'yt-search'
import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`⚡ *RAYO PREM* | YOUTUBE MP3

╭─〔 *Team Nightwish* 〕─╮
│ 📌 *Uso:* ${usedPrefix + command} <link>
│ 🎵 *Ejemplo:* ${usedPrefix + command} https://youtube.com/watch?v=xxx
╰──────────────────────╯

> "El trueno convierte video en sonido"`)

  await m.react('🔍')

  try {
    let res = await yts(text)
    let vid = res.videos[0]
    if (!vid) {
      await m.react('❌')
      return m.reply(`🌙 *Rayo Prem* | No se encontró el video con ese link.`)
    }

    await m.react('⏳')

    let apiUrl = `https://api.evogb.org/dl/ytmp3?url=${encodeURIComponent(vid.url)}&key=sasuke`
    let json = await (await fetch(apiUrl)).json()

    if (!json.status ||!json.data) {
      await m.react('❌')
      return m.reply(`⛈️ *Rayo Prem* | Error al procesar el audio.`)
    }

    let cap = `⚡ *RAYO PREM* | YOUTUBE TO MP3 ⚡
╭─〔 *Team Nightwish* 〕─╮
│ 🎵 *Título:* ${vid.title}
│ ⏱️ *Duración:* ${vid.timestamp}
│ 👤 *Canal:* ${vid.author.name}
│ 👁️ *Vistas:* ${vid.views.toLocaleString()}
│ 📁 *Formato:* MP3 320kbps
╰──────────────────────╯

> "Extrayendo el sonido del trueno"`

    await conn.sendMessage(m.chat, {
      image: { url: vid.thumbnail },
      caption: cap,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        externalAdReply: {
          title: `RAYO PREM - ${vid.title}`,
          body: `Team Nightwish | MP3 Descargado`,
          thumbnail: { url: vid.thumbnail },
          sourceUrl: vid.url
        }
      }
    }, { quoted: m })

    await conn.sendMessage(m.chat, {
      audio: { url: json.data.dl },
      mimetype: 'audio/mpeg',
      fileName: `${vid.title}.mp3`
    }, { quoted: m })

    await m.react('✅')

  } catch (e) {
    console.error(e)
    await m.react('❌')
    m.reply(`⛈️ *Rayo Prem* | Error inesperado al descargar.`)
  }
}

handler.help = ['ytmp3 <url>']
handler.tags = ['downloader']
handler.command = /^(ytmp3|yta)$/i

export default handler