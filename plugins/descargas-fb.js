import axios from 'axios'

let handler = async (m, { conn, text }) => {
    if (!text) return conn.reply(m.chat, `⚡ *RAYO PREM* | DESCARGADOR FB

╭─〔 *Team Nightwish* 〕─╮
│ 📌 *Uso:*.fb <link>
│ 📺 *Ejemplo:*.fb https://facebook.com/watch/xxx
╰──────────────────────╯

> "El trueno descarga hasta lo privado"`, m)

    await m.react('⏳')

    try {
        const key = Buffer.from('ZWt1c2Fz', 'base64').toString('utf-8').split('').reverse().join('')
        const { data } = await axios.get(`https://api.evogb.org/dl/facebook?url=${encodeURIComponent(text)}&key=${key}`)

        if (!data.status ||!data.resultados) return m.reply('🌙 *Rayo Prem* | No pude procesar ese enlace.')

        let video = data.resultados[0]
        let caption = `⚡ *RAYO PREM* | FACEBOOK DOWNLOADER ⚡
╭─〔 *Team Nightwish* 〕─╮
│ 📺 *Plataforma:* Facebook
│ 🎬 *Calidad:* ${video.quality || 'HD'}
│ ⚡ *Estado:* Descargado
╰──────────────────────╯

> "Contenido extraído por el rayo"`

        await conn.sendMessage(m.chat, {
            video: { url: video.url },
            caption: caption,
            mimetype: 'video/mp4'
        }, { quoted: m })

        await m.react('✅')

    } catch (e) {
        console.error(e)
        await m.react('❌')
        m.reply('⛈️ *Rayo Prem* | Error al descargar. El video puede ser privado o fue eliminado.')
    }
}

handler.help = ['fb <link>']
handler.tags = ['downloader']
handler.command = /^(fb|facebook|fbdl)$/i

export default handler
