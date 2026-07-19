let handler = async (m, { conn, command, args }) => {
    let chat = global.db.data.chats[m.chat]
    if (!chat) chat = global.db.data.chats[m.chat] = {}

    if (!args[0]) return m.reply(`💻 *CYBER BOT* ➔ Usa:.${command} on/off\n> Ejemplo:.${command} on`)

    let estado = args[0].toLowerCase() === 'on'
    chat[command] = estado

    let nombre = command === 'welcome'? 'BIENVENIDAS' : command === 'bye'? 'DESPEDIDAS' : 'EXPULSIONES'

    await m.reply(`╭─❒ *『 𝗖𝗬𝗕𝗘𝗥 𝗕𝗢𝗧 』* ❒
│ ${estado? '✅ ACTIVADO' : '❌ DESACTIVADO'}
│
│ 💻 *Módulo:* ${nombre}
│ ⚡ *Estado:* ${estado? 'ON' : 'OFF'}
╰─────────────────❒`)
}

handler.help = ['welcome', 'bye', 'kick']
handler.tags = ['group']
handler.command = /^(welcome|bye|kick)$/i
handler.admin = true
handler.group = true

export default handler