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
    return await conn.sendMessage(m.chat, { text: respuestaFinal, mentions: [who] }, { quoted: m });
  }

  // ===== JUEGOS - SIN SHIP =====
  if(command == 'ppt') {
    let opciones = ['piedra', 'papel', 'tijera']
    let bot = opciones[Math.floor(Math.random()*3)]
    return m.reply(`✊✋✌️ *PIEDRA PAPEL O TIJERA*\n\nYo saqué: *${bot}*\nUsa.piedra.papel o.tijera para jugar`)
  }

  if(command == 'dado') {
    return m.reply(`🎲 *LANZASTE EL DADO*\n\n*${name}* sacó: *${Math.floor(Math.random()*6)+1}*`)
  }

  if(command == 'ruleta') {
    let premios = ['S/50', 'Un beso', 'Lavar platos', 'Pagar la cerveza', 'Nada F', 'Yape de 5 lucas']
    return m.reply(`🎡 *RULETA DE LA SUERTE*\n\n*${name}* ganó: *${premios[Math.floor(Math.random()*premios.length)]}*`)
  }

  if(command == 'ahorcado') {
    return m.reply(`🔤 *AHORCADO*\n\nAdivina la palabra: _\nPista: Fruta peruana\nTienes 5 intentos. Usa.letra A`)
  }

  if(command == 'adivina') {
    let num = Math.floor(Math.random()*10)+1
    global.adivina = num
    return m.reply(`🔢 *ADIVINA EL NÚMERO*\n\nDel 1 al 10. Tienes 3 intentos\nUsa.numero 5`)
  }

  if(command == 'mentira') {
    return m.reply(`🤥 *DETECTOR DE MENTIRAS*\n\n*${name}* miente *${Math.floor(Math.random()*100)}%*\nNo le creas nada`)
  }

  if(command == 'tragamonedas') {
    let slots = ['🍒','🍋','💎','7️⃣','🍀']
    let r1 = slots[Math.floor(Math.random()*5)]
    let r2 = slots[Math.floor(Math.random()*5)]
    let r3 = slots[Math.floor(Math.random()*5)]
    let gano = r1 == r2 && r2 == r3
    return m.reply(`🎰 *TRAGAMONEDAS*\n\n| ${r1} | ${r2} | ${r3} |\n${gano? 'JACKPOT!! GANASTE 💰' : 'Sigue intentando'}`)
  }

  if(command == 'reto') {
    let retos = ['Manda audio cantando','Manda foto sin filtro','Di te amo a tu crush','Cambia tu foto 1 hora','Paga una recarga']
    return m.reply(`😈 *RETO*\n\n*${name}* te toca: *${retos[Math.floor(Math.random()*retos.length)]}*`)
  }

  if(command == 'verdad') {
    let verdades = ['A quién quieres del grupo?','Cuál es tu mayor secreto?','Con cuántos has salido?','Qué es lo más tóxico que has hecho?']
    return m.reply(`❓ *VERDAD*\n\n*${name}* responde: *${verdades[Math.floor(Math.random()*verdades.length)]}*`)
  }
}

handler.help = [
  'calato', 'calata', 'cucufato', 'cucufata', 'chancho', 'chancha', 'pobre', 'rico', 'rica', 'mufa',
  'amor', 'enamorado', 'enamorada', 'fiel', 'infiel', 'romantico', 'romantica', 'celoso', 'celosa', 'casadero', 'casadera',
  'calenton', 'calentona', 'ninfomano', 'ninfomana', 'cachero', 'cauchera', 'tragasables', 'mamador', 'semen', 'semental',
  'ppt', 'dado', 'ruleta', 'ahorcado', 'adivina', 'mentira', 'tragamonedas', 'reto', 'verdad'
].map((v) => v + " *@user*")

handler.tags = ['scanner', 'juegos']
handler.command = /^(calato|calata|cucufato|cucufata|chancho|chancha|pobre|rico|rica|mufa|amor|enamorado|enamorada|fiel|infiel|romantico|romantica|celoso|celosa|casadero|casadera|calenton|calentona|ninfomano|ninfomana|cachero|cauchera|tragasables|mamador|semen|semental|ppt|dado|ruleta|ahorcado|adivina|mentira|tragamonedas|reto|verdad)$/i

export default handler