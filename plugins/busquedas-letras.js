
import axios from 'axios'

let handler = async (m, { conn, text }) => {
    if (!text) return m.reply(`⚡ *RAYO PREM* | BUSCADOR DE LETRAS
    
╭─〔 *Team Nightwish* 〕─╮
│ 📌 *Uso:* .letra <cancion>
│ 🎵 *Ejemplo:* .letra nightwish
╰──────────────────────╯
    
> "El trueno guarda todas las letras"`)

    await m.react('🎵')
    
    try {
        let { data } = await axios.get(`https://api.delirius.store/search/lyrics?query=${encodeURIComponent(text)}`)
        let res = data.data
        
        if (!res || !res.lyrics) return m.reply('🌙 *Rayo Prem* | No encontré la letra de esa canción.')

        let txt = `⚡ *RAYO PREM* | LETRA ENCONTRADA ⚡
╭─〔 *Team Nightwish* 〕─╮
│ 🎵 *Título:* ${res.title}
│ 👤 *Artista:* ${res.artists}
│ 📀 *Album:* ${res.album || 'Desconocido'}
╰──────────────────────╯

🛸╞═════ 𝗟𝗘𝗧𝗥𝗔 ═════╡🛸

${res.lyrics}

╭─〔 *Team Nightwish* 〕─╮
│ ⚡ *Bot:* Rayo Prem
│ 🌙 *Powered by:* Team Nightwish
╰──────────────────────╯`

        await conn.sendMessage(m.chat, {
            image: { url: 'https://files.evogb.win/91Vvmc.jpg' }, // Banner Nightwish
            caption: txt,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                externalAdReply: {
                    title: `RAYO PREM - ${res.title}`,
                    body: `Team Nightwish | ${res.artists}`,
                    thumbnail: { url: 'https://files.evogb.win/91Vvmc.jpg' },
                    sourceUrl: 'https://spotify.com'
                }
            }
        }, { quoted: m })

        await m.react('✅')
        
    } catch (e) {
        console.error(e)
        await m.react('❌')
        m.reply('⛈️ *Rayo Prem* | Error al buscar la letra. Intenta con otro nombre.')
    }
}

handler.help = ['letra <cancion>']
handler.tags = ['search']
handler.command = /^(letra|lyrics|ly)$/i

export default handler