import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

let handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }) => {
    let chat = global.db.data.chats[m.chat]
    let bot = global.db.data.settings[conn.user.jid] || {}

    let accion = command.toLowerCase() // on o off
    let type = args[0]?.toLowerCase()

    if (!type) {
        let w = chat.welcome? '⚡ ON' : '❌ OFF'
        let b = chat.bye? '⚡ ON' : '❌ OFF'
        let k = chat.kick? '⚡ ON' : '❌ OFF'
        let d = chat.detect? '⚡ ON' : '❌ OFF'
        let aud = chat.audios? '⚡ ON' : '❌ OFF'
        let ar = global.opts['autoread']? '⚡ ON' : '❌ OFF'
        let al = chat.antiLink? '⚡ ON' : '❌ OFF'
        let ab = chat.antiBot? '⚡ ON' : '❌ OFF'
        let ma = chat.modoadmin? '⚡ ON' : '❌ OFF'
        let ns = chat.nsfw? '⚡ ON' : '❌ OFF'
        let ap = bot.antiPrivate? '⚡ ON' : '❌ OFF'
        let asp = bot.antiSpam? '⚡ ON' : '❌ OFF'
        let sb = bot.jadibotmd? '⚡ ON' : '❌ OFF'

        return conn.reply(m.chat, `╭─❒ *『 𝗖𝗬𝗕𝗘𝗥 𝗕𝗢𝗧 』* ❒
│ ⚡ *PANEL DE CONFIGURACION* ⚡
│
│ 🥥 *GRUPO*
│ 1. Welcome : ${w}
│ 2. Bye : ${b}
│ 3. Kick : ${k}
│ 4. Detect : ${d}
│ 5. Antilink : ${al}
│ 6. Antibot : ${ab}
│ 7. Modoadmin : ${ma}
│ 8. Nsfw : ${ns}
│ 9. Audios : ${aud}
│
│ 🤖 *BOT*
│ 10. Autoread : ${ar}
│ 11. Antiprivado : ${ap}
│ 12. Antispam : ${asp}
│ 13. Subbots : ${sb}
│
│ *USO:*.on welcome /.off welcome
│ *EJEMPLO:*.on audios
│
│ > *“Sistema de control centralizado”* 🤖
╰─────────────────❒`, m)
    }

    let isEnable = accion === 'on'
    let fail = false

    switch (type) {
        case 'welcome': case 'bienvenida':
            if (m.isGroup &&!isAdmin) { global.dfail('admin', m, conn); fail = true; break }
            chat.welcome = isEnable
            break
        case 'bye': case 'despedida':
            if (m.isGroup &&!isAdmin) { global.dfail('admin', m, conn); fail = true; break }
            chat.bye = isEnable
            break
        case 'kick': case 'expulsion':
            if (m.isGroup &&!isAdmin) { global.dfail('admin', m, conn); fail = true; break }
            chat.kick = isEnable
            break
        case 'detect':
            if (m.isGroup &&!isAdmin) { global.dfail('admin', m, conn); fail = true; break }
            chat.detect = isEnable
            break
        case 'audios':
            chat.audios = isEnable
            break
        case 'autoread': case 'autoleer':
            if (!isROwner) { global.dfail('rowner', m, conn); fail = true; break }
            global.opts['autoread'] = isEnable
            break
        case 'antilink':
            if (m.isGroup &&!isAdmin) { global.dfail('admin', m, conn); fail = true; break }
            chat.antiLink = isEnable
            break
        case 'antibot':
            if (m.isGroup &&!isAdmin) { global.dfail('admin', m, conn); fail = true; break }
            chat.antiBot = isEnable
            break
        case 'modoadmin':
            if (m.isGroup &&!isAdmin) { global.dfail('admin', m, conn); fail = true; break }
            chat.modoadmin = isEnable
            break
        case 'nsfw': case 'antinopor':
            if (m.isGroup &&!isAdmin) { global.dfail('admin', m, conn); fail = true; break }
            chat.nsfw = isEnable
            break
        case 'subbots': case 'serbot':
            if (!isROwner) { global.dfail('rowner', m, conn); fail = true; break }
            bot.jadibotmd = isEnable
            break
        case 'antiprivado':
            if (!isOwner) { global.dfail('owner', m, conn); fail = true; break }
            bot.antiPrivate = isEnable
            break
        case 'antispam':
            if (!isOwner) { global.dfail('owner', m, conn); fail = true; break }
            bot.antiSpam = isEnable
            break
        default:
            return m.reply(`⚡ Funcion invalida. Usa: welcome, bye, kick, detect, audios, autoread, antilink, antibot, modoadmin, nsfw, antiprivado, antispam, subbots`)
    }

    if (fail) return

    const pathImg = join(process.cwd(), 'storage', 'img', 'cyber.jpg')
    let cyberImg = existsSync(pathImg)? readFileSync(pathImg) : null

    let estadoTexto = isEnable? 'activado ⚡' : 'desactivado ❌'
    let emoji = isEnable? '⚡' : '❌'

    let statusTxt = `${emoji} *CYBER BOT CONFIG* ⚡\n\n`
    statusTxt += `🤖 *funcion:* ${type}\n`
    statusTxt += `📊 *estado:* ${estadoTexto}\n\n`
    statusTxt += `> *“Sistema actualizado correctamente”* ⚡`

    if (cyberImg) {
        await conn.sendMessage(m.chat, { image: cyberImg, caption: statusTxt, mentions: [m.sender] }, { quoted: m })
    } else {
        await conn.sendMessage(m.chat, { text: statusTxt, mentions: [m.sender] }, { quoted: m })
    }
}

handler.help = ['on', 'off'].map(v => v + ' <funcion>')
handler.tags = ['config']
handler.command = /^(on|off)$/i
handler.admin = true
handler.group = true

export default handler