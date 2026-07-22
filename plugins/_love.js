let handler = async (m, { conn, command }) => {
  let who = m.mentionedJid && m.mentionedJid[0]? m.mentionedJid[0]
          : m.quoted? m.quoted.sender
          : m.sender;

  let name = await conn.getName(who);
  let userTarget = m.mentionedJid && m.mentionedJid[0]? `@${who.split('@')[0]}` : name;
  let porcentaje = Math.floor(Math.random() * 101);

  //.love = compatibilidad
  if(command == 'love'){
    let frase = porcentaje < 30? '💔 *MEJOR AMIGOS*' : porcentaje < 60? '😏 *HAY CHANCE*' : porcentaje < 85? '💕 *SE VEN BIEN JUNTOS*' : '💍 *CÁSENSE YA*'
    await conn.sendMessage(m.chat, {text: `⚡ *CYBER BOT LOVE SCANNER* 💘\n\n🤖 *${userTarget}* *TIENE* *${porcentaje}%* *DE COMPATIBILIDAD CONTIGO*\n${frase}\n💻 *Cyber Love System*`, mentions: [who]}, {quoted: m})
  }

  //.ship
  if(command == 'ship'){
    let n1 = m.pushName.slice(0,3)
    let n2 = name.slice(0,3)
    await conn.sendMessage(m.chat, {text: `⚡ *CYBER BOT SHIPPER* 💘\n\n🤖 *${userTarget}* *ES TU SHIP OFICIAL* *${porcentaje}%*\n💑 *NOMBRE DE PAREJA: ${n1}${n2}*\n💻 *Cyber Love System*`, mentions: [who]}, {quoted: m})
  }

  //.fiel
  if(command == 'fiel'){
    await conn.sendMessage(m.chat, {text: `⚡ *CYBER BOT SCANNER* 💘\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *FIEL*\n💍 *NI CON TRAGO SE MUEVE*\n💻 *Cyber Love System*`, mentions: [who]}, {quoted: m})
  }

  //.infiel
  if(command == 'infiel'){
    await conn.sendMessage(m.chat, {text: `⚡ *CYBER BOT SCANNER* 💘\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *INFIEL*\n💔 *TIENE 3 Y NINGUNA SABE*\n💻 *Cyber Love System*`, mentions: [who]}, {quoted: m})
  }

  //.amoroso
  if(command == 'amoroso'){
    await conn.sendMessage(m.chat, {text: `⚡ *CYBER BOT SCANNER* 💘\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *AMOROSO*\n🥰 *TE DICE BEBÉ CADA 5 MIN*\n💻 *Cyber Love System*`, mentions: [who]}, {quoted: m})
  }

  //.amorosa
  if(command == 'amorosa'){
    await conn.sendMessage(m.chat, {text: `⚡ *CYBER BOT SCANNER* 💘\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *AMOROSA*\n🥰 *TE HACE DESAYUNO*\n💻 *Cyber Love System*`, mentions: [who]}, {quoted: m})
  }

  //.enamorado
  if(command == 'enamorado'){
    await conn.sendMessage(m.chat, {text: `⚡ *CYBER BOT SCANNER* 💘\n\n🤖 *${userTarget}* *ESTÁ* *${porcentaje}%* *ENAMORADO DE TI*\n🥺 *TE PIENSA 24/7*\n💻 *Cyber Love System*`, mentions: [who]}, {quoted: m})
  }

  //.enamorada
  if(command == 'enamorada'){
    await conn.sendMessage(m.chat, {text: `⚡ *CYBER BOT SCANNER* 💘\n\n🤖 *${userTarget}* *ESTÁ* *${porcentaje}%* *ENAMORADA DE TI*\n🥺 *SU CORAZÓN ES TUYO*\n💻 *Cyber Love System*`, mentions: [who]}, {quoted: m})
  }

  //.crush
  if(command == 'crush'){
    await conn.sendMessage(m.chat, {text: `⚡ *CYBER BOT SCANNER* 💘\n\n🤖 *${userTarget}* *ES TU* *${porcentaje}%* *CRUSH*\n😳 *TE MIRA CUANDO NO MIRAS*\n💻 *Cyber Love System*`, mentions: [who]}, {quoted: m})
  }

  //.alma
  if(command == 'alma'){
    await conn.sendMessage(m.chat, {text: `⚡ *CYBER BOT SCANNER* 💘\n\n🤖 *${userTarget}* *ES TU* *${porcentaje}%* *ALMA GEMELA*\n✨ *DESTINO LOS UNIÓ*\n💻 *Cyber Love System*`, mentions: [who]}, {quoted: m})
  }

  //.celoso
  if(command == 'celoso'){
    await conn.sendMessage(m.chat, {text: `⚡ *CYBER BOT SCANNER* 💘\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *CELOSO*\n😡 *NI TU SOMBRA LA MIRA*\n💻 *Cyber Love System*`, mentions: [who]}, {quoted: m})
  }

  //.celosa
  if(command == 'celosa'){
    await conn.sendMessage(m.chat, {text: `⚡ *CYBER BOT SCANNER* 💘\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *CELOSA*\n😡 *REVISA HASTA EL WHATSAPP*\n💻 *Cyber Love System*`, mentions: [who]}, {quoted: m})
  }

  //.toxica
  if(command == 'toxica'){
    await conn.sendMessage(m.chat, {text: `⚡ *CYBER BOT SCANNER* 💘\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *TÓXICA*\n☠️ *SI NO CONTESTAS EN 2 MIN: PROBLEMA*\n💻 *Cyber Love System*`, mentions: [who]}, {quoted: m})
  }

  //.toxico
  if(command == 'toxico'){
    await conn.sendMessage(m.chat, {text: `⚡ *CYBER BOT SCANNER* 💘\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *TÓXICO*\n☠️ *TE HACE DRAMA POR TODO*\n💻 *Cyber Love System*`, mentions: [who]}, {quoted: m})
  }

  //.floro
  if(command == 'floro'){
    await conn.sendMessage(m.chat, {text: `⚡ *CYBER BOT SCANNER* 💘\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *FLORO*\n💬 *TE ENAMORA CON PURA LABIA*\n💻 *Cyber Love System*`, mentions: [who]}, {quoted: m})
  }

  //.simp
  if(command == 'simp'){
    await conn.sendMessage(m.chat, {text: `⚡ *CYBER BOT SCANNER* 💘\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *SIMP*\n🥺 *TE MANDA 100 AUDIOS AL DÍA*\n💻 *Cyber Love System*`, mentions: [who]}, {quoted: m})
  }

  //.redflag
  if(command == 'redflag'){
    await conn.sendMessage(m.chat, {text: `⚡ *CYBER BOT SCANNER* 💘\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *RED FLAG*\n🚩 *CORRE MIENTRAS PUEDAS*\n💻 *Cyber Love System*`, mentions: [who]}, {quoted: m})
  }

  //.greenflag
  if(command == 'greenflag'){
    await conn.sendMessage(m.chat, {text: `⚡ *CYBER BOT SCANNER* 💘\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *GREEN FLAG*\n✅ *QUÉDATE CON ESA PERSONA*\n💻 *Cyber Love System*`, mentions: [who]}, {quoted: m})
  }

  //.romantico
  if(command == 'romantico'){
    await conn.sendMessage(m.chat, {text: `⚡ *CYBER BOT SCANNER* 💘\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *ROMÁNTICO*\n🌹 *TE DEDICA CANCIONES*\n💻 *Cyber Love System*`, mentions: [who]}, {quoted: m})
  }

  //.romantica
  if(command == 'romantica'){
    await conn.sendMessage(m.chat, {text: `⚡ *CYBER BOT SCANNER* 💘\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *ROMÁNTICA*\n🌹 *TE ESCRIBE CARTAS*\n💻 *Cyber Love System*`, mentions: [who]}, {quoted: m})
  }

}

handler.help = ['love', 'ship', 'fiel', 'infiel', 'amoroso', 'amorosa', 'enamorado', 'enamorada', 'crush', 'alma', 'celoso', 'celosa', 'toxica', 'toxico', 'floro', 'simp', 'redflag', 'greenflag', 'romantico', 'romantica'].map(v => v + ' *@user*')
handler.tags = ['love']
handler.command = /^(love|ship|fiel|infiel|amoroso|amorosa|enamorado|enamorada|crush|alma|celoso|celosa|toxica|toxico|floro|simp|redflag|greenflag|romantico|romantica)$/i

export default handler