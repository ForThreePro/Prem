import fs from 'fs'
import path from 'path'

export async function before(m, { conn }) {
    if (!m.messageStubType ||!m.isGroup) return

    let chat = global.db.data.chats[m.chat] ||= {}
    const groupMetadata = await conn.groupMetadata(m.chat).catch(() => null)
    if (!groupMetadata) return

    let userJid = m.messageStubParameters?.[0]
    if (!userJid) return

    let userName = userJid.split('@')[0]
    const user = `@${userName}`
    const groupName = groupMetadata.subject || 'CYBER SYSTEM'
    const groupMembers = groupMetadata.participants.length

    // FOTO
    let img
    try { img = await conn.downloadFile(await conn.profilePictureUrl(userJid, 'image')) }
    catch { img = await conn.downloadFile('https://files.evogb.win/wX15Ie.jpg').catch(() => null) }

    let text = '', audio = ''

    // 27=ENTRA 28=SALE 32=KICK
    if (m.messageStubType === 27 && chat.welcome!== false) {
        audio = 'bienvenida.mp3'
        text = `╭─❒ *『 𝗖𝗬𝗕𝗘𝗥 𝗕𝗢𝗧 』* ❒
│ ⚡ *NUEVO NODO CONECTADO*
│
│ 🤖 *Usuario:* ${user}
│ 💻 *Sistema:* ${groupName}
│ 👥 *Total:* ${groupMembers}
╰─────────────────❒`
    }
    if (m.messageStubType === 28 && chat.bye!== false) {
        audio = 'despedida.mp3'
        text = `╭─❒ *『 𝗖𝗬𝗕𝗘𝗥 𝗕𝗢𝗧 』* ❒
│ 💨 *NODO DESCONECTADO*
│
│ 🌫️ *Usuario:* ${user}
│ 💻 *Sistema:* ${groupName}
╰─────────────────❒`
    }
    if (m.messageStubType === 32 && chat.kick!== false) {
        audio = 'kick.mp3'
        text = `╭─❒ *『 𝗖𝗬𝗕𝗘𝗥 𝗕𝗢𝗧 』* ❒
│ 🚮 *PROTOCOLO DE EXPULSIÓN*
│
│ 💣 *Usuario:* ${user}
│ 💻 *Sistema:* ${groupName}
╰─────────────────❒`
    }
    if (!text) return

    // MANDAR FOTO + TEXTO
    await conn.sendMessage(m.chat, img? {image: img, caption: text, mentions: [userJid]} : {text, mentions: [userJid]})

    // MANDAR AUDIO SIN PTT - ESTO SIEMPRE JALA
    let audioPath = path.join(process.cwd(), audio)
    if (fs.existsSync(audioPath)) {
        setTimeout(() => {
            conn.sendMessage(m.chat, {
                audio: fs.readFileSync(audioPath),
                mimetype: 'audio/mpeg' // sin ptt
            }).catch(() => {})
        }, 1500)
    }
}