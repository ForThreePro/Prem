import { WAMessageStubType, getContentType } from '@whiskeysockets/baileys';
import fs from 'fs';
import path from 'path';

export async function before(m, { conn }) {
  if (!m.messageStubType ||!m.isGroup) return true;

  const chat = global.db.data.chats[m.chat] || (global.db.data.chats[m.chat] = {});
  chat.welcome??= true;
  chat.bye??= true;
  chat.kick??= true;

  const groupMetadata = await conn.groupMetadata(m.chat).catch(() => null);
  if (!groupMetadata) return true;

  const userJid = m.messageStubParameters?.[0];
  if (!userJid) return true;

  // Arreglar @lid
  let user = `@${userJid.split('@')[0]}`;
  if (userJid.endsWith('@lid')) {
    const res = await conn.onWhatsApp(userJid).catch(() => []);
    if (res[0]?.jid) user = `@${res[0].jid.split('@')[0]}`;
  }

  const groupName = groupMetadata.subject || 'CYBER SYSTEM';
  const groupDesc = groupMetadata.desc?.toString() || '📜 Sin descripción';
  const groupMembers = groupMetadata.participants.length;
  const defaultImageUrl = 'https://files.evogb.win/wX15Ie.jpg';

  let img, audioFile, text;

  // ====== DEFINIR MENSAJE ======
  if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
    if (!chat.welcome) return true;
    audioFile = 'bienvenida.mp3';
    text = chat.customWelcome?.replace(/@user/gi, user).replace(/@group/gi, groupName).replace(/@count/gi, groupMembers).replace(/@desc/gi, groupDesc) ||
`╭─❒ *『 𝗖𝗬𝗕𝗘𝗥 𝗕𝗢𝗧 』* ❒
│ ⚡ *NUEVO NODO CONECTADO*
│
│ 🤖 *Usuario:* ${user}
│ 💻 *Sistema:* ${groupName}
│ 👥 *Total:* ${groupMembers}
│ 📜 *Info:* ${groupDesc}
│
│ > *“Bienvenido al sistema. Protocolo iniciado”*
╰─────────────────❒`;

  } else if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE) {
    if (!chat.bye) return true;
    audioFile = 'despedida.mp3';
    text = chat.customBye?.replace(/@user/gi, user).replace(/@group/gi, groupName).replace(/@count/gi, groupMembers).replace(/@desc/gi, groupDesc) ||
`╭─❒ *『 𝗖𝗬𝗕𝗘𝗥 𝗕𝗢𝗧 』* ❒
│ 💨 *NODO DESCONECTADO*
│
│ 🌫️ *Usuario:* ${user}
│ 💻 *Sistema:* ${groupName}
│ 👥 *Restantes:* ${groupMembers}
│
│ > *“Conexión cerrada voluntariamente”*
╰─────────────────❒`;

  } else if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE) {
    if (!chat.kick) return true;
    audioFile = 'kick.mp3';
    text = chat.customKick?.replace(/@user/gi, user).replace(/@group/gi, groupName).replace(/@count/gi, groupMembers).replace(/@desc/gi, groupDesc) ||
`╭─❒ *『 𝗖𝗬𝗕𝗘𝗥 𝗕𝗢𝗧 』* ❒
│ 🚮 *PROTOCOLO DE EXPULSIÓN*
│
│ 💣 *Usuario:* ${user}
│ ⚡ *Estado:* Acceso denegado
│ 💻 *Sistema:* ${groupName}
│ 👥 *Restantes:* ${groupMembers}
│
│ > *“Violación de protocolos detectada”*
╰─────────────────❒`;
  } else return true;

  // ====== FOTO OPCIONAL ======
  try {
    const ppUrl = await conn.profilePictureUrl(userJid, 'image');
    img = await conn.downloadFile(ppUrl); // Metodo nativo de baileys
  } catch {
    try {
      img = await conn.downloadFile(defaultImageUrl); // Link opcional
    } catch {}
  }

  // ====== ENVIAR ======
  const sendOptions = { mentions: [userJid] };
  if (img) sendOptions.image = img, sendOptions.caption = text;
  else sendOptions.text = text;

  await conn.sendMessage(m.chat, sendOptions);

  // ====== AUDIO OPCIONAL ======
  const audioPath = path.join(process.cwd(), audioFile);
  if (fs.existsSync(audioPath)) {
    setTimeout(async () => {
      try {
        await conn.sendMessage(m.chat, {
          audio: fs.readFileSync(audioPath),
          mimetype: 'audio/mp4', // mp4 jala mejor que mpeg para ptt
          ptt: true
        });
      } catch (e) { console.log('[AUDIO ERROR]', e) }
    }, 1500);
  }
}