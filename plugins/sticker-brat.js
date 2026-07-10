import axios from 'axios'
import fs from 'fs'
import { exec } from 'child_process'

const handler = async (m, { conn, text }) => {
    let texto = text || m.quoted?.text
    if (!texto) return m.reply('⚡ *RAYO PREM* ➔ Escribe el texto para el sticker.') // Cambiado

    await m.react('⚡') // Cambiado

    let tmpImg = `./tmp-${Date.now()}.png`
    let tmpWebp = `./tmp-${Date.now()}.webp`

    try {
        let endpoint = `https://sylphyy.xyz/tools/brat?text=${encodeURIComponent(texto)}&color=white&fondo=black&type=&api_key=sylphy-6f150d` // Cambiado fondo a black
        let response = await axios.get(endpoint, { responseType: 'arraybuffer' })
        fs.writeFileSync(tmpImg, response.data)

        await new Promise((resolve, reject) => {
            exec(`ffmpeg -i ${tmpImg} -vcodec libwebp -vf "scale=512:512:force_original_aspect_ratio=decrease,format=rgba,pad=512:512:(ow-iw)/2:(oh-ih)/2:color=#00000" ${tmpWebp}`, (err) => {
                if (err) reject(err)
                else resolve()
            })
        })

        await conn.sendMessage(m.chat, { 
            sticker: fs.readFileSync(tmpWebp), 
            packname: "Team Nightwish", // Cambiado
            author: "Whois Yallico" // Cambiado
        }, { quoted: m })

        await m.react('🌙') // Cambiado
    } catch (e) {
        await m.react('❌')
        await m.reply('⚡ *RAYO PREM ERROR* ➔ Falló al generar el sticker brat.') // Cambiado
    } finally {
        if (fs.existsSync(tmpImg)) fs.unlinkSync(tmpImg)
        if (fs.existsSync(tmpWebp)) fs.unlinkSync(tmpWebp)
    }
}

handler.help = ['brat']
handler.tags = ['sticker']
handler.command = ['brat']

export default handler