const handler = async (m, { conn, text }) => {
  // --- 1. DETECTOR DE USUARIO ---
  let who = m.mentionedJid && m.mentionedJid[0]? m.mentionedJid[0] : m.quoted? m.quoted.sender : null;
  let nameText = text? text.replace(/@.*/, '').trim() : '';

  let targetName;
  let mentions = [];

  if (who) {
    targetName = await conn.getName(who);
    mentions = [who];
  } else if (nameText) {
    who = null;
    targetName = nameText;
  } else {
    who = m.sender;
    targetName = await conn.getName(who);
    mentions = [who];
  }

  // --- 2. GENERADORES FAKES ---
  const randIP = () => `${Math.floor(Math.random()*223)+1}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}`;
  const randMAC = () => Array.from({length: 6}, () => Math.floor(Math.random()*256).toString(16).padStart(2, '0').toUpperCase()).join(':');
  const randSS = () => Math.floor(Math.random()*9e15 + 1e15).toString();

  // Mensaje de carga
  let msg = await conn.sendMessage(m.chat, { text: `*☠ ¡¡INICIANDO DOXXEO A ${targetName.toUpperCase()}!! ☠*\n\n[░░░░░░░░░░] 0%` }, { quoted: m });

  for (let i = 1; i <= 5; i++) {
    await new Promise(r => setTimeout(r, 350));
    try {
      await conn.sendMessage(m.chat, { text: `*☠ DOXXEANDO A ${targetName.toUpperCase()} ☠*\n\n[${'█'.repeat(i*2)}${'░'.repeat(10-i*2)}] ${i*20}%`, edit: msg.key });
    } catch {}
  }

  const doxeo = `*[ ✔ ] PERSONA DOXXEADA CON ÉXITO*
*⏳ DOXXEADO EN: ${(Math.random() * 2 + 0.5).toFixed(3)} seg*

*OBJETIVO:* ${who? `@${who.split('@')[0]}` : targetName}

*— RESULTADOS OBTENIDOS —*

*Nombre:* ${targetName}
*Ip:* ${randIP()}
*N:* 43.${Math.floor(Math.random()*9000)} | W: 12.${Math.floor(Math.random()*9000)}
*SS NUMBER:* ${randSS()}
*MAC:* ${randMAC()}
*ISP:* Ucom Universal
*DNS:* 8.8.8.8
*GATEWAY:* 192.168.0.1
*SUBNET MASK:* 255.255.255.0
*TCP OPEN PORTS:* 443, 80
*UDP OPEN PORTS:* 8080
*DEVICE:* ${Math.random() > 0.5? 'WIN32-X' : 'ANDROID'}
*ROUTER:* ERICSSON

> _Broma - Datos falsos generados aleatoriamente_`;

  // --- 3. INTENTAR SACAR FOTO DE PERFIL ---
  try {
    if (who) {
      let pp = await conn.profilePictureUrl(who, 'image');
      await conn.sendMessage(m.chat, { image: { url: pp }, caption: doxeo, mentions }, { quoted: m });
      // Borramos el mensaje de carga
      await conn.sendMessage(m.chat, { delete: msg.key });
    } else {
      // Si es solo texto sin tag, no hay foto
      await conn.sendMessage(m.chat, { text: doxeo, mentions }, { quoted: m, edit: msg.key });
    }
  } catch (e) {
    // Si no tiene foto o es privado, manda solo texto
    await conn.sendMessage(m.chat, { text: doxeo, mentions }, { quoted: m, edit: msg.key });
  }
};

handler.help = ['doxear @tag'];
handler.tags = ['fun'];
handler.command = /^(doxx?eo|doxx?ear|doxx?eame|doxeame)$/i;
export default handler;