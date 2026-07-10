import axios from 'axios'

let handler = async (m, { conn, text }) => {
    if (!text) return conn.reply(m.chat, `⚡ *RAYO PREM* | DESCARGADOR IG

╭─〔 *Team Nightwish* 〕─╮
│ 📌 *Uso:*.ig <link>
│ 📷 *Ejemplo:*.ig https://instagram.com/reel/xxx
╰──────────────────────╯

> "El rayo descarga hasta tus recuerdos"`, m)

    await m.react('⏳')

    try {
        const key = Buffer.from('ZWt1c2Fz', 'base64').toString('utf-8').split('').reverse().join('')
        const { data } = await axios.get(`https://api.evogb.org/dl/instagram?url=${encodeURIComponent(text)}&key=${key}`)

        if (!data.status ||!data.data) return m.reply('🌙 *Rayo Prem* | No pude descargar ese enlace.')

        let media = data.data[0]
        let type = media.type || 'video'
        let caption = `⚡ *RAYO PREM* | INSTAGRAM DOWNLOADER ⚡
╭─〔 *Team Nightwish* 〕─╮
│ 📷 *Tipo:* ${type.toUpperCase()}
│ 👤 *De:* Instagram
│ ⚡ *Estado:* Descargado
╰──────────────────────╯

> "Contenido traído por el trueno"`

        if (type === 'video') {
            await conn.sendMessage(m.chat, {
                video: { url: media.url },
                caption: caption,
                mimetype: 'video/mp4'
            }, { quoted: m })
        } else {
            await conn.sendMessage(m.chat, {
                image: { url: media.url },
                caption: caption
            }, { quoted: m })
        }

        await m.react('✅')

    } catch (e) {
        console.error(e)
        await m.react('❌')
        m.reply('⛈️ *Rayo Prem* | Error al descargar. Verifica que el link sea público.')
    }
}

handler.help = ['ig <link>']
handler.tags = ['downloader']
handler.command = /^(ig|instagram|igdl)$/i

export default handler