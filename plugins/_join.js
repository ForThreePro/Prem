import { areJidsSameUser } from '@whiskeysockets/baileys'

let handler = async (m, { conn, text, isOwner }) => {
    if (!isOwner) return m.reply(`❌ *ACCESO DENEGADO*\nSolo mi Creador puede usar este comando ⚡`)

    if (!text) return m.reply(`⚡ *RAYO PREM JOIN*\n\n*Uso:*.join https://chat.whatsapp.com/xxxxx\n\n*Mándame el link del grupo y entro volando* 💨`)

    let link = text.match(/chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/)
    if (!link) return m.reply('❌ *LINK INVÁLIDO*\nEnvíame un link de grupo válido de WhatsApp')

    let code = link[1]

    // Mensaje estilo Thunder
    await m.reply(`⚡ *CONECTANDO CON EL SERVIDOR...*\n⏳ *Uniéndome al grupo...*\n\n📢 *Si hay verificación, acéptenme admins* 🐼`)

    try {
        await new Promise(r => setTimeout(r, 3000)) // delay 3s estilo thunder
        let res = await conn.groupAcceptInvite(code)

        if(res) {
            let groupMetadata = await conn.groupMetadata(res + '@g.us')
            let groupName = groupMetadata.subject

            await conn.sendMessage(res + '@g.us', {
                text: `⚡ *THUNDER BOT CONECTADO* ⚡\n\nHola! Soy *Rayo Prem Bot* 🐼💗\nGrupo: *${groupName}*\n\nGracias por aceptarme admins ✨\nUsa *.menu* para ver mis comandos`,
                buttons: [
                    {buttonId: '.menu', buttonText: {displayText: '📜 MENU'}, type: 1},
                    {buttonId: '.info', buttonText: {displayText: 'ℹ️ INFO'}, type: 1}
                ],
                footer: 'Thunder Bot © 2026'
            }, { quoted: m })

            await m.reply(`✅ *UNIÓN EXITOSA* ⚡\n*Grupo:* ${groupName}\n*ID:* ${res}`)
        }
    } catch(e) {
        console.log(e)
        let err = e.toString()
        if(err.includes('already')) return m.reply('❌ *ERROR 001*\nYa me encuentro en ese grupo ⚡')
        if(err.includes('revoked')) return m.reply('❌ *ERROR 002*\nEl enlace expiró o fue revocado')
        if(err.includes('forbidden')) return m.reply('❌ *ERROR 003*\nWhatsApp bloqueó la unión.\n*Solución:* Agrégame manual desde el grupo')
        m.reply(`❌ *ERROR 404*\nNo pude unirme al grupo\n*Razón:* ${err}`)
    }
}

handler.help = ['join <link>']
handler.tags = ['owner']
handler.command = ['join', 'unirbot', 'entrar']
handler.owner = true
handler.premium = false

export default handler