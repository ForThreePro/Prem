const handler = async (m, { conn, text }) => {
  let who = m.mentionedJid && m.mentionedJid[0]? m.mentionedJid[0] : m.quoted? m.quoted.sender : null;
  let nameText = text? text.replace(/@\d+/g, '').replace(/^a\s+/i, '').trim() : '';
  let targetName, mentions = [];
  let targetJid = who || m.sender;

  if (who) {
    mentions = [who];
    try { targetName = await conn.getName(who); } catch {}
    if (!targetName || targetName === 'Usuario') targetName = nameText || who.split('@')[0];
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
    { code: '549', pais: 'Argentina', flag: '🇦🇷', ascii: '⬜🟦⬜\n🟦⬜🟦\n⬜🟦⬜', ciudad: 'Buenos Aires', isp: 'Telecom Personal' },
    { code: '54', pais: 'Argentina', flag: '🇦🇷', ascii: '⬜🟦⬜\n🟦⬜🟦\n⬜🟦⬜', ciudad: 'Buenos Aires', isp: 'Personal AR' },
    { code: '591', pais: 'Bolivia', flag: '🇧🇴', ascii: '🟥🟥🟥\n🟨🟨🟨\n🟩🟩🟩', ciudad: 'La Paz', isp: 'Entel Bolivia' },
    { code: '55', pais: 'Brasil', flag: '🇧🇷', ascii: '🟩🟨🟩\n🟨💙🟨\n🟩🟨🟩', ciudad: 'São Paulo', isp: 'Vivo Brasil' },
    { code: '56', pais: 'Chile', flag: '🇨🇱', ascii: '⬜⭐⬜\n🟥🟥🟥\n🟥🟥🟥', ciudad: 'Santiago', isp: 'WOM / Movistar Chile' },
    { code: '57', pais: 'Colombia', flag: '🇨🇴', ascii: '🟨🟨🟨\n🟦🟦🟦\n🟥🟥🟥', ciudad: 'Bogotá', isp: 'Claro Colombia' },
    { code: '506', pais: 'Costa Rica', flag: '🇨🇷', ascii: '🟦⬜🟦\n⬜🟥⬜\n🟦⬜🟦', ciudad: 'San José', isp: 'Kolbi' },
    { code: '593', pais: 'Ecuador', flag: '🇪🇨', ascii: '🟨🟨🟨\n🟦🟨🟦\n🟥🟥🟥', ciudad: 'Quito', isp: 'CNT' },
    { code: '503', pais: 'El Salvador', flag: '🇸🇻', ascii: '🟦⬜🟦\n⬜🇸🇻⬜\n🟦⬜🟦', ciudad: 'San Salvador', isp: 'Claro SV' },
    { code: '502', pais: 'Guatemala', flag: '🇬🇹', ascii: '🟦⬜🟦\n⬜⭐⬜\n🟦⬜🟦', ciudad: 'Guatemala', isp: 'Tigo GT' },
    { code: '52', pais: 'México', flag: '🇲🇽', ascii: '🟩⬜🟥\n🟩🦅🟥\n🟩⬜🟥', ciudad: 'CDMX', isp: 'Telcel' },
    { code: '505', pais: 'Nicaragua', flag: '🇳🇮', ascii: '🟦⬜🟦\n⬜⭐⬜\n🟦⬜🟦', ciudad: 'Managua', isp: 'Claro NI' },
    { code: '507', pais: 'Panamá', flag: '🇵🇦', ascii: '⬜⭐🟥\n🟦⬜🟦\n🟥⬜⭐', ciudad: 'Panamá City', isp: 'Cable & Wireless PA' },
    { code: '595', pais: 'Paraguay', flag: '🇵🇾', ascii: '🟥⬜🟦\n⬜⭐⬜\n🟦⬜🟥', ciudad: 'Asunción', isp: 'Tigo PY' },
    { code: '51', pais: 'Perú', flag: '🇵🇪', ascii: '🟥⬜🟥\n🟥⬜🟥\n🟥⬜🟥', ciudad: 'Lima', isp: 'Movistar Perú' },
    { code: '598', pais: 'Uruguay', flag: '🇺🇾', ascii: '⬜🟨⬜\n🟦⬜🟦\n⬜🟨⬜', ciudad: 'Montevideo', isp: 'Antel' },
    { code: '58', pais: 'Venezuela', flag: '🇻🇪', ascii: '🟨⭐🟨\n🟦🟦🟦\n🟥🟥🟥', ciudad: 'Caracas', isp: 'Movistar VE' },
    { code: '34', pais: 'España', flag: '🇪🇸', ascii: '🟥🟥🟥\n🟨🟨🟨\n🟥🟥', ciudad: 'Madrid', isp: 'Movistar ES' },
    { code: '1', pais: 'USA', flag: '🇺🇸', ascii: '⭐🟦⬜\n🟥⬜🟥\n⬜🟥⬜', ciudad: 'Miami', isp: 'AT&T' },
  ];

  const getCountryData = (jid) => {
    const num = jid.split('@')[0];
    const sorted = [...paises].sort((a,b) => b.code.length - a.code.length);
    for (let p of sorted) if (num.startsWith(p.code)) return p;
    return { pais: 'Desconocido', flag: '🌎', ascii: '⬛⬛\n⬜🌎⬜\n⬛⬛⬛', ciudad: 'Desconocida', isp: 'UCOM' };
  };

  let country = getCountryData(targetJid);
  const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  const randIP = () => `${rand(1,223)}.${rand(0,255)}.${rand(0,255)}.${rand(1,254)}`;
  const conexion = Math.random() > 0.5? { tipo: 'WiFi 📶', estado: 'Conectado - Fibra Óptica', velocidad: `${rand(50,300)} Mbps` } : { tipo: 'Datos Móviles 📱', estado: `${rand(3,5)}G - ${rand(10,90)}% señal`, velocidad: `${rand(5,80)} Mbps` };

  let msg = await conn.sendMessage(m.chat, { text: `*☠ RASTREANDO A ${safeUpper}...*` }, { quoted: m });
  for (let i = 1; i <= 4; i++) {
    await new Promise(r => setTimeout(r, 350));
    try { await conn.sendMessage(m.chat, { text: `*☠ RASTREANDO A ${safeUpper} ${country.flag}*\n[${'█'.repeat(i*2)}${'░'.repeat(8-i*2)}] ${i*25}%`, edit: msg.key }); } catch {}
  }

  const doxeo = `
${country.ascii}
*[ ✔ ] DOXXEO EXITOSO - ${country.pais.toUpperCase()} ${country.flag}*

*OBJETIVO:* ${who? `@${who.split('@')[0]}` : targetName}
*Nombre:* ${targetName}

*— UBICACIÓN ${country.flag} —*
*País:* ${country.pais} ${country.flag}
*Ciudad:* ${country.ciudad}
*ISP:* ${country.isp}
*IP:* ${randIP()}

*— CONEXIÓN DETECTADA —*
*Tipo:* ${conexion.tipo}
*Estado:* ${conexion.estado}
*Velocidad:* ${conexion.velocidad}
*MAC:* ${Array.from({length: 6}, () => rand(0,255).toString(16).padStart(2, '0').toUpperCase()).join(':')}
*Gateway:* 192.168.${rand(0,1)}.${rand(1,254)}

*— EXTRA —*
*Batería:* ${rand(10,100)}% ${rand(10,100)>20? '🔋' : '🪫'}
*Puertos:* 443 OPEN, 80 OPEN

> _Fake - País por prefijo, solo broma_
`;

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