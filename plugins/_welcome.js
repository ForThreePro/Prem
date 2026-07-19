import { WAMessageStubType } from '@whiskeysockets/baileys';
import fs from 'fs';
import path from 'path';

let handler = async (m, { conn, command, args }) => {
    let chat = global.db.data.chats[m.chat]
    if (!chat) chat = global.db.data.chats[m.chat] = {}

    if (!args[0]) return m.reply(`💻 *CYBER BOT* ➔ Usa:.${command} on/off\n> Ejemplo:.${command} on`)

    let estado = args[0].toLowerCase() === 'on'
    chat[command] = estado

    let nombre = command === 'welcome'? 'BIENVENIDAS' : command === 'bye'? 'DESPEDIDAS' : 'EXPULSIONES'

    await m.reply(`╭─❒ *『 𝗖𝗬𝗕𝗘𝗥 𝗕𝗢𝗧 』* ❒
│ ${estado? '✅ ACTIVADO' : '❌ DESACTIVADO'}
│
│ 💻 *Módulo:* ${nombre}
│ ⚡ *Estado:* ${estado? 'ON' : 'OFF'}
╰─────────────────❒`)
}

handler.help = ['welcome', 'bye', 'kick']
handler.tags = ['group']
handler.command = /^(welcome|bye|kick)$/i
handler.admin = true
handler.group = true
export default handler

// ====== ESTE BEFORE TIENE QUE IR ABAJO Y EXPORTARLO ASÍ ======
export async function before(m, { conn, isAdmin, isBotAdmin }) {
    if (!m.messageStubType ||!m.isGroup) return;

    let chat = global.db.data.chats[m.chat];
    if (!chat) return;

    const groupMetadata = await conn.groupMetadata(m.chat).catch(_ => null);
    if (!groupMetadata) return;

    let userJid = m.messageStubParameters?.[0];
    if (!userJid) return;

    let userName = userJid.split('@')[0];
    if (userJid.endsWith('@lid')) {
        let info = await conn.onWhatsApp(userJid).catch(() => []);
        if (info[0]?.jid) userName = info[0].jid.split('@')[0];
    }
    const user = `@${userName}`;

    const groupName = groupMetadata.subject || 'CYBER SYSTEM';
    const groupDesc = groupMetadata.desc?.toString() || '📜 Sin descripción';
    const groupMembers = groupMetadata.participants.length;
    const fixedImageUrl = 'https://files.evogb.win/wX15Ie.jpg';

    // FOTO
    let imgBuffer = null;
    try {
        let ppUrl = await conn.profilePictureUrl(userJid, 'image');
        imgBuffer = await conn.downloadFile(ppUrl);
    } catch {
        try { imgBuffer = await conn.downloadFile(fixedImageUrl); } catch {}
    }

    let text = '', audioFile = '';

    if (m.messageStubType === 27) { // 27 = ADD
        if (chat.welcome === false) return;
        audioFile = 'bienvenida.ogg';
        text = `╭─❒ *『 𝗖𝗬𝗕𝗘𝗥 𝗕𝗢𝗧 』* ❒
│ ⚡ *NUEVO NODO CONECTADO*
│
│ 🤖 *Usuario:* ${user}
│ 💻 *Sistema:* ${groupName}
│ 👥 *Total:* ${groupMembers}
│ 📜 *Info:* ${groupDesc}
│
│ > *“Bienvenido al sistema. Protocolo iniciado”*
╰─────────────────❒`;

    } else if (m.messageStubType === 28) { // 28 = LEAVE
        if (chat.bye === false) return;
        audioFile = 'despedida.ogg';
        text = `╭─❒ *『 𝗖𝗬𝗕𝗘𝗥 𝗕𝗢𝗧 』* ❒
│ 💨 *NODO DESCONECTADO*
│
│ 🌫️ *Usuario:* ${user}
│ 💻 *Sistema:* ${groupName}
│ 👥 *Restantes:* ${groupMembers}
│
│ > *“Conexión cerrada voluntariamente”*
╰─────────────────❒`;

    } else if (m.messageStubType === 32) { // 32 = KICK
        if (chat.kick === false) return;
        audioFile = 'kick.ogg';
        text = `╭─❒ *『 𝗖𝗬𝗕𝗘𝗥 𝗕𝗢𝗧 』* ❒
│ 🚮 *PROTOCOLO DE EXPULSIÓN*
│
│ 💣 *Usuario:* ${user}
│ ⚡ *Estado:* Acceso denegado
│ 💻 *Sistema:* ${groupName}
│ 👥 *Restantes:* ${groupMembers}
│
│ > *“Violación de protocolos detectada”*
╰─────────────────❒`;
    } else return;

    // MANDAR
    if(imgBuffer){
        await conn.sendMessage(m.chat, { image: imgBuffer, caption: text, mentions: [userJid] });
    } else {
        await conn.sendMessage(m.chat, { text, mentions: [userJid] });
    }

    // AUDIO
    let audioPath = path.join(process.cwd(), audioFile);
    if (fs.existsSync(audioPath)) {
        setTimeout(async () => {
            await conn.sendMessage(m.chat, {
                audio: fs.readFileSync(audioPath),
                mimetype: 'audio/ogg; codecs=opus',
                ptt: true
            });
        }, 1500);
    }

    console.log(`[CYBER] ${m.messageStubType} ejecutado para ${userName}`)
}