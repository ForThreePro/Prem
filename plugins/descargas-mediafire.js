/**
 * 📂 COMANDO: Nexus MediaFire Downloader
 * 📝 DESCRIPCIÓN: Descarga directa y procesamiento de archivos desde MediaFire.
 * 👤 DESARROLLADOR: Barboza Developer
 * ⚡ PROYECTO: Nexus Bot Engine
 */
import fetch from "node-fetch"

let handler = async (m, { conn, text, usedPrefix, command }) => {
    const key = Buffer.from('c2FzdWtl', 'base64').toString('utf-8')
    
    if (!text) return conn.reply(m.chat, `⚡ *RAYO PREM* | DESCARGADOR MEDIAFIRE

╭─〔 *Team Nightwish* 〕─╮
│ 📌 *Uso:* ${usedPrefix + command} <link>
│ 📂 *Ejemplo:* ${usedPrefix + command} https://mediafire.com/xxx
╰──────────────────────╯

> "El rayo atraviesa cualquier nube"`, m)

    await m.react('📥')
    
    try {
        let response = await fetch(`https://api.evogb.org/dl/mediafire?url=${encodeURIComponent(text)}&key=${key}`)
        let result = await response.json()
        
        if (!result.status || !result.data) {
            await m.react('⚠️')
            return m.reply('🌙 *Rayo Prem* | No se encontró el archivo. Verifica que el link sea válido.')
        }

        let { name, size, date, dl } = result.data
        
        let caption = `⚡ *RAYO PREM* | MEDIAFIRE DOWNLOADER ⚡
╭─〔 *Team Nightwish* 〕─╮
│ 📂 *Archivo:* ${name}
│ ⚖️ *Peso:* ${size}
│ 📅 *Subido:* ${date}
│ ⚡ *Estado:* Descargando
╰──────────────────────╯

> "Extrayendo datos de la nube..."`

        await conn.sendFile(m.chat, dl, name, caption, m)
        await m.react('✅')
        
    } catch (e) {
        console.error(e)
        await m.react('❌')
        m.reply('⛈️ *Rayo Prem* | Error crítico en el servidor. Intenta más tarde.')
    }
}

handler.help = ['mediafire <link>']
handler.tags = ['downloader']
handler.command = /^(mediafire|mf|mediafiredl)$/i

export default handler