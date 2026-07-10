import ytSearch from 'yt-search'

let handler = async (m, { conn, text }) => {
    if (!text) return m.reply(`⚡ *RAYO PREM* | BUSCADOR
    
╭─〔 *Team Nightwish* 〕─╮
│ 📌 *Uso:* .google <texto>
│ 🔎 *Ejemplo:* .google kpop nightwish
╰──────────────────────╯
    
> "El trueno encuentra lo que buscas"`)

    await m.react('⚡')
    
    try {
        let search = await ytSearch(text)
        let results = search.videos.slice(0, 5)
        
        if (!results.length) return m.reply('🌙 *Rayo Prem* | No se encontró nada con ese trueno.')

        let txt = `⚡ *RAYO PREM* | RESULTADOS ⚡
╭─〔 *Team Nightwish* 〕─╮
│ 🔎 *Busqueda:* ${text}
│ 📊 *Encontrados:* ${results.length}
╰──────────────────────╯\n\n`
        
        txt += results.map((v, i) => {
            return `〔 ${i + 1} 〕 *${v.title}*
┠⏱️ *Duración:* ${v.timestamp}
┠👁️ *Vistas:* ${v.views.toLocaleString()}
┠📅 *Subido:* ${v.ago}
┗🔗 ${v.url}`
        }).join('\n\n')

        txt += `\n\n> "Elige el rayo que quieras descargar"`

        await conn.sendMessage(m.chat, {
            image: { url: 'https://files.catbox.moe/8z7k9w.jpg' }, // Banner Nightwish
            caption: txt,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                externalAdReply: {
                    title: 'RAYO PREM - BUSCADOR',
                    body: 'Team Nightwish | Buscador Oficial',
                    thumbnail: { url: 'https://files.catbox.moe/8z7k9w.jpg' },
                    sourceUrl: 'https://youtube.com'
                }
            }
        }, { quoted: m })

        await m.react('✅')
        
    } catch (e) {
        console.error(e)
        await m.react('❌')
        m.reply('⛈️ *Rayo Prem* | Error en la conexión. Intenta de nuevo.')
    }
}

handler.help = ['google <busqueda>']
handler.tags = ['search']
handler.command = /^google|gsearch$/i

export default handler