import { WAMessageStubType } from '@whiskeysockets/baileys';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

// ====== PARTE 1: COMANDOS PARA ACTIVAR/DESACTIVAR ======
let handlerCommand = async (m, { conn, command, args }) => {
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

handlerCommand.help = ['welcome', 'bye', 'kick']
handlerCommand.tags = ['group']
handlerCommand.command = /^(welcome|bye|kick)$/i
handlerCommand.admin = true
handlerCommand.group = true

// ====== PARTE 2: SISTEMA DE BIENVENIDA/DESPEDIDA/KICK ======
export async function before(m, { conn }) {
  try {
    if (!m.messageStubType ||!m.isGroup) return true;
    const chat = global.db?.data?.chats?.[m.chat];
    if (!chat) global.db.data.chats[m.chat] = {}

    // Valores por defecto: todo ON
    if (chat.welcome === undefined) chat.welcome = true
    if (chat.bye === undefined) chat.bye = true
    if (chat.kick === undefined) chat.kick = true

    const groupMetadata = await conn.groupMetadata(m.chat).catch(_ => null);
    if (!groupMetadata) return true;

    let userJid = m.messageStubParameters?.[0];
    if (!userJid) return true;

    // [FIX @lid -> @numero]
    let userName = userJid.split('@')[0];
    if (userJid.endsWith('@lid')) {
      try {
        let info = await conn.onWhatsApp(userJid);
        if (info[0]?.jid) userName = info[0].jid.split('@')[0];
      } catch(e){}
    }
    const user = `@${userName}`;

    // [DATOS DEL GRUPO]
    const groupName = groupMetadata.subject || 'CYBER SYSTEM';
    const groupDesc = groupMetadata.desc?.toString() || '📜 Sin descripción registrada';
    const groupMembers = groupMetadata.participants.length;

    const fixedImageUrl = 'https://files.evogb.win/wX15Ie.jpg'; // [LOGO CYBER BOT]

    // [FOTO DEL USER]
    let imgBuffer = null;
    try {
      let ppUrl = await conn.profilePictureUrl(userJid, 'image').catch(_ => null);
      if (ppUrl) {
        let res = await fetch(ppUrl).catch(_ => null);
        if (res && res.ok) imgBuffer = await res.buffer();
      }
    } catch(e){}

    // [LOGO SI NO HAY FOTO]
    if (!imgBuffer) {
      let res = await fetch(fixedImageUrl).catch(_ => null);
      if (res && res.ok) imgBuffer = await res.buffer();
    }

    let text = '', audioFile = '';

    // ====== BIENVENIDA ======
    if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
      if (chat.welcome === false) return true
      audioFile = './bienvenida.mp3';
      text = chat.customWelcome
? chat.customWelcome.replace(/@user/gi, user).replace(/@group/gi, groupName).replace(/@count/gi, groupMembers).replace(/@desc/gi, groupDesc)
        : `╭─❒ *『 𝗖𝗬𝗕𝗘𝗥 𝗕𝗢𝗧 』* ❒
│ ⚡ *NUEVO NODO CONECTADO*
│
│ 🤖 *Usuario:* ${user}
│ 💻 *Sistema:* ${groupName}
│ 👥 *Total:* ${groupMembers}
│ 📜 *Info:* ${groupDesc}
│
│ > *“Bienvenido al sistema. Protocolo iniciado”*
╰─────────────────❒`.trim();

    // ====== DESPEDIDA ======
    } else if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE) {
      if (chat.bye === false) return true
      audioFile = './despedida.mp3';
      text = chat.customBye
? chat.customBye.replace(/@user/gi, user).replace(/@group/gi, groupName).replace(/@count/gi, groupMembers).replace(/@desc/gi, groupDesc)
        : `╭─❒ *『 𝗖𝗬𝗕𝗘𝗥 𝗕𝗢𝗧 』* ❒
│ 💨 *NODO DESCONECTADO*
│
│ 🌫️ *Usuario:* ${user}
│ 💻 *Sistema:* ${groupName}
│ 👥 *Restantes:* ${groupMembers}
│
│ > *“Conexión cerrada voluntariamente”*
╰─────────────────❒`.trim();

    // ====== EXPULSIÓN ======
    } else if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE) {
      if (chat.kick === false) return true
      audioFile = './kick.mp3';
      text = chat.customKick
? chat.customKick.replace(/@user/gi, user).replace(/@group/gi, groupName).replace(/@count/gi, groupMembers).replace(/@desc/gi, groupDesc)
        : `╭─❒ *『 𝗖𝗬𝗕𝗘𝗥 𝗕𝗢𝗧 』* ❒
│ 🚮 *PROTOCOLO DE EXPULSIÓN*
│
│ 💣 *Usuario:* ${user}
│ ⚡ *Estado:* Acceso denegado
│ 💻 *Sistema:* ${groupName}
│ 👥 *Restantes:* ${groupMembers}
│
│ > *“Violación de protocolos detectada”*
╰─────────────────❒`.trim();
    } else return true;

    // ENVIAR IMAGEN + TEXTO
    if(imgBuffer){
      await conn.sendMessage(m.chat, { image: imgBuffer, caption: text, mentions: [userJid] });
    } else {
      await conn.sendMessage(m.chat, { text: text, mentions: [userJid] });
    }

    // ENVIAR AUDIO
    const audioPath = path.resolve(audioFile);
    if (fs.existsSync(audioPath)) {
      await new Promise(r => setTimeout(r, 1500));
      const audioBuffer = fs.readFileSync(audioPath);
      await conn.sendMessage(m.chat, {
        audio: audioBuffer,
        mimetype: 'audio/mpeg',
        ptt: true
      });
    }

  } catch (error) {
    console.error('❌ Error en welcome:', error);
  }
}

export default handlerCommand
export const disabled = false;