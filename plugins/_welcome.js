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
        let w = chat.welcome? '🟢 ACTIVO' : '🔴 DESACTIVO'
        let b = chat.bye? '🟢 ACTIVO' : '🔴 DESACTIVO'
        let k = chat.kick? '🟢 ACTIVO' : '🔴 DESACTIVO'
        return conn.reply(m.chat, `╭─❒ 「 𝗖𝗬𝗕𝗘𝗥 𝗦𝗬𝗦𝗧𝗘𝗠 」❒
│
│ ⚙️ *CONFIGURACION ACTUAL*
│
│ 1. *WELCOME* : ${w}
│ 2. *BYE* : ${b}
│ 3. *KICK* : ${k}
│
│ *COMANDOS*
│.welcome on/off
│.bye on/off
│.kick on/off
│
╰────────────────❒`, m)
    }

    chat[command] = args[0].toLowerCase() === 'on'
    let icon = chat[command]? '🟢' : '🔴'
    let nombre = command === 'welcome'? 'BIENVENIDAS' : command === 'bye'? 'DESPEDIDAS' : 'EXPULSIONES'
    m.reply(`${icon} *${nombre}* ${chat[command]? 'ACTIVADAS' : 'DESACTIVADAS'}`)
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

    // FIX @lid
    let realJid = who
    if (who.endsWith('@lid')) {
        try {
            let info = await conn.onWhatsApp(who)
            realJid = info[0]?.jid || who
        } catch(e){}
    }

    // FOTO
    let img
    try {
        let pp = await conn.profilePictureUrl(realJid, 'image')
        img = await fetch(pp).then(v => v.buffer())
    } catch {
        img = await fetch('https://files.evogb.win/wX15Ie.jpg').then(v => v.buffer()).catch(() => null)
    }

    let txt = ''
    let audio = ''

    // WELCOME
    if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
        if (chat.welcome == false) return
        audio = 'bienvenida.mp3'
        txt = `╭━━━〔 ⚡ 𝗡𝗨𝗘𝗩𝗢 𝗡𝗢𝗗𝗢 〕━━━╮
┃
┃ 🤖 *USUARIO* : ${user}
┃ 💻 *SISTEMA* : ${metadata.subject}
┃ 👥 *MIEMBROS*: ${metadata.participants.length}
┃ 📡 *ESTADO* : CONECTADO
┃
┃ 📜 *${metadata.desc || 'Sin descripción'}*
┃
┃ > *"Bienvenido al Sistema Cyber"*
╰━━━━━━━━━━━━━━╯`
    }

    // BYE
    if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE) {
        if (chat.bye == false) return
        audio = 'despedida.mp3'
        txt = `╭━━━〔 💨 𝗗𝗘𝗦𝗖𝗢𝗡𝗘𝗫𝗜𝗢𝗡 〕━━━╮
┃
┃ 🌫️ *USUARIO* : ${user}
┃ 💻 *SISTEMA* : ${metadata.subject}
┃ 👥 *QUEDAN* : ${metadata.participants.length}
┃ 📡 *ESTADO* : DESCONECTADO
┃
┃ > *"Nodo fuera de línea"*
╰━━━━━━━━━━━━━━╯`
    }

    // KICK
    if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE) {
        if (chat.kick == false) return
        audio = 'kick.mp3'
        txt = `╭━━━〔 🚨 𝗘𝗫𝗣𝗨𝗟𝗦𝗜𝗢𝗡 〕━━━╮
┃
┃ 💣 *USUARIO* : ${user}
┃ ⚡ *PROTOCOLO*: SEGURIDAD
┃ 💻 *SISTEMA* : ${metadata.subject}
┃ 👥 *QUEDAN* : ${metadata.participants.length}
┃
┃ > *"Acceso denegado. Violación"*
╰━━━━━━━━━━━━━━━━━━━━━━╯`
    }

    if (!txt) return

    // MANDAR
    await conn.sendMessage(m.chat, {
        image: img,
        caption: txt,
        mentions: [who]
    })

    // AUDIO
    let audioPath = path.join(process.cwd(), audio)
    if (fs.existsSync(audioPath)) {
        setTimeout(async () => {
            await conn.sendMessage(m.chat, {
                audio: fs.readFileSync(audioPath),
                mimetype: 'audio/mpeg',
                ptt: false
            })
        }, 1500)
    }
}