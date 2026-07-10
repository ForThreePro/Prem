import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`⚡ *RAYO PREM* | DESCARGADOR SPOTIFY

╭─〔 *Team Nightwish* 〕─╮
│ 📌 *Uso:* ${usedPrefix + command} <cancion>
│ 🎵 *Ejemplo:* ${usedPrefix + command} nightwish
╰──────────────────────╯

> "El trueno descarga hasta de Spotify"`)

  await m.react('🔍')

  try {
    let searchRes = await fetch(`https://api.evogb.org/search/spotify?query=${encodeURIComponent(text)}&key=sasuke`)
    let searchData = await searchRes.json()

    if (!searchData.status ||!searchData.result[0]) {
        await m.react('❌')
        return m.reply(`🌙 *Rayo Prem* | No encontré "${text}" en Spotify.`)
    }

    await m.react('⏳')

    let song = searchData.result[0]
    let dlRes = await fetch(`https://api.evogb.org/dl/spotify?url=${encodeURIComponent(song.link)}&key=sasuke`)
    let dlData = await dlRes.json()

    if (!dlData.status ||!dlData.data) {
        await m.react('❌')
        return m.reply(`⛈️ *Rayo Prem* | Error al obtener el enlace de descarga.`)
    }

    let cap = `⚡ *RAYO PREM* | SPOTIFY DOWNLOADER ⚡
╭─〔 *Team Nightwish* 〕─╮
│ 🎵 *Título:* ${dlData.data.name}
│ 👤 *Artista:* ${dlData.data.artist}
│ 💿 *Álbum:* ${dlData.data.album}
│ ⏱️ *Duración:* ${dlData.data.duration}
│ 📅 *Año:* ${dlData.data.year}
│ ⚡ *Estado:* Descargando
╰──────────────────────╯

> "Extrayendo el sonido del trueno"`

    await conn.sendMessage(m.chat, {
      image: { url: dlData.data.image },
      caption: cap,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        externalAdReply: {
          title: `RAYO PREM - ${dlData.data.name}`,
          body: `Team Nightwish | ${dlData.data.artist}`,
          thumbnail: { url: dlData.data.image },
          sourceUrl: song.link
        }
      }
    }, { quoted: m })

    await conn.sendMessage(m.chat, {
      audio: { url: dlData.data.url },
      mimetype: 'audio/mpeg',
      fileName: `${dlData.data.name} - ${dlData.data.artist}.mp3`
    }, { quoted: m })

    await m.react('✅')

  } catch (e) {
    console.error(e)
    await m.react('❌')
    m.reply(`⛈️ *Rayo Prem* | Ocurrió un error inesperado. Intenta de nuevo.`)
  }
}

handler.help = ['spotify <busqueda>']
handler.tags = ['downloader']
handler.command = /^(spotify|sp)$/i

export default handler