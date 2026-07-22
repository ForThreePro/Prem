import { join } from 'path'
import { readFileSync } from 'fs'
import os from 'os'

let handler = async (m, { conn, usedPrefix }) => {
  let taguser = m.mentionedJid && m.mentionedJid[0]? m.mentionedJid[0] : m.quoted? m.quoted.sender : m.sender
  const img = readFileSync(join(process.cwd(), 'storage', 'img', 'rayo.jpg')) // rayo.jpg

  let totalUsers = Object.keys(global.db.data.users).length
  let totalCmds = Object.values(global.plugins).filter(p => p.help &&!p.disabled).length

  let fecha = new Date()
  let dia = fecha.toLocaleDateString('es-PE', { weekday: 'long', timeZone: 'America/Lima' })
  let fechaCompleta = fecha.toLocaleDateString('es-PE', { day: '2-digit', month: 'long', year: 'numeric', timeZone: 'America/Lima' })
  let hora = fecha.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'America/Lima' })

  let uptime = process.uptime() * 1000
  let h = Math.floor(uptime / 3600000)
  let m2 = Math.floor(uptime / 60000) % 60
  let s = Math.floor(uptime / 1000) % 60

  let ram = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)
  let totalram = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2)
  let ping = Date.now() - m.messageTimestamp * 1000 // ping real

  let menuText = `ᯇ 𝗖𝗬𝗕𝗘𝗥 𝗕𝗢𝗧 ⚡ ୧

⤷ ┇ 𝗩𝗘𝗥𝗦𝗜𝗢𝗡 ﹒ 3.1.5 𝗖𝘆𝗯𝗲𝗿 𝗖𝗹𝗲𝗮𝗻 ：✿ 。
꒰ ◞⁺⊹ ．𝗢𝗡𝗟𝗜𝗡𝗘 • ${h}h ${m2}m ${s}s

꒱ ׁ. ᘏ 𝗨𝗦𝗨𝗔𝗥𝗜𝗢 ׅ 𝆬
🤖 @${taguser.split('@')[0]} ࣪ ꕀ ˚
> *"Sistema conectado, domina el chat"*

──愛 *𝗘𝗦𝗧𝗔𝗗𝗜𝗦𝗧𝗜𝗖𝗔𝗦* ╏ 📊
👥 𝗨𝘀𝘂𝗮𝗿𝗶𝗼𝘀: ${totalUsers}
📜 𝗖𝗼𝗺𝗮𝗻𝗱𝗼𝘀: ${totalCmds}
💾 𝗥𝗔𝗠: ${ram}MB / ${totalram}GB
📡 𝗣𝗶𝗻𝗴: ${ping}ms

──💻 *𝗦𝗜𝗦𝗧𝗘𝗠𝗔* 💻──
📅 ${dia.charAt(0).toUpperCase() + dia.slice(1)}
📆 ${fechaCompleta}
🕐 ${hora}

`

  let help = Object.values(global.plugins).filter(p => p.help &&!p.disabled)
  let groups = {}

  for (let plugin of help) {
    let category = plugin.tags? plugin.tags[0] : 'general'
    if (!groups[category]) groups[category] = []
    if (Array.isArray(plugin.help)) groups[category].push(...plugin.help)
    else groups[category].push(plugin.help)
  }

  let emojis = {
    'downloader': '📥', 'search': '🔍', 'config': '⚙️', 'group': '👥',
    'info': 'ℹ️', 'fun': '🎭', 'sticker': '💻', 'owner': '👑',
    'anime': '🌸', 'rg': '💎', 'game': '🎮', 'general': '✨', 'ai': '💭',
    'scanner': '⚡', 'juegos': '🎮'
  }

  for (let category in groups) {
    let emoji = emojis[category] || '💻'
    let catName = category.toUpperCase()
    menuText += `.⃟𖥔 ݁${emoji}𖦹˙— \`${catName}\` —˙𖦹${emoji}꒷\n`
    for (let cmd of groups[category]) {
      menuText += ` ${emoji} ➛.${cmd}\n`
    }
    menuText += ` ㅤ└──.✦ ── ⊰ ̟!!.✦. ˙\n\n`
  }

  menuText += `💻━━━━━━━━━━━━━━━━
🤖 *𝗕𝗢𝗧:* 𝗖𝗬𝗕𝗘𝗥 𝗕𝗢𝗧
⚡ *𝗖𝗿𝗲𝗮𝗱𝗼𝗿:* 𝗪𝗵𝗼𝗶𝘀 𝗬𝗮𝗹𝗶𝗰𝗼 👑
💻 *𝗩𝗲𝗿𝘀𝗶𝗼𝗻:* 3.1.5 𝗖𝘆𝗯𝗲𝗿 𝗖𝗹𝗲𝗮𝗻
🌐 *𝗪𝗲𝗯:* https://forthreepro.github.io/Whois-Yallico

> *"Sistema conectado, domina el chat"* ⚡
💻━━━━━━━━━━━━━━━━`

  await conn.sendMessage(m.chat, {
    image: img,
    caption: menuText,
    mentions: [taguser]
  }, { quoted: m })
}

handler.command = /^(menu|help|menú)$/i
handler.tags = ['info']
handler.help = ['menu']

export default handler