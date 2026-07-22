let handler = async (m, { conn, command, text }) => {
  let who = m.mentionedJid && m.mentionedJid[0]? m.mentionedJid[0]
          : m.quoted? m.quoted.sender
          : m.sender;

  let name = await conn.getName(who);
  let userTarget = m.mentionedJid && m.mentionedJid[0]? `@${who.split('@')[0]}` : name;
  let porcentaje = Math.floor(Math.random() * 100) + 1;

  let respuestas = {
    // SOLO 10 COMANDOS NUEVOS

    'calato': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *CALATO* 🫣\n🏃‍♂️ *CORRE EN BÓXER EN SU CASA*\n💻 *Cyber Bot System*`,

    'calata': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *CALATA* 🫣\n📱 *MANDA FOTOS AL PRIVADO*\n💻 *Cyber Bot System*`,

    'cucufato': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *CUCUFATO* 😇\n🙏 *REZA Y LUEGO HACE SU MALDAD*\n💻 *Cyber Bot System*`,

    'cucufata': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *CUCUFATA* 😇\n⛪ *VA A MISA Y CHISMEEA*\n💻 *Cyber Bot System*`,

    'chancho': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *CHANCHO* 🐷\n🍖 *SE COME 3 PLATOS Y PIDE POSTRE*\n💻 *Cyber Bot System*`,

    'chancha': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *CHANCHA* 🐷\n🍗 *EN EL BUFFET NO TIENE LLENADERA*\n💻 *Cyber Bot System*`,

    'pobre': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *POBRE* 💸\n🥺 *PIDE PRESTADO Y NO DEVUELVE*\n💻 *Cyber Bot System*`,

    'rico': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *RICO* 💰\n😎 *INVITA LA CERVEZA*\n💻 *Cyber Bot System*`,

    'rica': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *RICA* 💰\n💅 *TOMA EN BARRANCO*\n💻 *Cyber Bot System*`,

    'mufa': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *MUFA* 🧿\n💀 *DONDE VA TODO SALE MAL*\n💻 *Cyber Bot System*`
  }

  let respuestaFinal = respuestas[command.toLowerCase()];

  if (respuestaFinal) {
    await conn.sendMessage(m.chat, {
      text: respuestaFinal,
      mentions: [who]
    }, { quoted: m });
  }
}

handler.help = ['calato', 'calata', 'cucufato', 'cucufata', 'chancho', 'chancha', 'pobre', 'rico', 'rica', 'mufa'].map((v) => v + " *@user*")
handler.tags = ['fun']
handler.command = /^(calato|calata|cucufato|cucufata|chancho|chancha|pobre|rico|rica|mufa)$/i

export default handler