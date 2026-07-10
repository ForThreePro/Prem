import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

let handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }) => {
  let isEnable = /true|enable|(turn)?on|1/i.test(args[0])
  let chat = global.db.data.chats[m.chat]
  let bot = global.db.data.settings[conn.user.jid] || {}
  let type = command.toLowerCase()

  if (!args[0]) return m.reply(`⚡ *RAYO PREM* | PANEL DE CONFIGURACIÓN

╭─〔 *Team Nightwish* 〕─╮
│ 📌 *Uso:* ${usedPrefix + command} on/off
│ ⚡ *Ejemplo:* ${usedPrefix + command} on
╰──────────────────────╯

> "Controla el poder del trueno"`)

  let fail = false
  let featureName = type
  switch (type) {
    case 'welcome': case 'bienvenida':
      if (m.isGroup &&!isAdmin) { global.dfail('admin', m, conn); fail = true; break }
      chat.bienvenida = isEnable
      featureName = 'Bienvenida'
      break
    case 'subbots': case 'serbot':
      if (!isROwner) { global.dfail('rowner', m, conn); fail = true; break }
      bot.jadibotmd = isEnable
      featureName = 'Sub Bots'
      break
    case 'antispam':
      if (!isOwner) { global.dfail('owner', m, conn); fail = true; break }
      bot.antiSpam = isEnable
      featureName = 'AntiSpam'
      break
    case 'antilink':
      if (m.isGroup &&!isAdmin) { global.dfail('admin', m, conn); fail = true; break }
      chat.antiLink = isEnable
      featureName = 'AntiLink'
      break
    case 'antibot':
      if (m.isGroup &&!isAdmin) { global.dfail('admin', m, conn); fail = true; break }
      chat.antiBot = isEnable
      featureName = 'AntiBot'
      break
    case 'modoadmin':
      if (m.isGroup &&!isAdmin) { global.dfail('admin', m, conn); fail = true; break }
      chat.modoadmin = isEnable
      featureName = 'Modo Admin'
      break
    case 'nsfw': case 'antinopor':
      if (m.isGroup &&!isAdmin) { global.dfail('admin', m, conn); fail = true; break }
      chat.nsfw = isEnable
      featureName = 'NSFW'
      break
    case 'audios':
      chat.audios = isEnable
      featureName = 'Audios'
      break
    case 'autoread': case 'autoleer':
      if (!isROwner) { global.dfail('rowner', m, conn); fail = true; break }
      global.opts['autoread'] = isEnable
      featureName = 'AutoLeer'
      break
    case 'antiprivado':
      if (!isOwner) { global.dfail('owner', m, conn); fail = true; break }
      bot.antiPrivate = isEnable
      featureName = 'AntiPrivado'
      break
    default:
      return
  }

  if (fail) return

  const pathImg = join(process.cwd(), 'storage', 'img', 'catalogo.png')
  let catalogoImg
  if (existsSync(pathImg)) {
    catalogoImg = readFileSync(pathImg)
  } else {
    catalogoImg = { url: 'https://files.catbox.moe/t7uytz.png' }
  }

  let estadoTexto = isEnable? 'Activado ⚡' : 'Desactivado ⛈️'
  let estadoEmoji = isEnable? '🌀' : '🌙'

  let statusTxt = `⚡ *RAYO PREM* | SISTEMA ⚡
╭─〔 *Team Nightwish* 〕─╮
│ ⚙️ *Función:* ${featureName}
│ 📊 *Estado:* ${estadoTexto}
│ ${estadoEmoji} *Operador:* @${m.sender.split('@')[0]}
╰──────────────────────╯

> "El sistema del trueno fue actualizado"`

  await conn.sendMessage(m.chat, {
    image: catalogoImg.byteLength? catalogoImg : { url: catalogoImg.url },
    caption: statusTxt,
    mentions: [m.sender]
  }, { quoted: m })
}

handler.help = ['welcome', 'antilink', 'antibot', 'modoadmin', 'subbots', 'nsfw', 'audios', 'antiprivado'].map(v => v + ' on/off')
handler.tags = ['config']
handler.command = ['welcome', 'bienvenida', 'subbots', 'serbot', 'antispam', 'antilink', 'antibot', 'modoadmin', 'nsfw', 'antinopor', 'audios', 'autoleer', 'autoread', 'antiprivado']

export default handler