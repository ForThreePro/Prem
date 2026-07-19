import { WAMessageStubType } from '@whiskeysockets/baileys';
import fs from 'fs';
import path from 'path';

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

    const groupName = groupMetadata.subject || 'CYBER SYSTEM';
    const groupDesc = groupMetadata.desc?.toString() || '📜 Sin descripción registrada';
    const groupMembers = groupMetadata.participants.length;

    const fixedImageUrl = 'https://files.evogb.win/wX15Ie.jpg'; // [LOGO CYBER BOT]

    // [METODO NUEVO] FOTO DEL USER CON getBuffer
    let imgBuffer = null;
    try {
      imgBuffer = await conn.profilePictureUrl(userJid, 'image').then(url => conn.getFile(url)).then(res => res.data).catch(_ => null);
    } catch(e){}

    // [METODO NUEVO] SI NO HAY FOTO = LOGO
    if (!imgBuffer) {
      imgBuffer = await conn.getFile(fixedImageUrl).then(res => res.data).catch(_ => null);
    }

    let text = '', audioFile = '';

    if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
      if (chat.welcome === false) return true
      audioFile = 'bienvenida.mp3'; // sin./
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

    } else if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE) {
      if (chat.bye === false) return true
      audioFile = 'despedida.mp3';
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

    } else if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE) {
      if (chat.kick === false) return true
      audioFile = 'kick.mp3';
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

    // [METODO NUEVO] ENVIAR AUDIO CON RUTA ABSOLUTA
    const audioPath = path.join(process.cwd(), audioFile);
    if (fs.existsSync(audioPath)) {
      await new Promise(r => setTimeout(r, 1500));
      await conn.sendMessage(m.chat, {
        audio: { url: audioPath },
        mimetype: 'audio/mpeg',
        ptt: true
      });
      console.log(`[WELCOME] ✅ Audio enviado: ${audioFile}`)
    } else {
      console.log(`[WELCOME] ❌ No se encontró: ${audioPath}`)
    }

  } catch (error) {
    console.error('❌ Error en welcome:', error);
  }
}