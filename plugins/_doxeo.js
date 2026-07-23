const handler = async (m, { conn, text }) => {
  let who = m.mentionedJid && m.mentionedJid[0]? m.mentionedJid[0] : m.quoted? m.quoted.sender : null;
  let realJid = who || m.sender;

  // --- FIX LID DEFINITIVO ---
  if (m.isGroup && realJid) {
    try {
      const metadata = await conn.groupMetadata(m.chat);
      // En baileys nuevo el participant tiene.id y.lid o.jid
      for (let p of metadata.participants) {
        // p.id = numero real, p.lid = lid, o al revés según versión
        if (p.lid === realJid || p.id === realJid || p.jid === realJid || String(p.id).includes(realJid.split('@')[0]) || String(p.lid).includes(realJid.split('@')[0])) {
          // Si encontramos match, nos quedamos con el que tiene @s.whatsapp.net
          if (p.id && p.id.includes('@s.whatsapp.net')) realJid = p.id;
          else if (p.jid && p.jid.includes('@s.whatsapp.net')) realJid = p.jid;
          else if (p.id &&!p.id.includes('@lid')) realJid = p.id;
          break;
        }
        // Caso 2: el who es LID pero el participant guarda el LID en otro campo
        if (realJid.includes('@lid') && p.lid && p.lid === realJid) {
            realJid = p.id;
            break;
        }
      }
    } catch (e) { console.log('Error LID:', e); }
  }

  let nameText = text? text.replace(/@\d+/g, '').replace(/@lid/g, '').replace(/^a\s+/i, '').trim() : '';
  let targetName;
  let mentions = [realJid];
  let whoForTag = realJid;

  try { targetName = await conn.getName(realJid); } catch {}
  if (!targetName || targetName.includes('@lid') || targetName === 'Usuario') targetName = nameText || realJid.split('@')[0].slice(-10);

  targetName = String(targetName).trim() || 'Usuario';

  const DB = [
    { code: '56', pais: 'Chile', flag: '🇨🇱', ciudad: 'Santiago', isp: 'WOM / Entel Chile' },
    { code: '507', pais: 'Panamá', flag: '🇵🇦', ciudad: 'Panamá City', isp: 'Cable & Wireless Panamá' },
    { code: '51', pais: 'Perú', flag: '🇵🇪', ciudad: 'Lima', isp: 'Movistar Perú' },
    { code: '54', pais: 'Argentina', flag: '🇦🇷', ciudad: 'Buenos Aires', isp: 'Personal' },
    { code: '591', pais: 'Bolivia', flag: '🇧🇴', ciudad: 'La Paz', isp: 'Entel Bolivia' },
    { code: '55', pais: 'Brasil', flag: '🇧🇷', ciudad: 'São Paulo', isp: 'Vivo Brasil' },
    { code: '57', pais: 'Colombia', flag: '🇨🇴', ciudad: 'Bogotá', isp: 'Claro Colombia' },
    { code: '506', pais: 'Costa Rica', flag: '🇨🇷', ciudad: 'San José', isp: 'Kolbi' },
    { code: '53', pais: 'Cuba', flag: '🇨🇺', ciudad: 'La Habana', isp: 'ETECSA' },
    { code: '593', pais: 'Ecuador', flag: '🇪🇨', ciudad: 'Quito', isp: 'CNT' },
    { code: '503', pais: 'El Salvador', flag: '🇸🇻', ciudad: 'San Salvador', isp: 'Claro SV' },
    { code: '34', pais: 'España', flag: '🇪🇸', ciudad: 'Madrid', isp: 'Movistar ES' },
    { code: '502', pais: 'Guatemala', flag: '🇬🇹', ciudad: 'Guatemala', isp: 'Tigo GT' },
    { code: '504', pais: 'Honduras', flag: '🇭🇳', ciudad: 'Tegucigalpa', isp: 'Tigo HN' },
    { code: '52', pais: 'México', flag: '🇲🇽', ciudad: 'CDMX', isp: 'Telcel' },
    { code: '505', pais: 'Nicaragua', flag: '🇳🇮', ciudad: 'Managua', isp: 'Claro NI' },
    { code: '595', pais: 'Paraguay', flag: '🇵🇾', ciudad: 'Asunción', isp: 'Tigo PY' },
    { code: '598', pais: 'Uruguay', flag: '🇺🇾', ciudad: 'Montevideo', isp: 'Antel' },
    { code: '58', pais: 'Venezuela', flag: '🇻🇪', ciudad: 'Caracas', isp: 'Movistar VE' },
    { code: '1', pais: 'USA', flag: '🇺🇸', ciudad: 'Miami', isp: 'AT&T' },
  ];

  const getCountry = (jid) => {
    const num = (jid||'').split('@')[0].replace(/\D/g,'');
    console.log('NUM DETECTADO:', num); // Para que veas en consola que numero saca
    const sorted = [...DB].sort((a,b)=>b.code.length-a.code.length);
    for(let p of sorted) if(num.startsWith(p.code)) return p;
    return { pais: 'Desconocido', flag: '🌎', ciudad: 'Desconocida', isp: 'UCOM' };
  };

  let c = getCountry(realJid);
  const rand = (a,b)=>Math.floor(Math.random()*(b-a+1))+a;

  const doxeo = `*☠️ DOXXEO ${c.pais.toUpperCase()} ${c.flag}*

*OBJETIVO:* @${whoForTag.split('@')[0]}
*Nombre:* ${targetName}

*— PAÍS DETECTADO ${c.flag} —*
*País:* ${c.pais} ${c.flag}
*Ciudad:* ${c.ciudad}
*ISP:* ${c.isp}
*JID Real:* ${realJid.split('@')[0]}
*IP:* ${rand(1,223)}.${rand(0,255)}.${rand(0,255)}.${rand(1,254)}

> _Si sale Desconocido es porque tu Baileys no tiene LID activado. Actualiza Baileys_`;

  await conn.sendMessage(m.chat, { text: doxeo, mentions }, { quoted: m });
};

handler.help = ['doxear @tag'];
handler.tags = ['fun'];
handler.command = /^(doxx?eo|doxx?ear|doxx?eame|doxeame)$/i;
export default handler;