const handler = async (m, { conn, command }) => {
  let who = m.mentionedJid[0]? m.mentionedJid[0] : m.quoted? m.quoted.sender : m.sender;

  // FIX LID para grupos nuevos
  if (m.isGroup) {
    try {
      const meta = await conn.groupMetadata(m.chat);
      let p = meta.participants.find(p => p.lid === who || p.id === who);
      if (p?.id) who = p.id;
    } catch {}
  }

  let name = await conn.getName(who).catch(() => 'Usuario');
  let pp = await conn.profilePictureUrl(who, 'image').catch(() => 'https://i.ibb.co/2kR5Hq0/only-default.jpg');
  let user = who.split('@')[0];
  let username = name.replace(/\s/g,'').toLowerCase();

  const rand = (a,b) => Math.floor(Math.random()*(b-a+1))+a;
  const price = rand(5, 25);
  const subs = rand(1200, 45800);
  const likes = rand(5000, 120000);
  const views = rand(200000, 5000000);
  const rating = (Math.random()*0.9+4.1).toFixed(1);
  const posts = rand(80, 450);
  const videos = rand(20, 150);
  const pais = ['🇨🇱 Chile','🇵🇪 Perú','🇲🇽 México','🇦🇷 Argentina','🇨🇴 Colombia','🇪🇸 España','🇺🇸 USA'][rand(0,6)];

  const bios = [
    `"Hola mis amores 😈 contenido exclusivo todos los días, videollamadas y packs al DM 🔥"`,
    `"Bienvenido a mi perfil 💎 Aquí subo lo que no ves en IG. 18+ 😏"`,
    `"Tu suscripción me ayuda mucho 💙 Packs personalizados y chats privados"`,
    `"Modelo/Streamer | Contenido VIP diario | Respondo DM 24/7"`
  ];
  const bio = bios[rand(0, bios.length-1)];
  const estado = Math.random() > 0.5? `🟢 ACTIVO - Ganando $${rand(300,3000)}/mes` : '🔴 OFFLINE';

  if (command === 'onlyfans' || command === 'only' || command === 'of') {
    // COMANDO.ONLYFANS
    const caption = `
*╭━━━[ 🔵 OnlyFans Profile ]━━━╮*

*👤 CREADOR:* ${name} ✅
*🔗 USUARIO:* @${user} | ${pais}
*🌐 LINK:* onlyfans.com/${username}

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
    // COMANDO.LEAK
    const caption = `
*🚨 ALERTA DE FILTRACIÓN 🚨*

*👤 CREADOR:* ${name} ✅
*🔗 USUARIO:* @${user} | ${pais}
*🌐 onlyfans.com/${username}*

*💰 PRECIO:* $${price}.99 / mes
*👥 SUSCRIPTORES:* ${subs.toLocaleString()}

*📸 ARCHIVOS FILTRADOS:*
• ${posts} Fotos
• ${videos} Videos
• ${rand(5,50)} Packs Privados

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