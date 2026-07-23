const handler = async (m, { conn, text }) => {
  let who = m.mentionedJid && m.mentionedJid[0]? m.mentionedJid[0] : m.quoted? m.quoted.sender : null;
  if (who && who.includes('@lid') && m.isGroup) {
    try {
      const meta = await conn.groupMetadata(m.chat);
      const f = meta.participants.find(p => p.lid === who || p.id.includes(who.split('@')[0]));
      if (f) who = f.id;
    } catch {}
  }

  let nameText = text? text.replace(/@\d+/g, '').replace(/@lid/g, '').replace(/^a\s+/i, '').trim() : '';
  let targetName, mentions = [];
  let targetJid = who || m.sender;

  if (who) {
    mentions = [who];
    try { targetName = await conn.getName(who); } catch {}
    if (!targetName || targetName.includes('@lid')) targetName = nameText || who.split('@')[0].slice(-9);
  } else if (nameText) {
    targetName = nameText;
  } else {
    who = m.sender;
    mentions = [who];
    try { targetName = await conn.getName(who) || m.pushName; } catch { targetName = m.pushName || 'Tu'; }
  }
  targetName = String(targetName).trim() || 'Usuario';

  const DB = [
    { code: '54', pais: 'Argentina', flag: '🇦🇷', ciudad: 'Buenos Aires', isp: 'Personal / Fibertel', coord: '-34.61,-58.38', op: ['Personal','Movistar'] },
    { code: '591', pais: 'Bolivia', flag: '🇧🇴', ciudad: 'La Paz', isp: 'Entel Bolivia', coord: '-16.49,-68.11', op: ['Entel','Tigo'] },
    { code: '55', pais: 'Brasil', flag: '🇧🇷', ciudad: 'São Paulo', isp: 'Vivo / Claro BR', coord: '-23.55,-46.63', op: ['Vivo','TIM'] },
    { code: '56', pais: 'Chile', flag: '🇨🇱', ciudad: 'Santiago', isp: 'WOM / Movistar Chile', coord: '-33.44,-70.66', op: ['WOM','Entel','Movistar'] },
    { code: '57', pais: 'Colombia', flag: '🇨🇴', ciudad: 'Bogotá', isp: 'Claro Colombia', coord: '4.71,-74.07', op: ['Claro','Movistar','WOM'] },
    { code: '506', pais: 'Costa Rica', flag: '🇨🇷', ciudad: 'San José', isp: 'Kolbi / Liberty', coord: '9.92,-84.09', op: ['Kolbi','Liberty'] },
    { code: '53', pais: 'Cuba', flag: '🇨🇺', ciudad: 'La Habana', isp: 'ETECSA', coord: '23.11,-82.36', op: ['ETECSA'] },
    { code: '593', pais: 'Ecuador', flag: '🇪🇨', ciudad: 'Quito', isp: 'CNT / Claro EC', coord: '-0.18,-78.46', op: ['Claro','Movistar'] },
    { code: '503', pais: 'El Salvador', flag: '🇸🇻', ciudad: 'San Salvador', isp: 'Claro El Salvador', coord: '13.69,-89.19', op: ['Claro','Tigo'] },
    { code: '34', pais: 'España', flag: '🇪🇸', ciudad: 'Madrid', isp: 'Movistar España', coord: '40.41,-3.70', op: ['Movistar','Orange'] },
    { code: '1', pais: 'USA', flag: '🇺🇸', ciudad: 'Miami', isp: 'AT&T / T-Mobile', coord: '25.76,-80.19', op: ['AT&T','T-Mobile'] },
    { code: '502', pais: 'Guatemala', flag: '🇬🇹', ciudad: 'Guatemala City', isp: 'Tigo Guatemala', coord: '14.62,-90.50', op: ['Tigo','Claro'] },
    { code: '504', pais: 'Honduras', flag: '🇭🇳', ciudad: 'Tegucigalpa', isp: 'Tigo Honduras', coord: '14.07,-87.20', op: ['Tigo','Claro'] },
    { code: '52', pais: 'México', flag: '🇲🇽', ciudad: 'CDMX', isp: 'Telcel / Telmex', coord: '19.43,-99.13', op: ['Telcel','AT&T MX'] },
    { code: '505', pais: 'Nicaragua', flag: '🇳🇮', ciudad: 'Managua', isp: 'Claro Nicaragua', coord: '12.11,-86.23', op: ['Claro','Tigo'] },
    { code: '507', pais: 'Panamá', flag: '🇵🇦', ciudad: 'Panamá City', isp: 'C&W / Tigo Panamá', coord: '8.98,-79.51', op: ['+Móvil','Tigo'] },
    { code: '595', pais: 'Paraguay', flag: '🇵🇾', ciudad: 'Asunción', isp: 'Tigo Paraguay', coord: '-25.26,-57.57', op: ['Tigo','Personal'] },
    { code: '51', pais: 'Perú', flag: '🇵🇪', ciudad: 'Lima', isp: 'Movistar Perú', coord: '-12.04,-77.04', op: ['Claro','Movistar','Entel','Bitel'] },
    { code: '598', pais: 'Uruguay', flag: '🇺🇾', ciudad: 'Montevideo', isp: 'Antel', coord: '-34.90,-56.16', op: ['Antel','Movistar'] },
    { code: '58', pais: 'Venezuela', flag: '🇻🇪', ciudad: 'Caracas', isp: 'Movistar Venezuela', coord: '10.48,-66.90', op: ['Movistar','Digitel'] },
    { code: '1809', pais: 'Rep. Dominicana', flag: '🇩🇴', ciudad: 'Santo Domingo', isp: 'Claro RD', coord: '18.48,-69.93', op: ['Claro','Altice'] },
    { code: '1829', pais: 'Rep. Dominicana', flag: '🇩🇴', ciudad: 'Santo Domingo', isp: 'Altice RD', coord: '18.48,-69.93', op: ['Altice'] },
  ];

  const getCountry = (jid) => {
    const num = (jid||'').split('@')[0].replace(/\D/g,'');
    const sorted = [...DB].sort((a,b)=>b.code.length-a.code.length);
    for(let p of sorted) if(num.startsWith(p.code)) return p;
    return { pais: 'Desconocido', flag: '🌎', ciudad: 'Desconocida', isp: 'UCOM', coord: '0,0', op: ['UCOM'] };
  };

  let c = getCountry(targetJid);
  const rand = (a,b)=>Math.floor(Math.random()*(b-a+1))+a;
  const pick = (a)=>a[rand(0,a.length-1)];
  const ip = `${rand(1,223)}.${rand(0,255)}.${rand(0,255)}.${rand(1,254)}`;
  const isWifi = Math.random() > 0.4;

  const doxeo = `*╭━[ ☠️ DOXXEO ${c.pais.toUpperCase()} ${c.flag} ]━╮*

*👤 OBJETIVO:* ${who? `@${who.split('@')[0]}` : targetName}
*┣ Nombre:* ${targetName}
*┗ ID:* ${rand(100000000000,999999999999)}

*🌎 GEO ${c.flag}*
*┣ País:* ${c.pais} ${c.flag}
*┣ Ciudad:* ${c.ciudad}
*┣ Coordenadas:* ${c.coord}
*┣ Maps:* https://maps.google.com/?q=${c.coord}
*┗ ISP:* ${c.isp}

*📡 RED*
*┣ IP Pública:* ${ip}
*┣ IP Local:* ${isWifi? `192.168.${rand(0,1)}.${rand(2,254)}` : `10.${rand(0,20)}.${rand(0,255)}.${rand(1,254)}`}
*┣ Operador:* ${pick(c.op)}
*┣ Tipo:* ${isWifi? `WiFi 📶 ${rand(100,500)} Mbps` : `Datos ${pick(['4G','5G'])} 📱 ${rand(20,150)} Mbps`}
*┣ DNS:* 8.8.8.8 / 1.1.1.1
*┣ VPN:* ${Math.random()>0.7? 'Detectada - Bypassed' : 'No'}
*┗ Puertos:* 443 OPEN, 80 OPEN

*📱 DEVICE*
*┣ Modelo:* ${pick(['S23 Ultra','iPhone 15 Pro','Redmi Note 13','Moto G54'])}
*┣ Batería:* ${rand(10,100)}%
*┗ MAC:* ${Array.from({length:6},()=>rand(0,255).toString(16).padStart(2,'0').toUpperCase()).join(':')}

*╰━[ ⚠️ FAKE - BROMA POR PREFIJO ]━╯`;

  try {
    const pp = who? await conn.profilePictureUrl(who, 'image').catch(()=>null) : null;
    if (pp) await conn.sendMessage(m.chat, { image: { url: pp }, caption: doxeo, mentions }, { quoted: m });
    else await conn.sendMessage(m.chat, { text: doxeo, mentions }, { quoted: m });
  } catch {
    await conn.sendMessage(m.chat, { text: doxeo, mentions }, { quoted: m });
  }
};

handler.help = ['doxear @tag'];
handler.tags = ['fun'];
handler.command = /^(doxx?eo|doxx?ear|doxx?eame|doxeame)$/i;
export default handler;