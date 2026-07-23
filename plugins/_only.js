const handler = async (m, { conn, command }) => {
  let who = m.mentionedJid[0] || m.quoted?.sender || m.sender;

  // FIX LID
  if (m.isGroup) {
    try {
      const meta = await conn.groupMetadata(m.chat);
      let p = meta.participants.find(p => p.lid === who || p.id === who);
      if (p?.id) who = p.id;
    } catch {}
  }

  let num = who.split('@')[0].split(':')[0];

  let nameReal = 'Usuario';
  try { nameReal = await conn.getName(who) || 'Usuario'; } catch {}
  let pp = 'https://i.ibb.co/2kR5Hq0/only-default.jpg';
  try { pp = await conn.profilePictureUrl(who, 'image'); } catch {}

  // APODOS CALIENTES RANDOM 😈
  const apodos = [
    'LunaSexy', 'NenaProhibida', 'DulceVeneno', 'GatitaVIP', 'ReinaDelPlacer',
    'DiablaCaliente', 'AzucarMorena', 'Tentacion18', 'PecadoDulce', 'BombonVIP',
    'MielProhibida', 'NinfitaHot', 'KissCaliente', 'DiosaSensual', 'CoquetaXXX'
  ];
  const name = apodos[Math.floor(Math.random() * apodos.length)];
  const username = name.toLowerCase();

  const getCountry = (n) => {
    if (n.startsWith('51')) return '🇵🇪 Perú';
    if (n.startsWith('52')) return '🇲🇽 México';
    if (n.startsWith('56')) return '🇨🇱 Chile';
    if (n.startsWith('54')) return '🇦🇷 Argentina';
    if (n.startsWith('57')) return '🇨🇴 Colombia';
    if (n.startsWith('55')) return '🇧🇷 Brasil';
    if (n.startsWith('58')) return '🇻🇪 Venezuela';
    if (n.startsWith('1')) return '🇺🇸 USA';
    if (n.startsWith('34')) return '🇪🇸 España';
    return '🌎 Privado';
  };
  const pais = getCountry(num);

  const rand = (a,b) => Math.floor(Math.random()*(b-a+1))+a;
  const price = rand(9, 29);
  const subs = rand(5000, 98000);
  const likes = rand(10000, 500000);
  const rating = (Math.random()*0.4+4.6).toFixed(1);
  const posts = rand(150, 800);
  const videos = rand(50, 300);
  const earnings = rand(800, 15000);

  const biosCalientes = [
    `"Hola mi amor 😈 Soy ${name} y aquí subo lo que no ves en ningún lado 🔥 DM para packs"`,
    `"Bienvenido bb 💎 ${name} en vivo 24/7. ¿Listo para ser travieso conmigo? 😏"`,
    `"Suscríbete a ${name} VIP 💦 Fotos +18, videos y videollamadas privadas"`,
    `"Soy ${name} desde ${pais} | Me encanta complacer 😘 ¿Qué fantasía cumplo hoy?"`
  ];
  const bio = biosCalientes[rand(0, biosCalientes.length-1)];

  if (command === 'onlyfans' || command === 'only' || command === 'of') {
    const caption = `
*╭─❤️‍🔥 [ ONLYFANS VIP ] ❤️‍🔥─╮*

*👑 CREADORA:* ${name} ✅
*📱 @${num}* | ${pais}
*🔗 onlyfans.com/${username}*

*💎 SUSCRIPCIÓN VIP:* $${price}.99 / mes
*👥 ${subs.toLocaleString()}* Suscriptores calientes
*❤️ ${likes.toLocaleString()}* Likes
*⭐ ${rating}/5.0* Rating

*📸 ${posts}* Fotos Exclusivas
*🎥 ${videos}* Videos +18

*💬 SOBRE MÍ:*
${bio}

*💵 Ganancias:* $${earnings}/mes
*🔥 ESTADO:* 🟢 EN VIVO AHORA

*╰─😈 [ ¿Te unes al VIP de ${name}? ] 😈─╯*
> Todo es FICTICIO para trolear 😂
`;

    await conn.sendMessage(m.chat, { image: { url: pp }, caption, mentions: [who] }, { quoted: m });

  } else if (command === 'leak' || command === 'filtrar') {
    const caption = `
*🚨 FILTRACIÓN VIP +18 🚨🚨*

*🔥 CREADORA:* ${name} ✅
*📱 @${num}* | ${pais}
*🌐 onlyfans.com/${username}*

*💎 CONTENIDO PREMIUM DE ${name.toUpperCase()} FILTRADO:*
- ${posts} Fotos Privadas
- ${videos} Videos Exclusivos
- ${rand(10,80)} Packs Personalizados
- Chats y Audios del DM

*💰 Valor Estimado: $${price*3}.99*
*👥 ${subs.toLocaleString()} Suscriptores pagan por ver a ${name}*

*⚠️ AVISO: SOLO PARA ADULTOS*
*⚠️ TODO ES FICTICIO - GENERADO POR BOT 😈*
`;

    await conn.sendMessage(m.chat, { image: { url: pp }, caption, mentions: [who] }, { quoted: m });
  }
};

handler.help = ['onlyfans @tag', 'leak @tag'];
handler.tags = ['fun'];
handler.command = /^(onlyfans|only|of|leak|filtrar)$/i;
handler.group = true;
export default handler;