let handler = async (m, { conn, usedPrefix, command }) => {

if (!m.quoted) return conn.reply(m.chat, `⚡ *RAYO PREM* | ELIMINAR MENSAJE

╭─〔 *Team Nightwish* 〕─╮
│ 📌 *Uso:* Responde a un mensaje + ${usedPrefix}del
│ ⚡ *Ejemplo:* Responde al mensaje y pon .del
╰──────────────────────╯

> "El trueno borra hasta las pruebas"`, m)

try {
let delet = m.message.extendedTextMessage.contextInfo.participant
let bang = m.message.extendedTextMessage.contextInfo.stanzaId
await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet }})

await conn.reply(m.chat, `⛈️ *RAYO PREM* | MENSAJE ELIMINADO ⛈️
╭─〔 *Team Nightwish* 〕─╮
│ 🗑️ *Estado:* Borrado exitoso
│ 👑 *Ejecutado por:* @${m.sender.split('@')[0]}
╰──────────────────────╯

> "Lo que el trueno toca, desaparece"`, m, { mentions: [m.sender] })

 } catch {
try {
await conn.sendMessage(m.chat, { delete: m.quoted.vM.key })
await conn.reply(m.chat, `⚡ *RAYO PREM* | Mensaje eliminado por el trueno.`, m)
} catch {
return conn.reply(m.chat, `🌙 *Rayo Prem* | No pude eliminar ese mensaje.`, m)
}
}
}

handler.help = ['delete', 'del']
handler.tags = ['grupos']
handler.command = /^del(ete)?$/i
handler.admin = true
handler.botAdmin = true

export default handler