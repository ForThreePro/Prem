const handler = async (m, { conn, text }) => {
  // --- FIX PARA LID ---
  let who = m.mentionedJid && m.mentionedJid[0]? m.mentionedJid[0] : m.quoted? m.quoted.sender : null;

  // Si es grupo e intenta usar LID, convertimos a JID real
  if (who && who.includes('@lid') && m.isGroup) {
    try {
      const groupMetadata = await conn.groupMetadata(m.chat);
      const participant = groupMetadata.participants.find(p => p.id.includes(who.split('@')[0]) || p.jid?.includes(who.split('@')[0]) || p.lid === who || p.id === who);
      if (participant) {
        who = participant.id; // JID real tipo 56xxxx@s.whatsapp.net
      } else {
        // Intenta buscar por lid en la cache
        const alt = groupMetadata.participants.find(p => p.lid === who);
        if (alt) who = alt.id;
      }
    } catch {}
  }

  let nameText = text? text.replace(/@\d+/g, '').replace(/@lid/g, '').replace(/^a\s+/i, '').trim() : '';
  let targetName, mentions = [];
  let targetJid = who || m.sender;

  if (who) {
    mentions = [who];
    try { targetName = await conn.getName(who); } catch {}
    if (!targetName || targetName === 'Usuario' || targetName.includes('@lid')) {
      targetName = nameText || who.split('@')[0].replace(/[^0-9]/g, '').slice(-9) || 'Usuario';
    }
  } else if (nameText) {
    targetName = nameText;
    who = null;
  } else {
    who = m.sender;
    mentions = [who];
    try { targetName = await conn.getName(who) || m.pushName || 'Tu'; } catch { targetName = m.pushName || 'Tu'; }
  }

  targetName = String(targetName).trim() || 'Usuario';
  const safeUpper = targetName.toUpperCase();

  const paises = [
    { code: '56', pais: 'Chile', flag: '🇨🇱', ascii: '⬜⭐⬜\n🟥🟥\n🟥🟥🟥', ciudad: 'Santiago', isp: 'WOM / Movistar Chile' },
    { code: '507', pais: 'Panamá', flag: '🇵🇦', ascii: '⬜⭐🟥\n🟦⬜🟦\n🟥⬜⭐', ciudad: 'Panamá City', isp: 'C&W Panamá' },
    { code: '51', pais: 'Perú', flag: '🇵🇪', ascii: '🟥⬜🟥\n🟥⬜🟥\n🟥⬜🟥', ciudad: 'Lima', isp: 'Movistar Perú' },
    { code: '54', pais: 'Argentina', flag: '🇦🇷', ascii: '⬜🟦⬜\n🟦⬜🟦\n⬜🟦⬜', ciudad: 'Buenos Aires', isp: 'Personal AR' },
    { code: '52', pais: 'México', flag: '🇲🇽', ascii: '🟩⬜🟥\n🟩🦅🟥\n🟩⬜🟥', ciudad: 'CDMX', isp: 'Telcel' },
    { code: '57', pais: 'Colombia', flag: '🇨🇴', ascii: '🟨🟨🟨\n🟦🟦🟦\n🟥🟥🟥', ciudad: 'Bogotá', isp: 'Claro CO' },
  ];
  const getCountryData = (jid) => {
    if (!jid) return { pais: 'Desconocido', flag: '🌎', ascii: '⬛🌎⬛', ciudad: 'Desconocida', isp: 'UCOM' };
    const num = jid.split('@')[0].replace(/\D/g,'');
    const sorted = [...paises].sort((a,b) => b.code.length - a.code.length);
    for (let p of sorted) if (num.startsWith(p.code) || num.includes(p.code)) return p;
    return { pais: 'Desconocido', flag: '🌎', ascii: '⬛🌎⬛', ciudad: 'Desconocida', isp: 'UCOM' };
  };

  let country = getCountryData(targetJid);
  const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  const randIP = () => `${rand(1,223)}.${rand(0,255)}.${rand(0,255)}.${rand(1,254)}`;
  const conexion = Math.random() > 0.5? { tipo: 'WiFi 📶', vel: `${rand(50,300)} Mbps` } : { tipo: 'Datos Móviles 📱', vel: `${rand(5,80)} Mbps ${rand(3,5)}G` };

  let msg = await conn.sendMessage(m.chat, { text: `*☠ RASTREANDO A ${safeUpper}...*` }, { quoted: m });

  const doxeo = `
${country.ascii}
*[ ✔ ] DOXXEO - ${country.pais.toUpperCase()} ${country.flag}*

*OBJETIVO:* ${who? `@${who.split('@')[0]}` : targetName}
*Nombre:* ${targetName}

*— UBICACIÓN ${country.flag} —*
*País:* ${country.pais} ${country.flag}
*Ciudad:* ${country.ciudad}
*ISP:* ${country.isp}
*IP:* ${randIP()}

*— CONEXIÓN —*
*Tipo:* ${conexion.tipo} | ${conexion.vel}

> _Fake - Solo broma_
`;

  try {
    if (who) {
      let pp = await conn.profilePictureUrl(who, 'image').catch(() => null);
      if (pp) {
        await conn.sendMessage(m.chat, { image: { url: pp }, caption: doxeo, mentions }, { quoted: m });
      } else {
        await conn.sendMessage(m.chat, { text: doxeo, mentions }, { quoted: m });
      }
      await conn.sendMessage(m.chat, { delete: msg.key }).catch(()=>{});
    } else {
      await conn.sendMessage(m.chat, { text: doxeo, mentions, edit: msg.key });
    }
  } catch {
    // ULTIMO FIX: Si falla por LID, manda sin imagen pero etiquetando bien
    await conn.sendMessage(m.chat, { text: doxeo, mentions: mentions.filter(j =>!j.includes('@lid')) }, { quoted: m });
  }
};

handler.help = ['doxear @tag'];
handler.tags = ['fun'];
handler.command = /^(doxx?eo|doxx?ear|doxx?eame|doxeame)$/i;
export default handler;