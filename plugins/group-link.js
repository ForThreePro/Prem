let handler = async (m, { conn }) => {
    try {
        let link = await conn.groupInviteCode(m.chat)
        let text = `╭─❒ *『 𝗧𝗘𝗔𝗠 𝗡𝗜𝗚𝗛𝗧𝗪𝗜𝗦𝗛 』* ❒
│ 🔗 *LINK DEL GRUPO*
│
│ ⚡ https://chat.whatsapp.com/${link}
│
│ > *“Comparte con responsabilidad”*
╰─────────────────❒`
        m.reply(text)
    } catch {
        m.reply(`╭─❒ *『 𝗧𝗘𝗔𝗠 𝗡𝗜𝗚𝗛𝗧𝗪𝗜𝗦𝗛 』* ❒
│ ⛈️ *ERROR*
│
│ ⚡ *No pude obtener el link*
│ 🌙 *¿Soy administrador del grupo?*
╰─────────────────❒`)
    }
}

handler.help = ['link']
handler.tags = ['grupos']
handler.command = ['link', 'linkgroup']
handler.group = true
handler.botAdmin = true

export default handler