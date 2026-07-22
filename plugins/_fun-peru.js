let handler = async (m, { conn, command, text }) => {
  let who = m.mentionedJid && m.mentionedJid[0]? m.mentionedJid[0]
          : m.quoted? m.quoted.sender
          : m.sender;

  let name = await conn.getName(who);
  let userTarget = m.mentionedJid && m.mentionedJid[0]? `@${who.split('@')[0]}` : name;
  let porcentaje = Math.floor(Math.random() * 100) + 1;

  let respuestas = {
    // ===== PACK 1: JERGA PERUANA =====
    'calato': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *CALATO* 🫣\n🏃‍♂️ *CORRE EN BÓXER EN SU CASA*\n💻 *Cyber Bot System*`,
    'calata': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *CALATA* 🫣\n📱 *MANDA FOTOS AL PRIVADO*\n💻 *Cyber Bot System*`,
    'cucufato': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *CUCUFATO* 😇\n🙏 *REZA Y LUEGO HACE SU MALDAD*\n💻 *Cyber Bot System*`,
    'cucufata': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *CUCUFATA* 😇\n⛪ *VA A MISA Y CHISMEEA*\n💻 *Cyber Bot System*`,
    'chancho': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *CHANCHO* 🐷\n🍖 *SE COME 3 PLATOS Y PIDE POSTRE*\n💻 *Cyber Bot System*`,
    'chancha': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *CHANCHA* 🐷\n🍗 *EN EL BUFFET NO TIENE LLENADERA*\n💻 *Cyber Bot System*`,
    'pobre': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *POBRE* 💸\n😭 *SU SALDO DURA 2 HORAS*\n💻 *Cyber Bot System*`,
    'rico': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *RICO* 💰\n😎 *INVITA LA CERVEZA*\n💻 *Cyber Bot System*`,
    'rica': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *RICA* 💰\n💅 *TOMA EN BARRANCO*\n💻 *Cyber Bot System*`,
    'mufa': `⚡ *CYBER BOT SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *MUFA* 🧿\n💀 *DONDE VA TODO SALE MAL*\n💻 *Cyber Bot System*`,

    // ===== PACK 2: AMOR =====
    'amor': `💘 *CYBER BOT LOVE SCANNER* 💘\n\n💕 *${userTarget}* *ES* *${porcentaje}%* *AMOR* 💕\n❤️ *EL/LA QUE TE ROBA EL CORAZÓN*\n💻 *Cyber Love System*`,
    'enamorado': `💘 *CYBER BOT LOVE SCANNER* 💘\n\n💕 *${userTarget}* *ES* *${porcentaje}%* *ENAMORADO* 🥰\n💌 *SUSPIRA POR ALGUIEN*\n💻 *Cyber Love System*`,
    'enamorada': `💘 *CYBER BOT LOVE SCANNER* 💘\n\n💕 *${userTarget}* *ES* *${porcentaje}%* *ENAMORADA* 🥰\n💌 *PIENSA EN SU CRUSH 24/7*\n💻 *Cyber Love System*`,
    'fiel': `💘 *CYBER BOT LOVE SCANNER* 💘\n\n💕 *${userTarget}* *ES* *${porcentaje}%* *FIEL* 💍\n🙏 *NI CON 10 CERVEZAS CAE*\n💻 *Cyber Love System*`,
    'infiel': `💘 *CYBER BOT LOVE SCANNER* 💘\n\n💕 *${userTarget}* *ES* *${porcentaje}%* *INFIEL* 💔\n😏 *TIENE PLAN B, C Y D*\n💻 *Cyber Love System*`,
    'romantico': `💘 *CYBER BOT LOVE SCANNER* 💘\n\n💕 *${userTarget}* *ES* *${porcentaje}%* *ROMÁNTICO* 🌹\n🎵 *TE CANTA EN LA DUCHA*\n💻 *Cyber Love System*`,
    'romantica': `💘 *CYBER BOT LOVE SCANNER* 💘\n\n💕 *${userTarget}* *ES* *${porcentaje}%* *ROMÁNTICA* 🌹\n💐 *QUIERE CENA Y FLORES*\n💻 *Cyber Love System*`,
    'celoso': `💘 *CYBER BOT LOVE SCANNER* 💘\n\n💕 *${userTarget}* *ES* *${porcentaje}%* *CELOSO* 😠\n📱 *REVISA HASTA LOS LIKES*\n💻 *Cyber Love System*`,
    'celosa': `💘 *CYBER BOT LOVE SCANNER* 💘\n\n💕 *${userTarget}* *ES* *${porcentaje}%* *CELOSA* 😠\n👀 *SI TE HABLA UNA CHICA ARDE TROYA*\n💻 *Cyber Love System*`,
    'casadero': `💘 *CYBER BOT LOVE SCANNER* 💘\n\n💕 *${userTarget}* *ES* *${porcentaje}%* *CASADERO* 💒\n👰 *YA QUIERE ANILLO*\n💻 *Cyber Love System*`,
    'casadera': `💘 *CYBER BOT LOVE SCANNER* 💘\n\n💕 *${userTarget}* *ES* *${porcentaje}%* *CASADERA* 💒\n👰 *MIRA VESTIDOS DE NOVIA*\n💻 *Cyber Love System*`,

    // ===== PACK 3: +18 PICANTES 🔥 =====
    'calenton': `🔥 *CYBER BOT +18 SCANNER* 🔥\n\n😈 *${userTarget}* *ES* *${porcentaje}%* *CALENTÓN* 🥵\n💦 *CON 2 MENSAJITOS YA ESTÁ LISTO*\n💻 *Cyber +18 System*`,
    'calentona': `🔥 *CYBER BOT +18 SCANNER* 🔥\n\n😈 *${userTarget}* *ES* *${porcentaje}%* *CALENTONA* 🥵\n💦 *PIDE NUDES A LAS 3AM*\n💻 *Cyber +18 System*`,
    'ninfomano': `🔥 *CYBER BOT +18 SCANNER* 🔥\n\n😈 *${userTarget}* *ES* *${porcentaje}%* *NINFÓMANO* 🍆\n🔥 *NO TIENE LLENADERA*\n💻 *Cyber +18 System*`,
    'ninfomana': `🔥 *CYBER BOT +18 SCANNER* 🔥\n\n😈 *${userTarget}* *ES* *${porcentaje}%* *NINFÓMANA* 🍑\n🔥 *24/7 EN MODO ACTIVO*\n💻 *Cyber +18 System*`,
    'cachero': `🔥 *CYBER BOT +18 SCANNER* 🔥\n\n😈 *${userTarget}* *ES* *${porcentaje}%* *CACHERO* 😏\n🍑 *NO PERDONA NI EN CUARENTENA*\n💻 *Cyber +18 System*`,
    'cauchera': `🔥 *CYBER BOT +18 SCANNER* 🔥\n\n😈 *${userTarget}* *ES* *${porcentaje}%* *CAUCHERA* 😏\n🍆 *REINA DE LA JODA NOCTURNA*\n💻 *Cyber +18 System*`,
    'tragasables': `🔥 *CYBER BOT +18 SCANNER* 🔥\n\n😈 *${userTarget}* *ES* *${porcentaje}%* *TRAGASABLES* 😋\n🤫 *ESPECIALISTA EN DESAYUNOS*\n💻 *Cyber +18 System*`,
    'mamador': `🔥 *CYBER BOT +18 SCANNER* 🔥\n\n😈 *${userTarget}* *ES* *${porcentaje}%* *MAMADOR* 👅\n🤫 *PROFESIONAL CERTIFICADO*\n💻 *Cyber +18 System*`,
    'semen': `🔥 *CYBER BOT +18 SCANNER* 🔥\n\n😈 *${userTarget}* *ES* *${porcentaje}%* *SEMENTAL* 🐎\n💪 *DURA TODA LA NOCHE*\n💻 *Cyber +18 System*`,
    'semental': `🔥 *CYBER BOT +18 SCANNER* 🔥\n\n😈 *${userTarget}* *ES* *${porcentaje}%* *SEMENTAL* 🐎\n💪 *MAQUINA DE GUERRA*\n💻 *Cyber +18 System*`
  }

  let respuestaFinal = respuestas[command.toLowerCase()];

  if (respuestaFinal) {
    await conn.sendMessage(m.chat, {
      text: respuestaFinal,
      mentions: [who]
    }, { quoted: m });
  }
}

handler.help = [
  'calato', 'calata', 'cucufato', 'cucufata', 'chancho', 'chancha', 'pobre', 'rico', 'rica', 'mufa',
  'amor', 'enamorado', 'enamorada', 'fiel', 'infiel', 'romantico', 'romantica', 'celoso', 'celosa', 'casadero', 'casadera',
  'calenton', 'calentona', 'ninfomano', 'ninfomana', 'cachero', 'cauchera', 'tragasables', 'mamador', 'semen', 'semental'
].map((v) => v + " *@user*")

handler.tags = ['fun2']
handler.command = /^(calato|calata|cucufato|cucufata|chancho|chancha|pobre|rico|rica|mufa|amor|enamorado|enamorada|fiel|infiel|romantico|romantica|celoso|celosa|casadero|casadera|calenton|calentona|ninfomano|ninfomana|cachero|cauchera|tragasables|mamador|semen|semental)$/i

export default handler