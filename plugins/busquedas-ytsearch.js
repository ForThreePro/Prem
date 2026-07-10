
import axios from 'axios'

let handler = async (m, { conn, text }) => {
    if (!text) return m.reply(`⚡ *RAYO PREM* | BUSCADOR YOUTUBE
    
╭─〔 *Team Nightwish* 〕─╮
│ 📌 *Uso:* .yts <busqueda>
│ 📺 *Ejemplo:* .yts nightwish live
╰──────────────────────╯
    
> "El rayo escanea todo YouTube"`)

    await m.react('📺')
    
    try {
        let { data } = await axios.get(`https://api.delirius.store/search/ytsearch?q=${encodeURIComponent(text)}`)
        let results = data.data.slice(0, 5)
        
        if (!results.length) return m.reply('🌙 *Rayo Prem* | No se encontraron videos con ese trueno.')

        let txt = `⚡ *RAYO PREM* | YOUTUBE SEARCH ⚡
╭─〔 *Team Nightwish* 〕─╮
│ 🔎 *Busqueda:* ${text}
│ 📊 *Resultados:* ${results.length}
╰──────────────────────╯\n\n`
        
        txt += results.map((v, i) => {
            return `〔 ${i + 1} 〕 *${v.title}*
┠⏱️ *Duración:* ${v.duration}
┠👁️ *Vistas:* ${v.views}
┠📺 *Canal:* ${v.author?.name || 'Desconocido'}
┗🔗 ${v.url}`
        }).join('\n\n')

        txt += `\n\n> "Responde con el número para descargar"`

        await conn.sendMessage(m.chat, {
            image: { url: 'https://files.evogb.win/91Vvmc.jpg' }, // Banner Nightwish
            caption: txt,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                externalAdReply: {
                    title: 'RAYO PREM - YOUTUBE SEARCH',
                    body: 'Team Nightwish | Buscador Oficial',
                    thumbnail: { url: 'https://files.evogb.win/91Vvmc.jpg' },
                    sourceUrl: 'https://youtube.com'
                }
            }
        }, { quoted: m })

        await m.react('✅')
        
    } catch (e) {
        console.error(e)
        await m.react('❌')
        m.reply('⛈️ *Rayo Prem* | Error al conectar con YouTube. Intenta de nuevo.')
    }
}

handler.help = ['yts <busqueda>']
handler.tags = ['search']
handler.command = /^(yts|ytsearch|buscar)$/i

export default handler