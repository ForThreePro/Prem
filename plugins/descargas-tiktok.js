import fetch from 'node-fetch'

let handler = async (m, { conn, text, command }) => {
    if (!text) return m.reply(`⚡ *RAYO PREM* | TIKTOK DOWNLOADER

╭─〔 *Team Nightwish* 〕─╮
│ 📌 *Uso:*.tiktok <link> - Descargar
│ 📌 *Uso:*.tiktoksearch <busqueda>
│ 🎵 *Ejemplo:*.tiktoksearch baile
╰──────────────────────╯

> "El rayo descarga hasta tus FYP"`)

    await m.react('⏳')

    try {
        if (command === 'tiktoksearch') {
            let res = await (await fetch(`https://api.evogb.org/search/tiktok?query=${encodeURIComponent(text)}&key=sasuke`)).json()
            if (!res.status ||!res.data[0]) return m.reply(`🌙 *Rayo Prem* | No encontré videos de "${text}"`)

            let video = res.data[0]
            let caption = `⚡ *RAYO PREM* | TIKTOK SEARCH ⚡
╭─〔 *Team Nightwish* 〕─╮
│ 🎵 *Título:* ${video.title}
│ 👤 *Autor:* ${video.author.nickname}
│ ❤️ *Likes:* ${video.digg_count?.toLocaleString() || '0'}
│ 👁️ *Vistas:* ${video.play_count?.toLocaleString() || '0'}
╰──────────────────────╯

> "Primer resultado encontrado"`

            await conn.sendFile(m.chat, video.dl, 'tiktok.mp4', caption, m)

        } else if (command === 'tiktok') {
            let res = await (await fetch(`https://api.evogb.org/dl/tiktok?url=${encodeURIComponent(text)}&key=sasuke`)).json()
            if (!res.status ||!res.data) return m.reply(`⛈️ *Rayo Prem* | No pude descargar ese link.`)

            let data = res.data
            let dl = Array.isArray(data.dl)? data.dl[0] : data.dl

            let caption = `⚡ *RAYO PREM* | TIKTOK DOWNLOADER ⚡
╭─〔 *Team Nightwish* 〕─╮
│ 🎵 *Título:* ${data.title}
│ 👤 *Autor:* ${data.author?.nickname || 'Desconocido'}
│ ❤️ *Likes:* ${data.digg_count?.toLocaleString() || '0'}
│ ⚡ *Estado:* Sin marca de agua
╰──────────────────────╯

> "Contenido extraído por el trueno"`

            await conn.sendFile(m.chat, dl, 'tiktok.mp4', caption, m)
        }

        await m.react('✅')

    } catch (e) {
        console.error(e)
        await m.react('❌')
        m.reply('⛈️ *Rayo Prem* | Error al procesar el video de TikTok.')
    }
}

handler.help = ['tiktok <link>', 'tiktoksearch <busqueda>']
handler.tags = ['downloader', 'search']
handler.command = /^(tiktok|tiktoksearch|tt|ttsearch)$/i

export default handler