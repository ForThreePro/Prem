let handler = async (m, { conn, command, args }) => {
    let chat = global.db.data.chats[m.chat] ||= {}
    if (!args[0]) return m.reply(`💻 *CYBER BOT* ➔.${command} on/off`)
    chat[command] = args[0].toLowerCase() === 'on'
    m.reply(`*${command.toUpperCase()}* ${chat[command]? '✅ ON' : '❌ OFF'}`)
}
handler.command = /^(welcome|bye|kick)$/i
handler.admin = true
handler.group = true
export default handler