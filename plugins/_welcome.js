import { WAMessageStubType } from '@whiskeysockets/baileys';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

// ===== COMANDO ON/OFF =====
let handler = async (m, { conn, command, args }) => {
    let chat = global.db.data.chats[m.chat] ||= {}

    if (!args[0]) {
        let w = chat.welcome? '✅ ON' : '❌ OFF'
        let b = chat.bye? '✅ ON' : '❌ OFF'
        let k = chat.kick? '✅ ON' : '❌ OFF'
        return m.reply(`╭─❒ *『 𝗖𝗬𝗕𝗘𝗥 𝗕𝗢𝗧 』* ❒
│
│ 💻 *CONFIG ACTUAL*
│
│ 1. *WELCOME:* ${w} →.welcome on/off
│ 2. *BYE:* ${b} →.bye on/off
│ 3. *KICK:* ${k} →.kick on/off
│
╰─────────────────❒`)
    }

    chat[command] = args[0].toLowerCase() === 'on'
    let nombre = command === 'welcome'? 'BIENVENIDAS' : command === 'bye'? 'DESPEDIDAS' : 'EXPULSIONES'
    m.reply(`*${nombre}* ${chat[command]? '✅ ACTIVADO' : '❌ DESACTIVADO'}`)
}
handler.help = ['welcome','bye','kick']
handler.tags = ['group']
handler.command = /^(welcome|bye|kick)$/i
handler.admin = true
handler.group = true
export default handler

// ===== SISTEMA WELCOME/BYE/KICK =====
export async function before(m, { conn }) {
  try {
    if (!m.messageStubType ||!m.isGroup) return true;
    const chat = global.db?.data?.chats?.[m.chat];
    if (!chat) return true;

    const groupMetadata = await conn.groupMetadata(m.chat).catch(_ => null);
    if (!groupMetadata) return true;

    let userJid = m.messageStubParameters?.[0];
    if (!userJid) return true;

    // FIX @lid -> @numero
    let userName = userJid.split('@')[0];
    if (userJid.endsWith('@lid')) {
      try {
        let info = await conn.onWhatsApp(userJid);
        userName = info[0]?.jid?.split('@')[0] || userName;
      } catch(e){}
    }
    const user = `@${userName}`;

    const groupName = groupMetadata.subject || 'Mi Sistema';
    const groupDesc = groupMetadata.desc?.toString() || '📜 Sin descripción';
    const groupMembers = groupMetadata.participants.length;
    const fixedImageUrl = 'https://files.evogb.win/wX15Ie.jpg';

    // 1. FOTO DEL USER
    let imgBuffer = null;
    try {
      let ppUrl = await conn.profilePictureUrl(userJid, 'image').catch(_ => null);
      if (ppUrl) {
        imgBuffer = await fetch(ppUrl).then(res => res.buffer()).catch(_ => null);
      }
    } catch(e){}

    // 2. SI NO TIENE FOTO = LOGO
    if (!imgBuffer) {
      imgBuffer = await fetch(fixedImageUrl).then(res => res.buffer()).catch(_ => null);
    }

    let text = '', audioFile = '';

    // WELCOME
    if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
      if (chat.welcome === false) return true
      audioFile = './bienvenida.mp3';
      text = `╭─❒ *『 𝗖𝗬𝗕𝗘𝗥 𝗕𝗢𝗧 』* ❒
│ ⚡ *NUEVO USUARIO CONECTADO*
│
│ 🤖 *Bienvenido:* ${user}
│ ⚡ *Se ha conectado al sistema*
│
│ 💻 *Sistema:* ${groupName}
│ 👥 *Usuarios:* ${groupMembers}
│ 📜 *Descripción:* ${groupDesc}
│
│ > *“Nuevo nodo agregado al sistema”*
╰─────────────────❒`.trim();

    // BYE
    } else if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE) {
      if (chat.bye === false) return true
      audioFile = './despedida.mp3';
      text = `╭─❒ *『 𝗖𝗬𝗕𝗘𝗥 𝗕𝗢𝗧 』* ❒
│ 💨 *DESCONEXIÓN REGISTRADA*
│
│ 🌫️ *Se desconectó:* ${user}
│ ⚡ *Nodo fuera de línea*
│
│ 💻 *Sistema:* ${groupName}
│ 👥 *Quedan:* ${groupMembers}
│
│ > *“Nodo desconectado del sistema”*
╰─────────────────❒`.trim();

    // KICK
    } else if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE) {
      if (chat.kick === false) return true
      audioFile = './kick.mp3';
      text = `╭─❒ *『 𝗖𝗬𝗕𝗘𝗥 𝗕𝗢𝗧 』* ❒
│ 🚮 *EXPULSIÓN EJECUTADA*
│
│ 💣 *Eliminado:* ${user}
│ ⚡ *Protocolo de seguridad aplicado*
│
│ 💻 *Sistema:* ${groupName}
│ 👥 *Quedan:* ${groupMembers}
│
│ > *“Acceso denegado por violación”*
╰─────────────────❒`.trim();
    } else return true;

    // 1. ENVIAR IMAGEN + TEXTO
    if(imgBuffer){
      await conn.sendMessage(m.chat, { image: imgBuffer, caption: text, mentions: [userJid] });
    } else {
      await conn.sendMessage(m.chat, { text: text, mentions: [userJid] });
    }

    // 2. ENVIAR AUDIO.MP3
    const audioPath = path.resolve(audioFile);
    if (fs.existsSync(audioPath)) {
      await new Promise(r => setTimeout(r, 1500));
      const audioBuffer = fs.readFileSync(audioPath);
      await conn.sendMessage(m.chat, {
        audio: audioBuffer,
        mimetype: 'audio/mpeg',
        ptt: false // audio normal
      });
      console.log(`[CYBER] ✅ Enviado: ${audioFile}`);
    } else {
      console.log(`[CYBER] ❌ No existe: ${audioPath}`);
    }

  } catch (error) {
    console.error('❌ Error en cyber-welcome:', error);
  }
}