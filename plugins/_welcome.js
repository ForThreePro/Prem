import fetch from 'node-fetch'
import fs from 'fs'
import path from 'path'

// DETECTOR DE ENTRADAS/SALIDAS
let handler = async (m, { conn, command, args, isAdmin }) => {
    if (!m.isGroup) return m.reply('Solo grupos')

    if (!global.db.data.chats[m.chat]) global.db.data.chats[m.chat] = {}
    let chat = global.db.data.chats[m.chat]

    if (!args[0]) {
        let w = chat.welcome? '✅ ON' : '❌ OFF'
        let b = chat.bye? '✅ ON' : '❌ OFF'
        let k = chat.kick? '✅ ON' : '❌ OFF'
        return conn.reply(m.chat, `*『 𝗖𝗬𝗕𝗘𝗥 𝗕𝗢𝗧 』*\n\nWelcome: ${w}\nBye: ${b}\nKick: ${k}\n\nUso:.welcome on/off`, m)
    }

    let estado = args[0].toLowerCase() === 'on'
    chat[command] = estado
    m.reply(`${command.toUpperCase()} ${estado? 'ACTIVADO ✅' : 'DESACTIVADO ❌'}`)
}
handler.help = ['welcome', 'bye', 'kick']
handler.tags = ['group']
handler.command = /^(welcome|bye|kick)$/i
handler.admin = true
handler.group = true
export default handler

// ESTO HACE QUE DETECTE LAS ENTRADAS
handler.before = async function (m, { conn }) {
    if (!m.messageStubType ||!m.isGroup) return
    if (!global.db.data.chats[m.chat]) global.db.data.chats[m.chat] = {}
    let chat = global.db.data.chats[m.chat]

    let who = m.messageStubParameters?.[0]
    if (!who) return

    let metadata = await conn.groupMetadata(m.chat).catch(() => null)
    if (!metadata) return
    let user = '@' + who.split('@')[0]

    // FOTO
    let img
    try {
        let pp = await conn.profilePictureUrl(who, 'image')
        img = await fetch(pp).then(v => v.buffer())
    } catch {
        img = await fetch('https://files.evogb.win/wX15Ie.jpg').then(v => v.buffer()).catch(() => null)
    }

    let txt = ''
    let audio = ''

    if (m.messageStubType == 27) { // ENTRA
        if (chat.welcome === false) return
        audio = 'bienvenida.mp3'
        txt = `*CYBER BOT*\n⚡ BIENVENIDO: ${user}\n💻 ${metadata.subject}\n👥 Miembros: ${metadata.participants.length}`
    }

    if (m.messageStubType == 28) { // SALE
        if (chat.bye === false) return
        audio = 'despedida.mp3'
        txt = `*CYBER BOT*\n💨 ADIOS: ${user}`
    }

    if (m.messageStubType == 32) { // KICK
        if (chat.kick === false) return
        audio = 'kick.mp3'
        txt = `*CYBER BOT*\n🚮 EXPULSADO: ${user}`
    }

    if (!txt) return

    // MANDAR
    await conn.sendMessage(m.chat, img? { image: img, caption: txt, mentions: [who] } : { text: txt, mentions: [who] })

    // AUDIO
    let audioPath = path.join(process.cwd(), audio)
    if (fs.existsSync(audioPath)) {
        await conn.sendMessage(m.chat, {
            audio: fs.readFileSync(audioPath),
            mimetype: 'audio/mpeg'
        })
    }
}