const handler = async (m, { conn, command }) => {
  let who = m.mentionedJid[0]? m.mentionedJid[0] : m.quoted? m.quoted.sender : m.sender;

  // FIX LID
  if (m.isGroup) {
    try {
      const meta = await conn.groupMetadata(m.chat);
      let p = meta.participants.find(p => p.lid === who || p.id === who);
      if (p?.id) who = p.id;
    } catch {}
  }

  // Datos del usuario
  let name = 'Usuario';
  try { name = await conn.getName(who) || 'Usuario'; } catch {}
  let pp = 'https://i.ibb.co/2kR5Hq0/only-default.jpg';
  try { pp = await conn.profilePictureUrl(who, 'image'); } catch {}

  let user = who.split('@')[0];
  let username = name.replace(/\s/g,'').toLowerCase();

  // DETECTAR PAIS POR PREFIJO
  const getCountry = (num) => {
    const codes = {
      '1': '🇺🇸 USA/Canadá', '51': '🇵🇪 Perú', '52': '🇲🇽 México', '53': '🇨🇺 Cuba',
      '54': '🇦🇷 Argentina', '55': '🇧🇷 Brasil', '56': '🇨🇱 Chile', '57': '🇨🇴 Colombia',
      '58': '🇻🇪 Venezuela', '502': '🇬🇹 Guatemala', '503': '🇸🇻 El Salvador',
      '504': '🇭🇳 Honduras', '505': '🇳🇮 Nicaragua', '506': '🇨🇷 Costa Rica',
      '507': '🇵🇦 Panamá', '593': '🇪🇨 Ecuador', '595': '🇵🇾 Paraguay', '598': '🇺🇾 Uruguay',
      '34': '🇪🇸 España', '351': '🇵🇹 Portugal', '39': '🇮🇹 Italia', '49': '🇩🇪 Alemania'
    };
    for (let code in codes) {
      if (user.startsWith(code)) return codes[code];
    }
    return '🌎 Desconocido';
  };
  const pais = getCountry(user);

  const rand = (a,b) => Math.floor(Math.random()*(b-a+1))+a;
  const price = rand(5, 25);
  const subs = rand(1200, 45800);
  const likes = rand(5000, 120000);
  const views = rand(200000, 5000000);
  const rating = (Math.random()*0.9+4.1).toFixed(1);
  const posts = rand(80, 450);
  const videos = rand(20, 150);
  const earnings = rand(300, 8000);

  const bios = [
    `"Hola mis amores 😈 contenido exclusivo todos los días, videollamadas y packs al DM 🔥"`,
    `"Bienvenido a mi perfil 💎 Aquí subo lo que no ves en IG. 18+ 😏"`,
    `"Tu suscripción me ayuda mucho 💙 Packs personalizados y chats privados desde ${pais}"`,
    `"Modelo/Streamer | Contenido VIP diario | Respondo DM 24/7"`
  ];
  const bio = bios[rand(0, bios.length-1)];
  const estado = Math.random() > 0.5? `🟢 ACTIVO - Ganando $${earnings}/mes` : '🔴 OFFLINE';

  if (command === 'onlyfans' || command === 'only' || command === 'of') {
    const caption = `
*╭━━━[ 🔵 OnlyFans Profile ]━━━╮*

*👤 CREADOR:* ${name} ✅
*🔗 USUARIO:* @${user}
*🌍 PAÍS:* ${pais}
*🌐 LINK:* onlyfans.com/${name}

*💰 SUSCRIPCIÓN:* $${price}.99 / mes
*👥 SUSCRIPTORES:* ${subs.toLocaleString()}
*❤️ LIKES:* ${likes.toLocaleString()}
*👀 VISTAS:* ${views.toLocaleString()}
*⭐ RATING:* ${rating}/5.0

*📸 POSTS:* ${posts} fotos
*🎥 VIDEOS:* ${videos} videos

*💬 BIO:*
${bio}

*🔓 ESTADO:* ${estado}

*╰━━[ 😏 ¿Te suscribes? ]━━╯*
> Usa.onlyfans @tag para otro
`;
    await conn.sendMessage(m.chat, { image: { url: pp }, caption, mentions: [who] }, { quoted: m });

  } else if (command === 'leak' || command === 'filtrar') {
    const caption = `
*🚨 ALERTA DE FILTRACIÓN 🚨*

*👤 CREADOR:* ${name} ✅
*🔗 USUARIO:* @${user}
*🌍 PAÍS:* ${pais}
*🌐 onlyfans.com/${username}*

*💰 PRECIO:* $${price}.99 / mes
*👥 SUSCRIPTORES:* ${subs.toLocaleString()}

*📸 ARCHIVOS FILTRADOS:*
- ${posts} Fotos
- ${videos} Videos
- ${rand(5,50)} Packs Privados

*💵 GANANCIAS ESTIMADAS: $${earnings}/mes*
*❤️ ${likes.toLocaleString()} Likes* | *⭐ ${rating}/5.0*

*⚠️ AVISO: ESTE CONTENIDO ES 100% FICTICIO*
*Generado por el bot únicamente para diversión 😂*
`;
    await conn.sendMessage(m.chat, { image: { url: pp }, caption, mentions: [who] }, { quoted: m });
  }
};

handler.help = ['onlyfans @tag', 'leak @tag'];
handler.tags = ['fun'];
handler.command = /^(onlyfans|only|of|leak|filtrar)$/i;
handler.group = true;
export default handler;