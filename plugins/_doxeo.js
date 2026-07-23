const handler = async (m, { conn, text }) => {
  // --- DETECTOR ---
  let who = m.mentionedJid && m.mentionedJid[0]? m.mentionedJid[0] : m.quoted? m.quoted.sender : null;
  let nameText = text? text.replace(/@\d+/g, '').replace(/^a\s+/i, '').trim() : '';

  let targetName;
  let mentions = [];

  if (who) {
    mentions = [who];
    try {
      targetName = await conn.getName(who);
    } catch {}
    if (!targetName || targetName === 'Usuario') {
      targetName = nameText || who.split('@')[0];
    }
  } else if (nameText) {
    targetName = nameText;
    who = null;
  } else {
    who = m.sender;
    mentions = [who];
    try {
      targetName = await conn.getName(who) || m.pushName || 'Tu';
    } catch {
      targetName = m.pushName || 'Tu';
    }
  }

  targetName = String(targetName).trim() || 'Usuario';
  const safeUpper = targetName.toUpperCase();

  const randIP = () => `${Math.floor(Math.random()*223)+1}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}`;
  const randMAC = () => Array.from({length: 6}, () => Math.floor(Math.random()*256).toString(16).padStart(2, '0').toUpperCase()).join(':');

  let msg = await conn.sendMessage(m.chat, { text: `*☠ ¡¡INICIANDO DOXXEO A ${safeUpper}!! ☠*\n\n[░░░░░░░░░░] 0%` }, { quoted: m });

  for (let i = 1; i <= 5; i++) {
    await new Promise(r => setTimeout(r, 350));
    try {
      await conn.sendMessage(m.chat, { text: `*☠ DOXXEANDO A ${safeUpper} ☠*\n\n[${'█'.repeat(i*2)}${'░'.repeat(10-i*2)}] ${i*20}%`, edit: msg.key });
    } catch {}
  }

  const doxeo = `*[ ✔ ] PERSONA DOXXEADA CON ÉXITO*
*⏳ DOXXEADO EN: ${(Math.random() * 2 + 0.5).toFixed(3)} seg*

*OBJETIVO:* ${who? `@${who.split('@')[0]}` : targetName}

*— RESULTADOS —*
*Nombre:* ${targetName}
*Ip:* ${randIP()}
*SS NUMBER:* ${Math.floor(Math.random()*9e15 + 1e15)}
*MAC:* ${randMAC()}
*ISP:* Ucom Universal
*DNS:* 8.8.8.8
*GATEWAY:* 192.168.0.1
*TCP:* 443, 80
*ROUTER:* ERICSSON

> _Broma - Datos falsos_`;

  try {
    if (who) {
      let pp = await conn.profilePictureUrl(who, 'image');
      await conn.sendMessage(m.chat, { image: { url: pp }, caption: doxeo, mentions }, { quoted: m });
      await conn.sendMessage(m.chat, { delete: msg.key });
    } else {
      await conn.sendMessage(m.chat, { text: doxeo, mentions, edit: msg.key });
    }
  } catch {
    await conn.sendMessage(m.chat, { text: doxeo, mentions, edit: msg.key });
  }
};

handler.help = ['doxear @tag'];
handler.tags = ['fun'];
handler.command = /^(doxx?eo|doxx?ear|doxx?eame|doxeame)$/i;
export default handler;