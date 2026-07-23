const handler = async (m, { conn, command }) => {
  let who = m.mentionedJid[0]? m.mentionedJid[0] : m.quoted? m.quoted.sender : m.sender;

  // FIX LID y sacar solo números
  if (m.isGroup) {
    try {
      const meta = await conn.groupMetadata(m.chat);
      let p = meta.participants.find(p => p.lid === who || p.id === who);
      if (p?.id) who = p.id;
    } catch {}
  }
  let num = who.replace(/[^0-9]/g, ''); // solo números

  let name = 'Usuario';
  try { name = await conn.getName(who) || 'Usuario'; } catch {}
  let pp = 'https://i.ibb.co/2kR5Hq0/only-default.jpg';
  try { pp = await conn.profilePictureUrl(who, 'image'); } catch {}

  let user = who.split('@')[0];
  let username = name.replace(/\s/g,'').toLowerCase();

  // DETECTAR PAIS POR PREFIJO - VERSIÓN MEJORADA
  const getCountry = (num) => {
    const codes = [
      {code: '51', pais: '🇵🇪 Perú'}, {code: '52', pais: '🇲🇽 México'}, {code: '54', pais: '🇦🇷 Argentina'},
      {code: '55', pais: '🇧🇷 Brasil'}, {code: '56', pais: '🇨🇱 Chile'}, {code: '57', pais: '🇨🇴 Colombia'},
      {code: '58', pais: '🇻🇪 Venezuela'}, {code: '593', pais: '🇪🇨 Ecuador'}, {code: '1', pais: '🇺🇸 USA'},
      {code: '34', pais: '🇪🇸 España'}, {code: '502', pais: '🇬🇹 Guatemala'}, {code: '503', pais: '🇸🇻 El Salvador'}
    ];
    for (let c of codes) {
      if (num.startsWith(c.code)) return c.pais;
    }
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
*📱 @${user}* | ${pais}
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
`;

    await conn.sendMessage(m.chat, {
      image: { url: pp },
      caption,
      mentions: [who],
      contextInfo: {
        externalAdReply: {
          title: `${name} - OnlyFans VIP`,
          body: `$${price}.99/mes • ${subs.toLocaleString()} fans`,
          thumbnailUrl: pp,
          sourceUrl: `https://onlyfans.com/${username}`
        }
      }
    }, { quoted: m });

  } else if (command === 'leak' || command === 'filtrar') {
    const caption = `
*🚨 FILTRACIÓN VIP +18 🚨🚨*

*🔥 CREADORA:* ${name} ✅
*📱 @${user}* | ${pais}

*💎 CONTENIDO PREMIUM FILTRADO:*
- ${posts} Fotos Privadas
- ${videos} Videos Exclusivos
- ${rand(10,80)} Packs Personalizados
- Chats y Audios del DM

*💰 Valor: $${price*3}.99*
*👥 ${subs.toLocaleString()} Suscriptores pagan por esto*

*⚠️ ADVERTENCIA: SOLO PARA ADULTOS*
*⚠️ TODO ES FICTICIO - BOT TROL 😈*
`;

    await conn.sendMessage(m.chat, {
      image: { url: pp },
      caption,
      mentions: [who]
    }, { quoted: m });
  }
};

handler.help = ['onlyfans @tag', 'leak @tag'];
handler.tags = ['fun'];
handler.command = /^(onlyfans|only|of|leak|filtrar)$/i;
handler.group = true;
export default handler;