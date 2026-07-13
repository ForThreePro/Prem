let handler = async (m, { conn, command, text }) => {
  let who = m.mentionedJid && m.mentionedJid[0]? m.mentionedJid[0]
          : m.quoted? m.quoted.sender
          : m.sender;

  let name = await conn.getName(who);
  let userTarget = m.mentionedJid && m.mentionedJid[0]? `@${who.split('@')[0]}` : name;
  let porcentaje = Math.floor(Math.random() * 500) + 1;

  let respuestas = {
    // BASE
    'gay': `⛈️ *RAYO PREM SCANNER* 🌙\n\n⚡ *${userTarget}* *ES 🏳️‍🌈* *${porcentaje}%* *GAY*\n🌩️ *Team Nightwish*`,
    'lesbiana': `⛈️ *RAYO PREM SCANNER* 🌙\n\n⚡ *${userTarget}* *ES 🏳️‍🌈* *${porcentaje}%* *LESBIANA*\n🌩️ *Team Nightwish*`,
    'pajero': `⛈️ *RAYO PREM SCANNER* 🌙\n\n⚡ *${userTarget}* *ES 😏💦* *${porcentaje}%* *PAJERO*\n🌩️ *Team Nightwish*`,
    'pajera': `⛈️ *RAYO PREM SCANNER* 🌙\n\n⚡ *${userTarget}* *ES 😏💦* *${porcentaje}%* *PAJERA*\n🌩️ *Team Nightwish*`,
    'puto': `⛈️ *RAYO PREM SCANNER* 🌙\n\n⚡ *${userTarget}* *ES* *${porcentaje}%* *PUTO*\n🔥 *MÁS INFORMACIÓN A SU PRIVADO* 🔥🥵\n🌩️ *Team Nightwish*`,
    'puta': `⛈️ *RAYO PREM SCANNER* 🌙\n\n⚡ *${userTarget}* *ES* *${porcentaje}%* *PUTA*\n🔥 *MÁS INFORMACIÓN A SU PRIVADO* 🔥🥵\n🌩️ *Team Nightwish*`,
    'manco': `⛈️ *RAYO PREM SCANNER* 🌙\n\n⚡ *${userTarget}* *ES* *${porcentaje}%* *MANCO* 💩\n🌩️ *Team Nightwish*`,
    'manca': `⛈️ *RAYO PREM SCANNER* 🌙\n\n⚡ *${userTarget}* *ES* *${porcentaje}%* *MANCA* 💩\n🌩️ *Team Nightwish*`,
    'rata': `⛈️ *RAYO PREM SCANNER* 🌙\n\n⚡ *${userTarget}* *ES* *${porcentaje}%* *RATA* 🐁 *COME QUESO* 🧀\n🌩️ *Team Nightwish*`,
    'prostituto': `⛈️ *RAYO PREM SCANNER* 🌙\n\n⚡ *${userTarget}* *ES* *${porcentaje}%* *PROSTITUTO* 🫦👅\n❓ *¿QUIÉN QUIERE DE SUS SERVICIOS?*\n🌩️ *Team Nightwish*`,
    'prostituta': `⛈️ *RAYO PREM SCANNER* 🌙\n\n⚡ *${userTarget}* *ES* *${porcentaje}%* *PROSTITUTA* 🫦👅\n❓ *¿QUIÉN QUIERE DE SUS SERVICIOS?*\n🌩️ *Team Nightwish*`,

    // PERÚ + NUEVOS
    'choro': `⛈️ *RAYO PREM SCANNER* 🌙\n\n⚡ *${userTarget}* *ES* *${porcentaje}%* *CHORO* 🏃‍♂️💨\n⚠️ *GUARDEN SUS IPHONES* ⚠️\n🌩️ *Team Nightwish*`,
    'cachero': `⛈️ *RAYO PREM SCANNER* 🌙\n\n⚡ *${userTarget}* *ES* *${porcentaje}%* *CACHERO* 😈\n🔥 *NI EN DISCOTECA LO PARAN* 🔥\n🌩️ *Team Nightwish*`,
    'cauchera': `⛈️ *RAYO PREM SCANNER* 🌙\n\n⚡ *${userTarget}* *ES* *${porcentaje}%* *CAUCHERA* 😈💃\n🔥 *REINA DEL HUARIQUE* 🔥\n🌩️ *Team Nightwish*`,
    'cabezón': `⛈️ *RAYO PREM SCANNER* 🌙\n\n⚡ *${userTarget}* *ES* *${porcentaje}%* *CABEZÓN* 🤯\n🧠 *PIENSA CON LA OTRA CABEZA*\n🌩️ *Team Nightwish*`,
    'jinetero': `⛈️ *RAYO PREM SCANNER* 🌙\n\n⚡ *${userTarget}* *ES* *${porcentaje}%* *JINETERO* 🏍️\n💨 *PILOTO DE MOTOTAXI*\n🌩️ *Team Nightwish*`,
    'sangre': `⛈️ *RAYO PREM SCANNER* 🌙\n\n⚡ *${userTarget}* *ES* *${porcentaje}%* *SANGRE* 🩸\n💸 *VIVE DE PRESTAMO*\n🌩️ *Team Nightwish*`,
    'tragón': `⛈️ *RAYO PREM SCANNER* 🌙\n\n⚡ *${userTarget}* *ES* *${porcentaje}%* *TRAGÓN* 🍻\n🍺 *SE TOMA HASTA EL AGUA DEL FLORERO*\n🌩️ *Team Nightwish*`,
    'fresa': `⛈️ *RAYO PREM SCANNER* 🌙\n\n⚡ *${userTarget}* *ES* *${porcentaje}%* *FRESA* 🍓\n💅 *HABLA COMO GRINGO*\n🌩️ *Team Nightwish*`,
    'pipero': `⛈️ *RAYO PREM SCANNER* 🌙\n\n⚡ *${userTarget}* *ES* *${porcentaje}%* *PIPERO* 🌿\n😵‍💫 *VIVE EN OTRA DIMENSIÓN*\n🌩️ *Team Nightwish*`,
    'muerto': `⛈️ *RAYO PREM SCANNER* 🌙\n\n⚡ *${userTarget}* *ES* *${porcentaje}%* *MUERTO* 💀\n😴 *DUERME EN TODA REUNIÓN*\n🌩️ *Team Nightwish*`,

    // TUS 5 PEDIDOS
    'burro': `⛈️ *RAYO PREM SCANNER* 🌙\n\n⚡ *${userTarget}* *ES* *${porcentaje}%* *BURRO* 🫏\n🤡 *NI EL JEFE LO ENTIENDE*\n🌩️ *Team Nightwish*`,
    'burra': `⛈️ *RAYO PREM SCANNER* 🌙\n\n⚡ *${userTarget}* *ES* *${porcentaje}%* *BURRA* 🫏\n🤡 *REPROBÓ HASTA EN EDUC. FÍSICA*\n🌩️ *Team Nightwish*`,
    'kbro': `⛈️ *RAYO PREM SCANNER* 🌙\n\n⚡ *${userTarget}* *ES* *${porcentaje}%* *KBRO* 😈\n🔥 *NO RESPETA NI A SU ABUELA*\n🌩️ *Team Nightwish*`,
    'chivo': `⛈️ *RAYO PREM SCANNER* 🌙\n\n⚡ *${userTarget}* *ES* *${porcentaje}%* *CHIVO* 🐐\n💨 *HUELE A CERVEZA Y DISCOTECA*\n🌩️ *Team Nightwish*`,
    'kchera': `⛈️ *RAYO PREM SCANNER* 🌙\n\n⚡ *${userTarget}* *ES* *${porcentaje}%* *KCHERA* 😈💃\n🔥 *ROMPE CORAZONES*\n🌩️ *Team Nightwish*`,

    // +30 NUEVOS
    'bamba': `⛈️ *RAYO PREM SCANNER* 🌙\n\n⚡ *${userTarget}* *ES* *${porcentaje}%* *BAMBA* 📱\n⚠️ *CELULAR DURA 2 DIAS*\n🌩️ *Team Nightwish*`,
    'yapa': `⛈️ *RAYO PREM SCANNER* 🌙\n\n⚡ *${userTarget}* *ES* *${porcentaje}%* *YAPA* 🥭\n😏 *SIEMPRE PIDE DE MÁS*\n🌩️ *Team Nightwish*`,
    'caña': `⛈️ *RAYO PREM SCANNER* 🌙\n\n⚡ *${userTarget}* *ES* *${porcentaje}%* *CAÑA* 🥃\n🍺 *CON 2 YA ESTÁ TIRADO*\n🌩️ *Team Nightwish*`,
    'pata': `⛈️ *RAYO PREM SCANNER* 🌙\n\n⚡ *${userTarget}* *ES* *${porcentaje}%* *PATA* 🤝\n😎 *EL ALMA DE LA JODA*\n🌩️ *Team Nightwish*`,
    'floro': `⛈️ *RAYO PREM SCANNER* 🌙\n\n⚡ *${userTarget}* *ES* *${porcentaje}%* *FLORO* 💬\n💋 *ENAMORA CON PURA MENTIRA*\n🌩️ *Team Nightwish*`,
    'miserable': `⛈️ *RAYO PREM SCANNER* 🌙\n\n⚡ *${userTarget}* *ES* *${porcentaje}%* *MISERABLE* 💸\n🥺 *PIDE YAPA Y NO PAGA*\n🌩️ *Team Nightwish*`,
    'gil': `⛈️ *RAYO PREM SCANNER* 🌙\n\n⚡ *${userTarget}* *ES* *${porcentaje}%* *GIL* 🤡\n😵 *SE CAE SOLO*\n🌩️ *Team Nightwish*`,
    'gilasa': `⛈️ *RAYO PREM SCANNER* 🌙\n\n⚡ *${userTarget}* *ES* *${porcentaje}%* *GILASA* 🤡\n😵 *CREE TODO*\n🌩️ *Team Nightwish*`,
    'lenteja': `⛈️ *RAYO PREM SCANNER* 🌙\n\n⚡ *${userTarget}* *ES* *${porcentaje}%* *LENTEJA* 🐢\n🐌 *DEMORA 1 HORA EN RESPONDER*\n🌩️ *Team Nightwish*`,
    'chibolo': `⛈️ *RAYO PREM SCANNER* 🌙\n\n⚡ *${userTarget}* *ES* *${porcentaje}%* *CHIBOLO* 👶\n🎮 *VIVE EN FREE FIRE*\n🌩️ *Team Nightwish*`,
    'chibola': `⛈️ *RAYO PREM SCANNER* 🌙\n\n⚡ *${userTarget}* *ES* *${porcentaje}%* *CHIBOLA* 👧\n💄 *SUBE 20 HISTORIAS AL DÍA*\n🌩️ *Team Nightwish*`,
    'viejo': `⛈️ *RAYO PREM SCANNER* 🌙\n\n⚡ *${userTarget}* *ES* *${porcentaje}%* *VIEJO* 👴\n😮‍💨 *SE QUEJA DE TODO*\n🌩️ *Team Nightwish*`,
    'vieja': `⛈️ *RAYO PREM SCANNER* 🌙\n\n⚡ *${userTarget}* *ES* *${porcentaje}%* *VIEJA* 👵\n🗣️ *CHISME NIVEL DIOS*\n🌩️ *Team Nightwish*`,
    'grasa': `⛈️ *RAYO PREM SCANNER* 🌙\n\n⚡ *${userTarget}* *ES* *${porcentaje}%* *GRASA* 💪\n🏋️ *SOLO VA AL GYM A TOMAR FOTOS*\n🌩️ *Team Nightwish*`,
    'graso': `⛈️ *RAYO PREM SCANNER* 🌙\n\n⚡ *${userTarget}* *ES* *${porcentaje}%* *GRASO* 💪\n😎 *PIENSA QUE ESTÁ BUENAZO*\n🌩️ *Team Nightwish*`,
    'pituco': `⛈️ *RAYO PREM SCANNER* 🌙\n\n⚡ *${userTarget}* *ES* *${porcentaje}%* *PITUCO* 💎\n💳 *PAGA CON YAPE DE SU MAMÁ*\n🌩️ *Team Nightwish*`,
    'pituca': `⛈️ *RAYO PREM SCANNER* 🌙\n\n⚡ *${userTarget}* *ES* *${porcentaje}%* *PITUCA* 💎\n💅 *TOMA CAFÉ DE 30 SOLES*\n🌩️ *Team Nightwish*`,
    'sapa': `⛈️ *RAYO PREM SCANNER* 🌙\n\n⚡ *${userTarget}* *ES* *${porcentaje}%* *SAPA* 🐸\n👀 *VE TODO Y CUENTA TODO*\n🌩️ *Team Nightwish*`,
    'sapo': `⛈️ *RAYO PREM SCANNER* 🌙\n\n⚡ *${userTarget}* *ES* *${porcentaje}%* *SAPO* 🐸\n👀 *EL INFORMATIVO DEL GRUPO*\n🌩️ *Team Nightwish*`,
    'pavo': `⛈️ *RAYO PREM SCANNER* 🌙\n\n⚡ *${userTarget}* *ES* *${porcentaje}%* *PAVO* 🦃\n🤦 *SE TROPIEZA SOLO*\n🌩️ *Team Nightwish*`,
    'pava': `⛈️ *RAYO PREM SCANNER* 🌙\n\n⚡ *${userTarget}* *ES* *${porcentaje}%* *PAVA* 🦃\n🤦 *OLVIDA HASTA SU NOMBRE*\n🌩️ *Team Nightwish*`,
    'trome': `⛈️ *RAYO PREM SCANNER* 🌙\n\n⚡ *${userTarget}* *ES* *${porcentaje}%* *TROME* 👑\n🔥 *EL CRACK DEL BARRIO*\n🌩️ *Team Nightwish*`,
    'reina': `⛈️ *RAYO PREM SCANNER* 🌙\n\n⚡ *${userTarget}* *ES* *${porcentaje}%* *REINA* 👑\n💅 *MANDA EN EL GRUPO*\n🌩️ *Team Nightwish*`,
    'king': `⛈️ *RAYO PREM SCANNER* 🌙\n\n⚡ *${userTarget}* *ES* *${porcentaje}%* *KING* 👑\n😎 *EL JEFE DE LA JODA*\n🌩️ *Team Nightwish*`,
    'zombie': `⛈️ *RAYO PREM SCANNER* 🌙\n\n⚡ *${userTarget}* *ES* *${porcentaje}%* *ZOMBIE* 🧟\n😴 *VIVE CON SUEÑO*\n🌩️ *Team Nightwish*`,
    'tóxica': `⛈️ *RAYO PREM SCANNER* 🌙\n\n⚡ *${userTarget}* *ES* *${porcentaje}%* *TÓXICA* ☠️\n💔 *REVISA CELULAR*\n🌩️ *Team Nightwish*`,
    'tóxico': `⛈️ *RAYO PREM SCANNER* 🌙\n\n⚡ *${userTarget}* *ES* *${porcentaje}%* *TÓXICO* ☠️\n💔 *CELOSO NIVEL DIOS*\n🌩️ *Team Nightwish*`,
    'simp': `⛈️ *RAYO PREM SCANNER* 🌙\n\n⚡ *${userTarget}* *ES* *${porcentaje}%* *SIMP* 🥺\n💌 *MANDA 50 AUDIOS*\n🌩️ *Team Nightwish*`,
    'vago': `⛈️ *RAYO PREM SCANNER* 🌙\n\n⚡ *${userTarget}* *ES* *${porcentaje}%* *VAGO* 🛌\n😴 *TRABAJA 2 HORAS AL AÑO*\n🌩️ *Team Nightwish*`,
    'vaga': `⛈️ *RAYO PREM SCANNER* 🌙\n\n⚡ *${userTarget}* *ES* *${porcentaje}%* *VAGA* 🛌\n📺 *MARATON DE NETFLIX*\n🌩️ *Team Nightwish*`,
    'loquito': `⛈️ *RAYO PREM SCANNER* 🌙\n\n⚡ *${userTarget}* *ES* *${porcentaje}%* *LOQUITO* 🤪\n🌀 *HABLA SOLO*\n🌩️ *Team Nightwish*`,

    // NUEVOS PEDIDOS ⚡
    'fiel': `⛈️ *RAYO PREM SCANNER* 🌙\n\n⚡ *${userTarget}* *ES* *${porcentaje}%* *FIEL* 💍\n❤️ *NI CON 10 CERVEZAS ENGANCHA*\n🌩️ *Team Nightwish*`,
    'infiel': `⛈️ *RAYO PREM SCANNER* 🌙\n\n⚡ *${userTarget}* *ES* *${porcentaje}%* *INFIEL* 💔\n😏 *TIENE 3 Y NINGUNA SABE*\n🌩️ *Team Nightwish*`
  }

  let respuestaFinal = respuestas[command.toLowerCase()];

  if (respuestaFinal) {
    await conn.sendMessage(m.chat, {
      text: respuestaFinal,
      mentions: [who]
    }, { quoted: m });
  }
}

handler.help = ['gay', 'lesbiana', 'pajero', 'pajera', 'puto', 'puta', 'burro', 'burra', 'kbro', 'chivo', 'kchera', 'choro', 'cachero', 'cauchera', 'cabezón', 'jinetero', 'sangre', 'tragón', 'fresa', 'pipero', 'muerto', 'bamba', 'yapa', 'caña', 'pata', 'floro', 'miserable', 'gil', 'gilasa', 'lenteja', 'chibolo', 'chibola', 'viejo', 'vieja', 'grasa', 'graso', 'pituco', 'pituca', 'sapa', 'sapo', 'pavo', 'pava', 'trome', 'reina', 'king', 'zombie', 'tóxica', 'tóxico', 'simp', 'vago', 'vaga', 'loquito', 'manco', 'manca', 'rata', 'prostituta', 'prostituto', 'fiel', 'infiel'].map((v) => v + " *@user*")
handler.tags = ['fun']
handler.command = /^(gay|lesbiana|pajero|pajera|puto|puta|burro|burra|kbro|chivo|kchera|choro|cachero|cauchera|cabezón|jinetero|sangre|tragón|fresa|pipero|muerto|bamba|yapa|caña|pata|floro|miserable|gil|gilasa|lenteja|chibolo|chibola|viejo|vieja|grasa|graso|pituco|pituca|sapa|sapo|pavo|pava|trome|reina|king|zombie|tóxica|tóxico|simp|vago|vaga|loquito|manco|manca|rata|prostituta|prostituto|fiel|infiel)$/i

export default handler