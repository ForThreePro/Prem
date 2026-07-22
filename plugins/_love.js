let handler = async (m, { conn, command }) => {
  let who = m.mentionedJid && m.mentionedJid[0]? m.mentionedJid[0]
          : m.quoted? m.quoted.sender
          : m.sender;

  let yo = m.sender
  let nameYo = await conn.getName(yo);
  let nameUser = await conn.getName(who);
  let porcentaje = Math.floor(Math.random() * 101);

  //.love
  if(command == 'love'){
    let frase = porcentaje < 30? '💔 *MEJOR AMIGOS*' : porcentaje < 60? '😏 *HAY CHANCE*' : porcentaje < 85? '💕 *SE VEN BIEN JUNTOS*' : '💍 *CÁSENSE YA*'
    await conn.sendMessage(m.chat, {text: `⚡ *CYBER BOT LOVE SCANNER* 💘\n\n🤖 *@${yo.split('@')[0]}* y *@${who.split('@')[0]}* *TIENEN* *${porcentaje}%* *DE COMPATIBILIDAD*\n${frase}\n💻 *Cyber Love System*`, mentions: [yo, who]}, {quoted: m})
  }

  //.ship
  if(command == 'ship'){
    let n1 = nameYo.slice(0,3)
    let n2 = nameUser.slice(0,3)
    await conn.sendMessage(m.chat, {text: `⚡ *CYBER BOT SHIPPER* 💘\n\n🤖 *@${yo.split('@')[0]}* + *@${who.split('@')[0]}* = *${n1}${n2}* *${porcentaje}%*\n💑 *SHIP OFICIAL*\n💻 *Cyber Love System*`, mentions: [yo, who]}, {quoted: m})
  }

  //.fiel
  if(command == 'fiel'){
    await conn.sendMessage(m.chat, {text: `⚡ *CYBER BOT SCANNER* 💘\n\n🤖 *@${yo.split('@')[0]}* y *@${who.split('@')[0]}* *TIEN* *${porcentaje}%* *DE FIDELIDAD*\n💍 *PAREJA PARA CASARSE*\n💻 *Cyber Love System*`, mentions: [yo, who]}, {quoted: m})
  }

  //.infiel
  if(command == 'infiel'){
    await conn.sendMessage(m.chat, {text: `⚡ *CYBER BOT SCANNER* 💘\n\n🤖 *@${yo.split('@')[0]}* y *@${who.split('@')[0]}* *TIEN* *${porcentaje}%* *DE INFIDELIDAD*\n💔 *CUIDADO AHÍ*\n💻 *Cyber Love System*`, mentions: [yo, who]}, {quoted: m})
  }

  //.amoroso
  if(command == 'amoroso'){
    await conn.sendMessage(m.chat, {text: `⚡ *CYBER BOT SCANNER* 💘\n\n🤖 *@${yo.split('@')[0]}* y *@${who.split('@')[0]}* *TIENEN* *${porcentaje}%* *DE AMOR*\n🥰 *SE QUIEREN MUCHO*\n💻 *Cyber Love System*`, mentions: [yo, who]}, {quoted: m})
  }

  //.enamorado
  if(command == 'enamorado'){
    await conn.sendMessage(m.chat, {text: `⚡ *CYBER BOT SCANNER* 💘\n\n🤖 *@${yo.split('@')[0]}* y *@${who.split('@')[0]}* *TIENEN* *${porcentaje}%* *DE ENAMORAMIENTO*\n🥺 *ESTÁN BIEN PENDIENTES*\n💻 *Cyber Love System*`, mentions: [yo, who]}, {quoted: m})
  }

  //.crush
  if(command == 'crush'){
    await conn.sendMessage(m.chat, {text: `⚡ *CYBER BOT SCANNER* 💘\n\n🤖 *@${yo.split('@')[0]}* y *@${who.split('@')[0]}* *TIEN* *${porcentaje}%* *DE CRUSH MUTUO*\n😳 *SE MIRAN A ESCONDIDAS*\n💻 *Cyber Love System*`, mentions: [yo, who]}, {quoted: m})
  }

  //.alma
  if(command == 'alma'){
    await conn.sendMessage(m.chat, {text: `⚡ *CYBER BOT SCANNER* 💘\n\n🤖 *@${yo.split('@')[0]}* y *@${who.split('@')[0]}* *TIEN* *${porcentaje}%* *DE CONEXIÓN DE ALMAS*\n✨ *ESTÁN DESTINADOS*\n💻 *Cyber Love System*`, mentions: [yo, who]}, {quoted: m})
  }

  //.celoso
  if(command == 'celoso'){
    await conn.sendMessage(m.chat, {text: `⚡ *CYBER BOT SCANNER* 💘\n\n🤖 *@${yo.split('@')[0]}* y *@${who.split('@')[0]}* *TIEN* *${porcentaje}%* *DE CELOS*\n😡 *SE CUIDAN MUCHO*\n💻 *Cyber Love System*`, mentions: [yo, who]}, {quoted: m})
  }

  //.toxica
  if(command == 'toxica'){
    await conn.sendMessage(m.chat, {text: `⚡ *CYBER BOT SCANNER* 💘\n\n🤖 *@${yo.split('@')[0]}* y *@${who.split('@')[0]}* *TIEN* *${porcentaje}%* *DE TOXICIDAD*\n☠️ *RELACIÓN PELIGROSA*\n💻 *Cyber Love System*`, mentions: [yo, who]}, {quoted: m})
  }

  //.floro
  if(command == 'floro'){
    await conn.sendMessage(m.chat, {text: `⚡ *CYBER BOT SCANNER* 💘\n\n🤖 *@${yo.split('@')[0]}* y *@${who.split('@')[0]}* *TIEN* *${porcentaje}%* *DE FLORO*\n💬 *SE ENGAÑAN BONITO*\n💻 *Cyber Love System*`, mentions: [yo, who]}, {quoted: m})
  }

  //.simp
  if(command == 'simp'){
    await conn.sendMessage(m.chat, {text: `⚡ *CYBER BOT SCANNER* 💘\n\n🤖 *@${yo.split('@')[0]}* y *@${who.split('@')[0]}* *TIENEN* *${porcentaje}%* *DE SIMPEO*\n🥺 *SE DAN MUCHA ATENCIÓN*\n💻 *Cyber Love System*`, mentions: [yo, who]}, {quoted: m})
  }

  //.redflag
  if(command == 'redflag'){
    await conn.sendMessage(m.chat, {text: `⚡ *CYBER BOT SCANNER* 💘\n\n🤖 *@${yo.split('@')[0]}* y *@${who.split('@')[0]}* *TIENEN* *${porcentaje}%* *DE RED FLAGS*\n🚩 *MEJOR CORRAN*\n💻 *Cyber Love System*`, mentions: [yo, who]}, {quoted: m})
  }

  //.greenflag
  if(command == 'greenflag'){
    await conn.sendMessage(m.chat, {text: `⚡ *CYBER BOT SCANNER* 💘\n\n🤖 *@${yo.split('@')[0]}* y *@${who.split('@')[0]}* *TIEN* *${porcentaje}%* *DE GREEN FLAGS*\n✅ *PAREJA EJEMPLAR*\n💻 *Cyber Love System*`, mentions: [yo, who]}, {quoted: m})
  }

  //.romantico
  if(command == 'romantico'){
    await conn.sendMessage(m.chat, {text: `⚡ *CYBER BOT SCANNER* 💘\n\n🤖 *@${yo.split('@')[0]}* y *@${who.split('@')[0]}* *TIEN* *${porcentaje}%* *DE ROMANTICISMO*\n🌹 *SE DEDICAN CANCIONES*\n💻 *Cyber Love System*`, mentions: [yo, who]}, {quoted: m})
  }

}

handler.help = ['love', 'ship', 'fiel', 'infiel', 'amoroso', 'enamorado', 'crush', 'alma', 'celoso', 'toxica', 'floro', 'simp', 'redflag', 'greenflag', 'romantico'].map(v => v + ' *@user*')
handler.tags = ['love']
handler.command = /^(love|ship|fiel|infiel|amoroso|enamorado|crush|alma|celoso|toxica|floro|simp|redflag|greenflag|romantico)$/i

export default handler