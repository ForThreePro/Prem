const handler = async (m, { conn, command }) => {
  if (!m.mentionedJid[0] &&!m.quoted) {
    let texto = `⚡ *RAYO PREM* | CONTROL DE ADMINS

╭─〔 *Team Nightwish* 〕─╮
│ 📌 *Uso:*.${command} @usuario
│ ⚡ *Ejemplo:*.${command} @123456789
╰──────────────────────╯

> "Menciona o responde al mensaje del objetivo"`
    return m.reply(texto, m.chat, { mentions: conn.parseMention(texto) })
  }

  let user = m.mentionedJid[0]? m.mentionedJid[0] : m.quoted.sender
  let action = command === 'promote' || command === 'promover' || command === 'daradmin'? 'promote' : 'demote'

  try {
    await conn.groupParticipantsUpdate(m.chat, [user], action)

    let msgAccion = action === 'promote'
   ? `⚡ *RAYO PREM* | ASCENSO ⚡
╭─〔 *Team Nightwish* 〕─╮
│ 👑 *Usuario:* @${user.split('@')[0]}
│ 📊 *Rango:* ADMINISTRADOR
│ ⚡ *Otorgado por:* @${m.sender.split('@')[0]}
╰──────────────────────╯

> "El trueno le dio el poder"`
    : `⛈️ *RAYO PREM* | DEGRADACIÓN ⛈️
╭─〔 *Team Nightwish* 〕─╮
│ 👤 *Usuario:* @${user.split('@')[0]}
│ 📊 *Rango:* MIEMBRO
│ ⚡ *Ejecutado por:* @${m.sender.split('@')[0]}
╰──────────────────────╯

> "El trueno le quitó el poder"`

    m.reply(msgAccion, m.chat, { mentions: [user, m.sender] })

  } catch (e) {
    console.error(e)
    m.reply(`🌙 *Rayo Prem* | No pude cambiar el rango. Verifica permisos.`)
  }
}

handler.help = ['promote @tag', 'demote @tag']
handler.tags = ['grupos']
handler.command = /^(promote|promover|daradmin|demote|degradar|quitaradmin)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler