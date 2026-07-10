import yts from 'yt-search'
import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`⚡ *RAYO PREM* | YOUTUBE MP4

╭─〔 *Team Nightwish* 〕─╮
│ 📌 *Uso:* ${usedPrefix + command} <link>
│ 🎬 *Ejemplo:* ${usedPrefix + command} https://youtube.com/watch?v=xxx
╰──────────────────────╯

> "El trueno descarga en alta calidad"`)

  await m.react('🔍')

  try {
    let res = await yts(text)
    let vid = res.videos[0]
    if (!vid) {
      await m.react('❌')
      return m.reply(`🌙 *Rayo Prem* | No se encontró el video con ese link.`)
    }

    await m.react('⏳')

    let apiUrl = `https://api.evogb.org/dl/ytmp4?url=${encodeURIComponent(vid.url)}&quality=720&key=sasuke`
    let json = await (await fetch(apiUrl)).json()

    if (!json.status ||!json.data) {
      await m.react('❌')
      return m.reply(`⛈️ *Rayo Prem* | Error al procesar el video.`)
    }

    let cap = `⚡ *RAYO PREM* | YOUTUBE TO MP4 ⚡
╭─〔 *Team Nightwish* 〕─╮
│ 🎬 *Título:* ${vid.title}
│ ⏱️ *Duración:* ${vid.timestamp}
│ 👤 *Canal:* ${vid.author.name}
│ 👁️ *Vistas:* ${vid.views.toLocaleString()}
│ 📁 *Formato:* MP4 720p HD
╰──────────────────────╯

> "Descargando en calidad trueno"`

    await conn.sendMessage(m.chat, {
      image: { url: vid.thumbnail },
      caption: cap,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        externalAdReply: {
          title: `RAYO PREM - ${vid.title}`,
          body: `Team Nightwish | Video HD Descargado`,
          thumbnail: { url: vid.thumbnail },
          sourceUrl: vid.url
        }
      }
    }, { quoted: m })

    await conn.sendMessage(m.chat, {
      video: { url: json.data.dl },
      mimetype: 'video/mp4',
      fileName: `${vid.title}.mp4`,
      caption: `⚡ *${vid.title}*`
    }, { quoted: m })

    await m.react('✅')

  } catch (e) {
    console.error(e)
    await m.react('❌')
    m.reply(`⛈️ *Rayo Prem* | Error inesperado al descargar el video.`)
  }
}

handler.help = ['ytmp4 <url>']
handler.tags = ['downloader']
handler.command = /^(ytmp4|ytv)$/i

export default handler