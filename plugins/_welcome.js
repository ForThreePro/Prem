import { WAMessageStubType } from '@whiskeysockets/baileys';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

// ===== COMANDO ON/OFF =====
let handler = async (m, { conn, command, args }) => {
    if (!global.db.data.chats[m.chat]) global.db.data.chats[m.chat] = {}
    let chat = global.db.data.chats[m.chat]

    if (!args[0]) {
        let w = chat.welcome? '✅ ON' : '❌ OFF'
        let b = chat.bye? '✅ ON' : '❌ OFF'
        let k = chat.kick? '✅ ON' : '❌ OFF'
        return m.reply(`*CYBER BOT*\n\nWELCOME: ${w}\nBYE: ${b}\nKICK: ${k}\n\nUsa:.welcome on/off`)
    }

    chat[command] = args[0].toLowerCase() === 'on'
    m.reply(`${command} ${chat[command]? 'ON' : 'OFF'}`)
}
handler.command = /^(welcome|bye|kick)$/i
handler.admin = true
handler.group = true
export default handler


// ===== SISTEMA =====
export async function before(m, { conn }) {
  try {
    if (!m.messageStubType ||!m.isGroup) return true;
    if (!global.db.data.chats[m.chat]) global.db.data.chats[m.chat] = {}
    const chat = global.db.data.chats[m.chat];

    const groupMetadata = await conn.groupMetadata(m.chat).catch(_ => null);
    if (!groupMetadata) return true;

    let userJid = m.messageStubParameters?.[0];
    if (!userJid) return true;

    let userName = userJid.split('@')[0];
    const user = `@${userName}`;
    const groupName = groupMetadata.subject || 'Sistema';
    const groupMembers = groupMetadata.participants.length;
    const fixedImageUrl = 'https://files.evogb.win/wX15Ie.jpg';

    let imgBuffer = null;
    try {
      let ppUrl = await conn.profilePictureUrl(userJid, 'image').catch(_ => null);
      if (ppUrl) imgBuffer = await fetch(ppUrl).then(res => res.buffer());
    } catch(e){}
    if (!imgBuffer) imgBuffer = await fetch(fixedImageUrl).then(res => res.buffer()).catch(_ => null);

    let text = '', audioFile = '';

    if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD && chat.welcome!= false) {
      audioFile = './bienvenida.mp3';
      text = `*CYBER BOT*\n⚡ BIENVENIDO: ${user}\n💻 Grupo: ${groupName}`;

    } else if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE && chat.bye!= false) {
      audioFile = './despedida.mp3';
      text = `*CYBER BOT*\n💨 ADIOS: ${user}`;

    } else if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE && chat.kick!= false) {
      audioFile = './kick.mp3';
      text = `*CYBER BOT*\n🚮 KICK: ${user}`;
    } else return true;

    await conn.sendMessage(m.chat, imgBuffer? { image: imgBuffer, caption: text, mentions: [userJid] } : { text, mentions: [userJid] });

    const audioPath = path.resolve(audioFile);
    if (fs.existsSync(audioPath)) {
      await new Promise(r => setTimeout(r, 1500));
      await conn.sendMessage(m.chat, {
        audio: fs.readFileSync(audioPath),
        mimetype: 'audio/mpeg',
        ptt: false
      });
    }

  } catch (error) {
    console.error('Error:', error);
  }
}