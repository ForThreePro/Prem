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

  // SACAR NUMERO LIMPIO
  let num = who.split('@')[0].split(':')[0]; // quita : y lid

  let name = 'Usuario';
  try { name = await conn.getName(who) || 'Usuario'; } catch {}

  let pp = 'https://i.ibb.co/2kR5Hq0/only-default.jpg';
  try { pp = await conn.profilePictureUrl(who, 'image'); } catch {}

  let username = name.replace(/\s/g,'').toLowerCase();

  // DETECTAR PAIS - FUNCIONA 100%
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
    `"Hola mi amor 😈 ¿Listo para ver lo que no subo a IG? Packs +18 y videollamadas al DM 🔥"`,
    `"Bienvenido bb 💎 Contenido exclusivo 24/7. Se muy travieso conmigo 😏 DM abierto"`,
    `"Suscríbete y desbloquea todo 💦 Fotos, videos y chats privados. Solo para mayores de 18"`,
    `"Modelo VIP desde ${pais} | Me encanta complacer 😘 ¿Qué quieres ver hoy?"`
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

*╰─😈 [ ¿Te unes al VIP? ] 😈─╯*
> Todo es FICTICIO para trolear 😂
`;

    await conn.sendMessage(m.chat, { image: { url: pp }, caption, mentions: [who] }, { quoted: m });

  } else if (command === 'leak' || command === 'filtrar') {
    const caption = `
*🚨🚨 FILTRACIÓN VIP +18 🚨🚨*

*🔥 CREADORA:* ${name} ✅
*📱 @${num}* | ${pais}

*💎 CONTENIDO PREMIUM FILTRADO:*
- ${posts} Fotos Privadas
- ${videos} Videos Exclusivos
- ${rand(10,80)} Packs Personalizados
- Chats y Audios del DM

*💰 Valor Estimado: $${price*3}.99*
*👥 ${subs.toLocaleString()} Suscriptores pagan por esto*

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