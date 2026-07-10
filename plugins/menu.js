import { join } from 'path'
import { readFileSync } from 'fs'

let handler = async (m, { conn, usedPrefix }) => {
  let taguser = m.mentionedJid && m.mentionedJid[0]? m.mentionedJid[0] : m.quoted? m.quoted.sender : m.sender

  // IMAGEN OFICIAL RAYO PREM
  const img = { url: 'https://files.evogb.win/91Vvmc.jpg' }

  let menuText = `⚡ *RAYO PREM* | MENU PRINCIPAL ⚡
╭─〔 *Team Nightwish* 〕─╮
│ 👤 *Usuario:* @${taguser.split('@')[0]}
│ ⚙️ *Prefijo:* [ ${usedPrefix} ]
│ 🌙 *Hora:* ${new Date().toLocaleTimeString('es-PE')}
╰──────────────────────╯
`

  let help = Object.values(global.plugins).filter(p => p.help &&!p.disabled)
  let groups = {}

  for (let plugin of help) {
    let category = plugin.tags? plugin.tags[0] : 'otros'
    if (!groups) groups = []

    if (Array.isArray(plugin.help)) {
      groups.push(...plugin.help)
    } else {
      groups.push(plugin.help)
    }
  }

  for (let category in groups) {
    menuText += `\n⛈️ *${category.toUpperCase()}* ⛈️\n`
    for (let cmd of groups) {
      menuText += `│ ⚡ ${usedPrefix}${cmd}\n`
    }
    menuText += `╰──────────────────────╯\n`
  }

  menuText += `\n> "Cuando truena, el bot responde"`

  await conn.sendMessage(m.chat, {
    image: img,
    caption: menuText,
    mentions: [taguser]
  }, { quoted: m })

  await conn.react(m.chat, '⚡', m.key)
}

handler.help = ['menu', 'help', 'menú']
handler.tags = ['main']
handler.command = /^(menu|help|menú)$/i

export default handler