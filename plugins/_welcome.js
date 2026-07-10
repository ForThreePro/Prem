import { WAMessageStubType } from '@whiskeysockets/baileys'
import { readFileSync } from 'fs'
import { join } from 'path'

const handler = async (m, { conn, args, isAdmin, isOwner }) => {
  if (!isAdmin &&!isOwner) throw "⚡ *Rayo Prem* | Solo Admins pueden usar esto."

  let chat = global.db.data.chats[m.chat]
  if (!chat) global.db.data.chats[m.chat] = {}

  if (/on|1|activar/i.test(args[0])) {
    chat.bienvenida = true
    await conn.reply(m.chat, "⚡ *Rayo Prem* | `BIENVENIDA ACTIVADA`\n\nAhora daré la bienvenida con estilo Nightwish.", m)
  } else if (/off|0|desactivar/i.test(args[0])) {
    chat.bienvenida = false
    await conn.reply(m.chat, "🌙 *Rayo Prem* | `BIENVENIDA DESACTIVADA`\n\nModo silencioso activado.", m)
  } else {
    await conn.reply(m.chat, `⚡ *Rayo Prem - Panel de Bienvenida*\n\n📌 *Uso:*.bienvenida on / off\n*Team Nightwish* | Bot Oficial`, m)
  }
}

handler.help = ['bienvenida <on/off>']
handler.tags = ['config']
handler.command = /^(bienvenida|welcome|bv|bienvenido)$/i

handler.before = async function (m, { conn, groupMetadata }) {
  try {
    if (!m.messageStubType ||!m.isGroup) return!0

    const chat = global.db?.data?.chats?.[m.chat]
    if (!chat ||!chat.bienvenida) return!0

    // Imagen del Team Nightwish - Rayo Prem
    let img
    try {
      img = readFileSync(join(process.cwd(), 'storage', 'img', 'rayo.jpg'))
    } catch {
      img = { url: 'https://files.evogb.win/91Vvmc.jpg' } // Banner Nightwish
    }

    const userJid = m.messageStubParameters?.[0] || m.participant
    if (!userJid) return!0

    const userTag = `@${userJid.split('@')[0]}`
    const groupName = groupMetadata.subject
    const groupDesc = groupMetadata.desc || 'Sin descripción'
    const membersCount = groupMetadata.participants.length

    let txt = ''

    switch (m.messageStubType) {
      case WAMessageStubType.GROUP_PARTICIPANT_ADD:
        txt = chat.customWelcome? chat.customWelcome.replace(/@user/gi, userTag).replace(/@group/gi, groupName).replace(/@desc/gi, groupDesc) :
`⚡ *RAYO PREM* | NUEVO INGRESO ⚡

╭─〔 *Team Nightwish* 〕─╮
│ 👤 *Usuario:* ${userTag}
│ 👑 *Grupo:* ${groupName}
│ 📊 *Miembro #${membersCount}*
│ 📜 *Descripción:* ${groupDesc}
╰──────────────────────╯

> "No todos resisten el trueno...
> ¿Podrás tú?"

> Usa *.menu* para ver los comandos`
        break

      case WAMessageStubType.GROUP_PARTICIPANT_LEAVE:
        txt = chat.customBye? chat.customBye.replace(/@user/gi, userTag).replace(/@group/gi, groupName) :
`🌙 *RAYO PREM* | BAJA CONFIRMADA 🌙

╭─〔 *Team Nightwish* 〕─╮
│ 👤 *Usuario:* ${userTag}
│ 👑 *Grupo:* ${groupName}
│ 📉 *Quedan:* ${membersCount} miembros
╰──────────────────────╯

> "Se fue como vino... sin hacer ruido."
> Que le vaya bien.`
        break

      case WAMessageStubType.GROUP_PARTICIPANT_REMOVE:
        txt = chat.customKick? chat.customKick.replace(/@user/gi, userTag).replace(/@group/gi, groupName) :
`⛈️ *RAYO PREM* | EXPULSIÓN ⛈️

╭─〔 *Team Nightwish* 〕─╮
│ 👤 *Usuario:* ${userTag}
│ 👑 *Grupo:* ${groupName}
│ ⚠️ *Estado:* ELIMINADO
│ 📉 *Quedan:* ${membersCount} miembros
╰──────────────────────╯

> "El rayo cayó. No se juega con el Team."
> Motivo: Rompió las reglas`
        break
    }

    if (txt) {
      await conn.sendMessage(m.chat, {
        image: typeof img === 'string'? { url: img } : img,
        caption: txt,
        mentions: [userJid],
        contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          externalAdReply: {
            title: 'RAYO PREM - TEAM NIGHTWISH',
            body: 'Bot MultiDevice Oficial',
            thumbnail: img,
            sourceUrl: 'https://github.com'
          }
        }
      })
    }

  } catch (e) {
    console.error("⚡ Error en Bienvenida Rayo:", e)
  }
  return!0
}

export default handler