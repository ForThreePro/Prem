const handler = async (m, { conn, text }) => {
  let who = m.mentionedJid && m.mentionedJid[0]? m.mentionedJid[0] : m.quoted? m.quoted.sender : null;
  let realJid = who || m.sender;

  // FIX LID DEFINITIVO
  if (m.isGroup && realJid) {
    try {
      const meta = await conn.groupMetadata(m.chat);
      for (let p of meta.participants) {
        if (p.lid === realJid || p.id === realJid || p.jid === realJid) {
          if (p.id && p.id.includes('@s.whatsapp.net')) { realJid = p.id; break; }
          if (p.jid && p.jid.includes('@s.whatsapp.net')) { realJid = p.jid; break; }
        }
        if (realJid.includes('@lid') && p.lid === realJid) { realJid = p.id; break; }
      }
      // Si sigue siendo LID, busca por numero interno
      if (realJid.includes('@lid')) {
        const alt = meta.participants.find(p => p.lid === realJid);
        if (alt && alt.id) realJid = alt.id;
      }
    } catch {}
  }

  let nameText = text? text.replace(/@\d+/g, '').replace(/@lid/g, '').replace(/^a\s+/i, '').trim() : '';
  let targetName;
  let mentions = [realJid];

  try { targetName = await conn.getName(realJid); } catch {}
  if (!targetName || targetName.includes('@lid') || targetName === 'Usuario') {
    targetName = nameText || realJid.split('@')[0].slice(-9) || 'Usuario';
  }
  targetName = String(targetName).trim();
  const safeUpper = targetName.toUpperCase();

  const DB = [
    { code: '54', pais: 'Argentina', flag: '🇦🇷', ascii: '⬜🟦⬜\n🟦☀️🟦\n⬜🟦⬜', ciudad: 'Buenos Aires', isp: 'Telecom Personal', coord: '-34.60,-58.38', ops: ['Personal','Movistar','Claro AR'] },
    { code: '591', pais: 'Bolivia', flag: '🇧🇴', ciudad: 'La Paz', isp: 'Entel Bolivia', ascii: '🟥🟥🟥\n🟨🟨🟨\n🟩🟩', coord: '-16.49,-68.11', ops: ['Entel','Tigo','Viva'] },
    { code: '55', pais: 'Brasil', flag: '🇧🇷', ciudad: 'São Paulo', isp: 'Vivo Fibra', ascii: '🟩🟨🟩\n🟨💙🟨\n🟩🟨🟩', coord: '-23.55,-46.63', ops: ['Vivo','Claro BR','TIM'] },
    { code: '56', pais: 'Chile', flag: '🇨🇱', ciudad: 'Santiago', isp: 'WOM Chile', ascii: '⬜⭐⬜\n🟥🟥🟥\n🟥🟥🟥', coord: '-33.44,-70.66', ops: ['WOM','Movistar Chile','Entel'] },
    { code: '57', pais: 'Colombia', flag: '🇨🇴', ciudad: 'Bogotá', isp: 'Claro Colombia', ascii: '🟨🟨🟨\n🟦🟦\n🟥🟥🟥', coord: '4.71,-74.07', ops: ['Claro','Movistar','WOM'] },
    { code: '506', pais: 'Costa Rica', flag: '🇨🇷', ciudad: 'San José', isp: 'Kolbi ICE', ascii: '🟦⬜🟦\n⬜🟥⬜\n🟦⬜🟦', coord: '9.92,-84.09', ops: ['Kolbi','Liberty'] },
    { code: '53', pais: 'Cuba', flag: '🇨🇺', ciudad: 'La Habana', isp: 'ETECSA', ascii: '🟦⭐🟦\n⬜⬜⬜\n🟥🟥🟥', coord: '23.11,-82.36', ops: ['ETECSA'] },
    { code: '593', pais: 'Ecuador', flag: '🇪🇨', ciudad: 'Quito', isp: 'CNT Ecuador', ascii: '🟨🟨🟨\n🟦🦅🟦\n🟥🟥🟥', coord: '-0.18,-78.46', ops: ['CNT','Claro EC'] },
    { code: '503', pais: 'El Salvador', flag: '🇸🇻', ciudad: 'San Salvador', isp: 'Claro El Salvador', ascii: '🟦⬜🟦\n⬜🇸🇻⬜\n🟦⬜🟦', coord: '13.69,-89.19', ops: ['Claro','Tigo SV'] },
    { code: '34', pais: 'España', flag: '🇪🇸', ciudad: 'Madrid', isp: 'Movistar España', ascii: '🟥🟥\n🟨🟨🟨\n🟥🟥🟥', coord: '40.41,-3.70', ops: ['Movistar','Vodafone','Orange'] },
    { code: '502', pais: 'Guatemala', flag: '🇬🇹', ciudad: 'Guatemala', isp: 'Tigo Guatemala', ascii: '🟦⬜🟦\n⬜⭐⬜\n🟦⬜🟦', coord: '14.62,-90.50', ops: ['Tigo','Claro GT'] },
    { code: '504', pais: 'Honduras', flag: '🇭🇳', ciudad: 'Tegucigalpa', isp: 'Tigo Honduras', ascii: '🟦⬜🟦\n⬜⭐⬜\n🟦⬜🟦', coord: '14.07,-87.20', ops: ['Tigo','Claro HN'] },
    { code: '52', pais: 'México', flag: '🇲🇽', ciudad: 'CDMX', isp: 'Telmex / Telcel', ascii: '🟩⬜🟥\n🟩🦅🟥\n🟩⬜🟥', coord: '19.43,-99.13', ops: ['Telcel','AT&T MX','Movistar MX'] },
    { code: '505', pais: 'Nicaragua', flag: '🇳🇮', ciudad: 'Managua', isp: 'Claro Nicaragua', ascii: '🟦⬜🟦\n⬜⭐⬜\n🟦⬜🟦', coord: '12.11,-86.23', ops: ['Claro','Tigo NI'] },
    { code: '507', pais: 'Panamá', flag: '🇵🇦', ciudad: 'Panamá City', isp: 'Cable & Wireless', ascii: '⬜⭐🟥\n🟦⬜🟦\n🟥⬜⭐', coord: '8.98,-79.51', ops: ['+Móvil','Tigo PA','Digicel'] },
    { code: '595', pais: 'Paraguay', flag: '🇵🇾', ciudad: 'Asunción', isp: 'Tigo Paraguay', ascii: '🟥⬜🟦\n⬜⭐⬜\n🟦⬜🟥', coord: '-25.26,-57.57', ops: ['Tigo','Personal PY'] },
    { code: '51', pais: 'Perú', flag: '🇵🇪', ciudad: 'Lima', isp: 'Movistar Perú', ascii: '🟥⬜🟥\n🟥⬜🟥\n🟥⬜🟥', coord: '-12.04,-77.04', ops: ['Movistar','Claro','Entel','Bitel'] },
    { code: '598', pais: 'Uruguay', flag: '🇺🇾', ciudad: 'Montevideo', isp: 'Antel Uruguay', ascii: '⬜🟨⬜\n🟦⬜🟦\n⬜🟨⬜', coord: '-34.90,-56.16', ops: ['Antel','Movistar UY'] },
    { code: '58', pais: 'Venezuela', flag: '🇻🇪', ciudad: 'Caracas', isp: 'Movistar Venezuela', ascii: '🟨⭐🟨\n🟦🟦🟦\n🟥🟥', coord: '10.48,-66.90', ops: ['Movistar','Digitel','Movilnet'] },
    { code: '1', pais: 'USA', flag: '🇺🇸', ciudad: 'Miami', isp: 'AT&T', ascii: '⭐🟦⬜\n🟥⬜🟥\n⬜🟥⬜', coord: '25.76,-80.19', ops: ['AT&T','T-Mobile','Verizon'] },
  ];

  const getCountry = (jid) => {
    const num = (jid||'').split('@')[0].replace(/\D/g,'');
    const sorted = [...DB].sort((a,b)=>b.code.length-a.code.length);
    for(let p of sorted) if(num.startsWith(p.code)) return p;
    return { pais: 'Desconocido', flag: '🌎', ascii: '⬛🌎⬛', ciudad: 'Desconocida', isp: 'UCOM', coord: '0,0', ops: ['UCOM'] };
  };

  let c = getCountry(realJid);
  const rand = (a,b)=>Math.floor(Math.random()*(b-a+1))+a;
  const pick = (a)=>a[rand(0,a.length-1)];
  const ip = `${rand(1,223)}.${rand(0,255)}.${rand(0,255)}.${rand(1,254)}`;
  const mac = Array.from({length:6},()=>rand(0,255).toString(16).padStart(2,'0').toUpperCase()).join(':');
  const isWifi = Math.random() > 0.4;
  const connType = isWifi? `WiFi 📶 ${pick(['Fibra 500Mbps','WiFi 6','Starlink 200Mbps'])}` : `Datos Móviles 📱 ${pick(['4G LTE','5G'])}`;
  const bateria = rand(15,100);

  let load = await conn.sendMessage(m.chat, { text: `*☠ INICIANDO DOXXEO A ${safeUpper} ${c.flag}*` }, { quoted: m });
  for(let i=1;i<=4;i++){
    await new Promise(r=>setTimeout(r,300));
    try{ await conn.sendMessage(m.chat, { text: `*☠ RASTREANDO ${safeUpper} ${c.flag}*\n[${'█'.repeat(i*2)}${'░'.repeat(8-i*2)}] ${i*25}%`, edit: load.key }); }catch{}
  }

  const doxeo = `${c.ascii}
*╭━[ ☠️ DOXXEO EXITOSO - ${c.pais.toUpperCase()} ${c.flag} ]━╮*

*👤 OBJETIVO*
*┣ Nombre:* ${targetName}
*┣ Tag:* @${realJid.split('@')[0]}
*┣ ID:* ${rand(100000000000,999999999999)}
*┗ Estado:* 🟢 En línea

*🌎 UBICACIÓN ${c.flag}*
*┣ País:* ${c.pais} ${c.flag}
*┣ Ciudad:* ${c.ciudad}
*┣ Coord:* ${c.coord}
*┣ Maps:* https://maps.google.com/?q=${c.coord}
*┗ ISP:* ${c.isp}

*📡 RED*
*┣ IP Pública:* ${ip}
*┣ IP Local:* ${isWifi? `192.168.${rand(0,1)}.${rand(2,254)}` : `10.${rand(0,50)}.${rand(0,255)}.${rand(1,254)}`}
*┣ Operador:* ${pick(c.ops)}
*┣ Conexión:* ${connType} | ${rand(20,400)} Mbps
*┣ DNS:* 8.8.8.8 / 1.1.1.1
*┣ VPN:* ${Math.random()>0.7? '⚠️ Detectada - Bypassed' : '❌ No'}
*┣ Puertos:* 443:OPEN 80:OPEN 22:CLOSED
*┗ MAC:* ${mac}

*📱 DISPOSITIVO*
*┣ Modelo:* ${pick(['Samsung S23 Ultra','iPhone 15 Pro Max','Xiaomi Redmi Note 13','Moto Edge 40','PC Win11'])}
*┣ SO:* ${pick(['Android 14','iOS 17.5','Windows 11 Pro'])}
*┣ Batería:* ${bateria}% ${bateria>20? '🔋' : '🪫'} ${bateria>80? 'Cargando' : 'Descargando'}
*┣ RAM:* ${pick(['6GB','8GB','12GB'])}
*┗ Navegador:* ${pick(['Chrome 126.0','Safari 17.2','Edge 126'])}

*🔗 EXPOSICIÓN*
*┣ Email:* ${targetName.toLowerCase().replace(/\s/g,'')}${rand(10,99)}@gmail.com
*┣ Brechas:* ${rand(2,18)} encontradas
*┗ Riesgo:* ${pick(['BAJO 🟢','MEDIO 🟡','ALTO 🔴','CRÍTICO 💀'])}

*╰━[ ⚠️ FAKE - SOLO BROMA - DETECTADO POR PREFIJO ]━╯`;

  try {
    const pp = await conn.profilePictureUrl(realJid, 'image').catch(()=>null);
    if (pp) {
      await conn.sendMessage(m.chat, { image: { url: pp }, caption: doxeo, mentions }, { quoted: m });
      await conn.sendMessage(m.chat, { delete: load.key }).catch(()=>{});
    } else {
      await conn.sendMessage(m.chat, { text: doxeo, mentions, edit: load.key });
    }
  } catch {
    await conn.sendMessage(m.chat, { text: doxeo, mentions }, { quoted: m });
  }
};

handler.help = ['doxear @tag'];
handler.tags = ['fun'];
handler.command = /^(doxx?eo|doxx?ear|doxx?eame|doxeame)$/i;
export default handler;