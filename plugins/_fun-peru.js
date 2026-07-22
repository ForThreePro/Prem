let handler = async (m, { conn, command, text }) => {
  let who = m.mentionedJid && m.mentionedJid[0]? m.mentionedJid[0]
          : m.quoted? m.quoted.sender
          : m.sender;

  let name = await conn.getName(who);
  let userTarget = m.mentionedJid && m.mentionedJid[0]? `@${who.split('@')[0]}` : name;
  let porcentaje = Math.floor(Math.random() * 100) + 1;

  let respuestas = {
    // ===== PACK 1: JERGA PERUANA =====
    'calato': `⚡ *SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *CALATO* 🫣\n🏃‍♂️ *CORRE EN BÓXER EN SU CASA*`,
    'calata': `⚡ *SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *CALATA* 🫣\n📱 *MANDA FOTOS AL PRIVADO*`,
    'cucufato': `⚡ *SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *CUCUFATO* 😇\n🙏 *REZA Y LUEGO HACE SU MALDAD*`,
    'cucufata': `⚡ *SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *CUCUFATA* 😇\n⛪ *VA A MISA Y CHISMEEA*`,
    'chancho': `⚡ *SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *CHANCHO* 🐷\n🍖 *SE COME 3 PLATOS Y PIDE POSTRE*`,
    'chancha': `⚡ *SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *CHANCHA* 🐷\n🍗 *EN EL BUFFET NO TIENE LLENADERA*`,
    'pobre': `⚡ *SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *POBRE* 💸\n😭 *SU SALDO DURA 2 HORAS*`,
    'rico': `⚡ *SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *RICO* 💰\n😎 *INVITA LA CERVEZA*`,
    'rica': `⚡ *SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *RICA* 💰\n💅 *TOMA EN BARRANCO*`,
    'mufa': `⚡ *SCANNER* 💻\n\n🤖 *${userTarget}* *ES* *${porcentaje}%* *MUFA* 🧿\n💀 *DONDE VA TODO SALE MAL*`,

    // ===== PACK 2: AMOR =====
    'amor': `💘 *LOVE SCANNER* 💘\n\n💕 *${userTarget}* *ES* *${porcentaje}%* *AMOR* 💕\n❤️ *EL/LA QUE TE ROBA EL CORAZÓN*`,
    'enamorado': `💘 *LOVE SCANNER* 💘\n\n💕 *${userTarget}* *ES* *${porcentaje}%* *ENAMORADO* 🥰\n💌 *SUSPIRA POR ALGUIEN*`,
    'enamorada': `💘 *LOVE SCANNER* 💘\n\n💕 *${userTarget}* *ES* *${porcentaje}%* *ENAMORADA* 🥰\n💌 *PIENSA EN SU CRUSH 24/7*`,
    'fiel': `💘 *LOVE SCANNER* 💘\n\n💕 *${userTarget}* *ES* *${porcentaje}%* *FIEL* 💍\n🙏 *NI CON 10 CERVEZAS CAE*`,
    'infiel': `💘 *LOVE SCANNER* 💘\n\n💕 *${userTarget}* *ES* *${porcentaje}%* *INFIEL* 💔\n😏 *TIENE PLAN B, C Y D*`,
    'romantico': `💘 *LOVE SCANNER* 💘\n\n💕 *${userTarget}* *ES* *${porcentaje}%* *ROMÁNTICO* 🌹\n🎵 *TE CANTA EN LA DUCHA*`,
    'romantica': `💘 *LOVE SCANNER* 💘\n\n💕 *${userTarget}* *ES* *${porcentaje}%* *ROMÁNTICA* 🌹\n💐 *QUIERE CENA Y FLORES*`,
    'celoso': `💘 *LOVE SCANNER* 💘\n\n💕 *${userTarget}* *ES* *${porcentaje}%* *CELOSO* 😠\n📱 *REVISA HASTA LOS LIKES*`,
    'celosa': `💘 *LOVE SCANNER* 💘\n\n💕 *${userTarget}* *ES* *${porcentaje}%* *CELOSA* 😠\n👀 *SI TE HABLA UNA CHICA ARDE TROYA*`,
    'casadero': `💘 *LOVE SCANNER* 💘\n\n💕 *${userTarget}* *ES* *${porcentaje}%* *CASADERO* 💒\n👰 *YA QUIERE ANILLO*`,
    'casadera': `💘 *LOVE SCANNER* 💘\n\n💕 *${userTarget}* *ES* *${porcentaje}%* *CASADERA* 💒\n👰 *MIRA VESTIDOS DE NOVIA*`,

    // ===== PACK 3: +18 PICANTES 🔥 =====
    'calenton': `🔥 *+18 SCANNER* 🔥\n\n😈 *${userTarget}* *ES* *${porcentaje}%* *CALENTÓN* 🥵\n💦 *CON 2 MENSAJITOS YA ESTÁ LISTO*`,
    'calentona': `🔥 *+18 SCANNER* 🔥\n\n😈 *${userTarget}* *ES* *${porcentaje}%* *CALENTONA* 🥵\n💦 *PIDE NUDES A LAS 3AM*`,
    'ninfomano': `🔥 *+18 SCANNER* 🔥\n\n😈 *${userTarget}* *ES* *${porcentaje}%* *NINFÓMANO* 🍆\n🔥 *NO TIENE LLENADERA*`,
    'ninfomana': `🔥 *+18 SCANNER* 🔥\n\n😈 *${userTarget}* *ES* *${porcentaje}%* *NINFÓMANA* 🍑\n🔥 *24/7 EN MODO ACTIVO*`,
    'cachero': `🔥 *+18 SCANNER* 🔥\n\n😈 *${userTarget}* *ES* *${porcentaje}%* *CACHERO* 😏\n🍑 *NO PERDONA NI EN CUARENTENA*`,
    'cauchera': `🔥 *+18 SCANNER* 🔥\n\n😈 *${userTarget}* *ES* *${porcentaje}%* *CAUCHERA* 😏\n🍆 *REINA DE LA JODA NOCTURNA*`,
    'tragasables': `🔥 *+18 SCANNER* 🔥\n\n😈 *${userTarget}* *ES* *${porcentaje}%* *TRAGASABLES* 😋\n🤫 *ESPECIALISTA EN DESAYUNOS*`,
    'mamador': `🔥 *+18 SCANNER* 🔥\n\n😈 *${userTarget}* *ES* *${porcentaje}%* *MAMADOR* 👅\n🤫 *PROFESIONAL CERTIFICADO*`,
    'semen': `🔥 *+18 SCANNER* 🔥\n\n😈 *${userTarget}* *ES* *${porcentaje}%* *SEMENTAL* 🐎\n💪 *DURA TODA LA NOCHE*`,
    'semental': `🔥 *+18 SCANNER* 🔥\n\n😈 *${userTarget}* *ES* *${porcentaje}%* *SEMENTAL* 🐎\n💪 *MAQUINA DE GUERRA*`
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