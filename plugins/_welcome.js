import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'
import fs from 'fs'
import path from 'path'

// COMANDOS
let handler = async (m, { conn, command, args }) => {
    if (!m.isGroup) return m.reply('Solo grupos')
    if (!global.db.data.chats[m.chat]) global.db.data.chats[m.chat] = {}
    let chat = global.db.data.chats[m.chat]

    if (!args[0]) {
        let w = chat.welcome? '✅ ON' : '❌ OFF'
        let b = chat.bye? '✅ ON' : '❌ OFF'
        let k = chat.kick? '✅ ON' : '❌ OFF'
        return conn.reply(m.chat, `*『 𝗖𝗬𝗕𝗘𝗥 𝗕𝗢𝗧 』*\n\nWelcome: ${w}\nBye: ${b}\nKick: ${k}\n\nUso:.welcome on/off`, m)
    }

    chat[command] = args[0].toLowerCase() === 'on'
    m.reply(`${command.toUpperCase()} ${chat[command]? 'ACTIVADO ✅' : 'DESACTIVADO ❌'}`)
}
handler.command = /^(welcome|bye|kick)$/i
handler.admin = true
handler.group = true
export default handler

// DETECTOR
handler.before = async function (m, { conn }) {
    if (!m.messageStubType ||!m.isGroup) return
    if (!global.db.data.chats[m.chat]) global.db.data.chats[m.chat] = {}
    let chat = global.db.data.chats[m.chat]

    let who = m.messageStubParameters?.[0]
    if (!who) return

    let metadata = await conn.groupMetadata(m.chat).catch(() => null)
    if (!metadata) return
    let user = '@' + who.split('@')[0]

    // [FIX FOTO] CONVERTIR @lid A @s.whatsapp.net
    let realJid = who
    if (who.endsWith('@lid')) {
        try {
            let info = await conn.onWhatsApp(who)
            realJid = info[0]?.jid || who
        } catch(e){}
    }

    // FOTO CON EL JID REAL
    let img
    try {
        let pp = await conn.profilePictureUrl(realJid, 'image')
        img = await fetch(pp).then(v => v.buffer())
    } catch {
        img = await fetch('https://files.evogb.win/wX15Ie.jpg').then(v => v.buffer()).catch(() => null)
    }

    let txt = ''
    let audio = ''

    if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
        if (chat.welcome == false) return
        audio = 'bienvenida.mp3'
        txt = `*CYBER BOT*\n⚡ BIENVENIDO: ${user}\n💻 ${metadata.subject}\n👥 Miembros: ${metadata.participants.length}`
    }

    if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE) {
        if (chat.bye == false) return
        audio = 'despedida.mp3'
        txt = `*CYBER BOT*\n💨 ADIOS: ${user}`
    }

    if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE) {
        if (chat.kick == false) return
        audio = 'kick.mp3'
        txt = `*CYBER BOT*\n🚮 EXPULSADO: ${user}`
    }

    if (!txt) return

    await conn.sendMessage(m.chat, img? { image: img, caption: txt, mentions: [who] } : { text: txt, mentions: [who] })

    let audioPath = path.join(process.cwd(), audio)
    if (fs.existsSync(audioPath)) {
        setTimeout(async () => {
            await conn.sendMessage(m.chat, {
                audio: fs.readFileSync(audioPath),
                mimetype: 'audio/mpeg'
            })
        }, 1500)
    }
}