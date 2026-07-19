import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'
import fs from 'fs'
import path from 'path'

// COMANDO PARA ACTIVAR/DESACTIVAR
let handler = async (m, { conn, command, args }) => {
    if (!global.db.data.chats[m.chat]) global.db.data.chats[m.chat] = {}
    let chat = global.db.data.chats[m.chat]

    if (!args[0]) {
        let w = chat.welcome? '✅ ON' : '❌ OFF'
        let b = chat.bye? '✅ ON' : '❌ OFF' 
        let k = chat.kick? '✅ ON' : '❌ OFF'
        return conn.reply(m.chat, `*『 𝗖𝗬𝗕𝗘𝗥 𝗕𝗢𝗧 』*
        
*ESTADO ACTUAL*
Welcome: ${w}
Bye: ${b}
Kick: ${k}

*USO:*.welcome on/off\n.bye on/off\n.kick on/off`, m)
    }
    
    let estado = args[0].toLowerCase() === 'on'
    chat[command] = estado
    let nombre = command === 'welcome'? 'Bienvenidas' : command === 'bye'? 'Despedidas' : 'Expulsiones'
    conn.reply(m.chat, `*${nombre}* ${estado? 'ACTIVADAS ✅' : 'DESACTIVADAS ❌'}`, m)
}
handler.help = ['welcome', 'bye', 'kick']
handler.tags = ['group']
handler.command = /^(welcome|bye|kick)$/i
handler.admin = true
handler.group = true
export default handler

// SISTEMA AUTOMATICO
export async function before(m, { conn }) {
    if (!m.messageStubType) return
    if (!m.isGroup) return
    if (!global.db.data.chats[m.chat]) global.db.data.chats[m.chat] = {}
    let chat = global.db.data.chats[m.chat]
    
    let who = m.messageStubParameters[0]
    if (!who) return
    
    let metadata = await conn.groupMetadata(m.chat)
    let user = '@' + who.split('@')[0]
    
    // SACAR FOTO
    let img
    try {
        let pp = await conn.profilePictureUrl(who, 'image')
        img = await fetch(pp).then(v => v.buffer())
    } catch {
        img = await fetch('https://files.evogb.win/wX15Ie.jpg').then(v => v.buffer())
    }

    let txt = ''
    let audio = ''

    // BIENVENIDA
    if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
        if (chat.welcome === false) return
        audio = 'bienvenida.mp3'
        txt = `╭─❒ *『 𝗖𝗬𝗕𝗘𝗥 𝗕𝗢𝗧 』* ❒
│ ⚡ *NUEVO NODO CONECTADO*
│
│ 🤖 *Usuario:* ${user}
│ 💻 *Sistema:* ${metadata.subject}
│ 👥 *Miembros:* ${metadata.participants.length}
│
│ > *Bienvenido al sistema*
╰─────────────────❒`
    }
    
    // DESPEDIDA
    if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE) {
        if (chat.bye === false) return
        audio = 'despedida.mp3'
        txt = `╭─❒ *『 𝗖𝗬𝗕𝗘𝗥 𝗕𝗢𝗧 』* ❒
│ 💨 *NODO DESCONECTADO*
│
│ 🌫️ *Usuario:* ${user}
│ 💻 *Sistema:* ${metadata.subject}
│
│ > *Conexión cerrada*
╰─────────────────❒`
    }
    
    // KICK
    if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE) {
        if (chat.kick === false) return
        audio = 'kick.mp3'
        txt = `╭─❒ *『 𝗖𝗬𝗕𝗘𝗥 𝗕𝗢𝗧 』* ❒
│ 🚮 *PROTOCOLO DE EXPULSIÓN*
│
│ 💣 *Usuario:* ${user}
│ ⚡ *Acceso denegado*
│ 💻 *Sistema:* ${metadata.subject}
│
│ > *Violación detectada*
╰─────────────────❒`
    }
    
    if (!txt) return
    
    // ENVIAR FOTO + TEXTO
    await conn.sendMessage(m.chat, { image: img, caption: txt, mentions: [who] })
    
    // ENVIAR AUDIO
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