let handler = async (m, { conn, isOwner, isAdmin, isROwner, command }) => {
  if (!m.isGroup) return m.reply(`⚡ *Rayo Prem* | Este comando solo funciona en grupos.`)

  let chat = global.db.data.chats[m.chat]
  let type = command.toLowerCase()

  if (!(isAdmin || isOwner || isROwner)) {
    global.dfail('admin', m, conn)
    return
  }

  switch (type) {
    case 'banchat': case 'banearchat':
      if (chat.isBanned) return m.reply(`⛈️ *RAYO PREM* | Este chat ya está bajo bloqueo.`)
      
      chat.isBanned = true
      await conn.reply(m.chat, `⛈️ *RAYO PREM* | BLOQUEO ACTIVADO ⛈️
╭─〔 *Team Nightwish* 〕─╮
│ 🚫 *Estado:* CHAT BANEADO
│ ⚡ *Acción:* El bot queda inactivo
│ 📢 *Nota:* No responderé a comandos
│ 👑 *Ejecutado por:* @${m.sender.split('@')[0]}
╰──────────────────────╯

> "El trueno selló este grupo"`, m, { mentions: [m.sender] })
      break

    case 'unbanchat': case 'desbanearchat':
      if (!chat.isBanned) return m.reply(`🌙 *RAYO PREM* | Este chat no está baneado.`)
      
      chat.isBanned = false
      await conn.reply(m.chat, `⚡ *RAYO PREM* | BLOQUEO DESACTIVADO ⚡
╭─〔 *Team Nightwish* 〕─╮
│ 🌀 *Estado:* CHAT LIBERADO
│ ⚡ *Acción:* El bot vuelve a la actividad
│ 📢 *Nota:* Todos los comandos activos
│ 👑 *Ejecutado por:* @${m.sender.split('@')[0]}
╰──────────────────────╯

> "El trueno rompió el sello"`, m, { mentions: [m.sender] })
      break

    default:
      return
  }
}

handler.help = ['banchat', 'unbanchat']
handler.tags = ['grupos']
handler.command = /^(banchat|banearchat|unbanchat|desbanearchat)$/i
handler.admin = true

export default handler