let handler = async (m, { conn, command, args }) => {

    // CHISMES +30
    let chismes = [
        "😈 *CHISME #1:* Dicen que @ se manda 'buenas noches' hasta las 4am con alguien",
        "🔥 *CHISME #2:* @ stalkea el 'en línea' de alguien específico todos los días",
        "🍷 *CHISME #3:* Me contaron que @ le dice 'dormiste?' a las 2am",
        "👀 *CHISME #4:* @ guarda fotos de alguien del grupo en su galería",
        "💋 *CHISME #5:* @ le dio like a todas las fotos de su crush de 2018",
        "🥵 *CHISME #6:* @ se pone nervioso cuando @ entra al grupo",
        "😏 *CHISME #7:* @ tiene 2 cuentas y con una stalkea",
        "🔥 *CHISME #8:* @ borra los mensajes después de mandarlos",
        "🍷 *CHISME #9:* @ le miente a su 'amigo' sobre con quien habla",
        "👀 *CHISME #10:* @ reacciona a todo lo que sube alguien en específico",
        "💞 *CHISME #11:* @ dijo que no le gustaba nadie... y es mentira",
        "😈 *CHISME #12:* @ se ríe solo leyendo el chat",
        "🔥 *CHISME #13:* @ le ha escrito 'hola' y lo borró 3 veces",
        "🥵 *CHISME #14:* @ tiene capturas comprometedoras",
        "😏 *CHISME #15:* @ le pone apodos raros a alguien en su cel",
        "🍷 *CHISME #16:* @ finge estar ocupado para no responder",
        "👀 *CHISME #17:* @ se mete al perfil de alguien 10 veces al día",
        "💋 *CHISME #18:* @ le ha dedicado canciones sin que sepan",
        "🔥 *CHISME #19:* @ se hace el dormido pero está en línea",
        "😈 *CHISME #20:* @ le cuenta todo a su mejor amiga/amigo",
        "🥵 *CHISME #21:* @ tiene un crush secreto en el grupo",
        "😏 *CHISME #22:* @ le da me encanta y luego lo quita",
        "🍷 *CHISME #23:* @ se pone a ver estados viejos de alguien",
        "👀 *CHISME #24:* @ le escribe a ex a las 3am",
        "💞 *CHISME #25:* @ se rió de un chiste malo solo por quedar bien",
        "🔥 *CHISME #26:* @ tiene el número de alguien guardado como 'No contestar'",
        "😈 *CHISME #27:* @ le dijo 'te quiero' jugando... y no era juego",
        "🥵 *CHISME #28:* @ stalkea el whatsapp web de alguien",
        "😏 *CHISME #29:* @ se pone celoso pero no lo demuestra",
        "🍷 *CHISME #30:* @ puso 'nadie me habla' y 3 le respondieron al toque",
        "👀 *CHISME #31:* @ tiene una carpeta oculta con fotos",
        "💋 *CHISME #32:* @ le ha escrito 'soñé contigo'",
        "🔥 *CHISME #33:* @ le da visto y responde 5 horas después",
        "😈 *CHISME #34:* @ le pregunta a todos por alguien específico",
        "🥵 *CHISME #35:* @ se pone rojo cuando mencionan a su crush",
        "😏 *CHISME #36:* @ dice 'me da igual' pero le importa todo"
    ]

    // YO NUNCA +30
    let yonunca = [
        "😈 *YO NUNCA:* he mandado un 'hola' a las 3am esperando que me respondan",
        "🔥 *YO NUNCA:* he stalkeado a un ex por 2 horas seguidas",
        "🍷 *YO NUNCA:* he mentido diciendo 'ya voy llegando'",
        "👀 *YO NUNCA:* he borrado un mensaje por vergüenza",
        "💋 *YO NUNCA:* he tenido crush de alguien del grupo",
        "🥵 *YO NUNCA:* he guardado fotos de alguien sin permiso",
        "😏 *YO NUNCA:* he visto el 'en línea' a propósito",
        "🔥 *YO NUNCA:* he fingido estar dormido",
        "🍷 *YO NUNCA:* he escrito y borrado 10 veces",
        "👀 *YO NUNCA:* he tenido 2 conversaciones a la vez",
        "💞 *YO NUNCA:* he dicho 'no me importa' y sí me importó",
        "😈 *YO NUNCA:* he revisado el celular de alguien",
        "🔥 *YO NUNCA:* he puesto indirectas en estados",
        "🥵 *YO NUNCA:* he bloqueado y desbloqueado a alguien",
        "😏 *YO NUNCA:* he stalkeado hasta el 2015",
        "🍷 *YO NUNCA:* he usado cuenta falsa para ver historias",
        "👀 *YO NUNCA:* he reído de un chiste que no entendí",
        "💋 *YO NUNCA:* he dicho 'estoy ocupado' estando libre",
        "🔥 *YO NUNCA:* he soñado con alguien del grupo",
        "😈 *YO NUNCA:* he mandado audio de 5 minutos",
        "🥵 *YO NUNCA:* he puesto 'nadie me habla' esperando respuestas",
        "😏 *YO NUNCA:* he cambiado mi foto por alguien",
        "🍷 *YO NUNCA:* he llorado por un chat",
        "👀 *YO NUNCA:* he tenido celos sin razón",
        "💞 *YO NUNCA:* he dicho te extraño primero",
        "🔥 *YO NUNCA:* he espiado conversaciones ajenas",
        "😈 *YO NUNCA:* he usado 'jaja' para cortar el tema",
        "🥵 *YO NUNCA:* he mandado nudes... mentira 😏",
        "😏 *YO NUNCA:* he tenido 2 crush a la vez",
        "🍷 *YO NUNCA:* he buscado a alguien en todas las redes",
        "👀 *YO NUNCA:* he fingido que no vi el mensaje",
        "💋 *YO NUNCA:* he dicho 'qué haces' sin querer hablar",
        "🔥 *YO NUNCA:* he revisado si leyó mi mensaje",
        "😈 *YO NUNCA:* he puesto música triste por alguien",
        "🥵 *YO NUNCA:* he escrito borracho",
        "😏 *YO NUNCA:* he guardado el contacto como otro nombre"
    ]

    // VERDAD +18 +30 = 36
    let verdad = [
        "😏 ¿A quién del grupo le darías un beso?",
        "🔥 ¿Cuál es tu mayor red flag?",
        "💋 ¿A quién stalkeas más?",
        "🙈 ¿De quién tienes capturas guardadas?",
        "🥵 ¿Con quién te gustaría tener una cita?",
        "😈 ¿Qué fue lo más hot que hiciste por chat?",
        "🍷 ¿A quién le has mentido?",
        "👀 ¿Quién te gusta en secreto?",
        "💞 ¿Cuál es tu fantasía prohibida?",
        "🔥 ¿Has hecho algo de lo que te arrepientes?",
        "😏 ¿Con quién tendrías un amorio?",
        "🙈 ¿Qué es lo más loco que has hecho por amor?",
        "🥵 ¿Cuál es tu parte favorita del cuerpo?",
        "😈 ¿Le has escrito a un ex borracho?",
        "🍷 ¿A quién odias y por qué?",
        "👀 ¿Cuál es tu secreto más oscuro?",
        "💋 ¿Te has enamorado por chat?",
        "🔥 ¿Qué harías si te quedas solo con tu crush?",
        "😏 ¿Cuál fue tu peor cita?",
        "🙈 ¿Has besado a alguien del mismo sexo?",
        "🥵 ¿Qué es lo más atrevido que harías?",
        "😈 ¿A quién le tienes ganas?",
        "🍷 ¿Has enviado fotos hot?",
        "👀 ¿Cuál es tu posición favorita?",
        "💞 ¿Te gusta alguien casado?",
        "🔥 ¿Has engañado?",
        "😏 ¿Qué harías si te doy 24h conmigo?",
        "🙈 ¿Cuál es tu fetiche?",
        "🥵 ¿Has tenido un one night stand?",
        "😈 ¿Le has dicho 'te amo' sin sentirlo?",
        "🍷 ¿Con cuántas personas te has besado?",
        "👀 ¿Qué es lo más raro que te excita?",
        "💋 ¿Te has masturbado pensando en alguien del grupo?",
        "🔥 ¿Cuál es tu mayor fantasía sexual?",
        "😏 ¿Has tenido sexo en lugar raro?",
        "🙈 ¿Qué parte de tu cuerpo te gusta que toquen?"
    ]

    // RETO +18 +30 = 36
    let reto = [
        "😈 Manda un audio diciendo 'buenas noches' sexy",
        "🔥 Cambia tu foto 1 hora por la de tu crush",
        "💋 Declárate al primero que veas conectado",
        "🍷 Manda 'te extraño' a alguien sin contexto",
        "👀 Reacciona con 😏 a todo lo que ponga tu crush por 1 día",
        "🌙 Di 3 cosas que te gustan de alguien del grupo",
        "🔥 Manda tu última foto de galería",
        "😏 Di 'bésame' al admin",
        "💞 Graba un audio cantando una canción de amor",
        "🥵 Manda 'quiero estar contigo' a tu crush",
        "😈 Di en voz alta 3 cosas que te excitan",
        "🍷 Cambia tu estado por 'me gustas'",
        "👀 Manda captura de tu último chat",
        "💋 Di te amo a 3 personas",
        "🔥 Baila sexy y manda el video",
        "😏 Di el nombre de tu ex 3 veces",
        "🌙 Manda foto sin camisa/pijama",
        "😈 Escribe una carta de amor de 4 líneas",
        "🍷 Llama a alguien y di 'pensé en ti'",
        "👀 Di 5 cumplidos al que está arriba tuyo",
        "💞 Manda sticker +18",
        "🔥 Confiesa algo en el grupo",
        "😏 Di 'hazme tuyo' al bot",
        "🙈 Manda foto de tu boca",
        "🥵 Di que te gusta de cada persona del grupo",
        "😈 Manda 'dormimos juntos?' a alguien",
        "🍷 Describe como sería tu cita perfecta",
        "👀 Di tu mayor deseo sexual",
        "💋 Manda nota de voz gimiendo tu nombre",
        "🔥 Di 'quiero probarte' al admin",
        "😏 Cambia tu nombre 1 hora por 'El/la de todos'",
        "🌙 Di que harías si te beso ahora",
        "😈 Manda emoji que describa tu noche",
        "🍷 Di 'me prendes' a alguien",
        "👀 Confiesa a quien le escribirías a las 3am",
        "💞 Manda 'ven a mi cuarto' al grupo"
    ]

    // SHIP
    let shipFrases = [
        "hay química brutal 😏",
        "se ven bien juntos 💞",
        "alguien está enamorado 👀",
        "esto va a terminar mal... o bien 🔥",
        "match perfecto 💋",
        "mejor amigos... por ahora 😇"
    ]

    // PIROPOS +18 +30 = 38
    let piropos = [
        "😈 Si fueras wifi, quisiera conectarme toda la noche contigo",
        "🔥 No soy fotógrafo, pero me imagino contigo en 4K",
        "💋 Tienes cara de 'me haces perder la cordura'",
        "🍷 Si los besos fueran puntos, ya te hubiera ganado el juego",
        "👀 Me gustas más que el chisme de las 3am",
        "🌙 ¿Eres pizza? Porque te quiero completa y a deshoras",
        "🥵 Si sonreír fuera pecado, irías presa de lo guapa que estás",
        "😏 No creo en flechazos... pero contigo hago una excepción",
        "🔥 ¿Crees en amor a primera vista o paso otra vez?",
        "💞 Si la belleza fuera delito, tendrías cadena perpetua",
        "😈 Eres como el café: me desvelas pero te necesito",
        "🍷 ¿Te duele? Porque te caíste del cielo",
        "👀 Si fueras tarea no te haría, me la pasaría mirándote",
        "💋 Tienes labios de 'bésame y calla'",
        "🔥 ¿Eres imán? Porque me atraes demasiado",
        "😏 Si fueras nota, serías 20/10",
        "🌙 Me gustas más que el wifi gratis",
        "🥵 ¿Eres Google? Porque tienes todo lo que busco",
        "😈 Si los piropos fueran balas, ya estarías muerta",
        "🍷 Eres el error 404: no te encuentro pero te busco",
        "👀 ¿Te llamas Google? Porque lo tienes todo",
        "💞 Si fueras deuda, no te pagaría para tenerte cerca",
        "🔥 Eres como el Netflix: me tienes viciado",
        "😏 Si besos fueran lluvia, haría diluvio contigo",
        "🌙 ¿Eres alarma? Porque me despiertas cosas",
        "🥵 Tienes cara de problemas... y me gustan los problemas",
        "😈 Si fueras examen, no estudiaría. Te copiaría",
        "🍷 ¿Crees en destino? Porque el mío eres tú",
        "👀 Eres como el chocolate: adictivo y prohibido",
        "💋 Si fueras canción, sería la que repito",
        "🔥 ¿Eres fuego? Porque me quemas por dentro",
        "😏 Me gustas en HD y en 4K",
        "🌙 Si fueras app, no te borraría nunca",
        "🥵 Tienes sonrisa de 'róbame un beso'",
        "😈 ¿Eres ley? Porque quiero romperla contigo",
        "🍷 Si fueras pecado, pecaría mil veces",
        "👀 Me tienes pensando cosas que no debo",
        "💞 Ven que te doy un abrazo que cure el alma"
    ]

    if (command === 'chisme') {
        let mentionedJid = m.mentionedJid[0]
        let target = mentionedJid? `@${mentionedJid.split('@')[0]}` : 'alguien'
        let random = chismes[Math.floor(Math.random() * chismes.length)]
        let chismeFinal = random.replace(/@/g, target)
        let texto = `ᯇ 🔥 𝗖𝗛𝗜𝗦𝗠𝗘 +36 🔥 ୧\n⤷ ┇ 𝗟𝗢 𝗤𝗨𝗘 𝗣𝗔𝗦𝗔 𝗘𝗡 𝗟𝗔 𝗠𝗔𝗗𝗥𝗨𝗚𝗔𝗗𝗔 ：✿ 。\n\n${chismeFinal}\n\n──愛 *𝗔𝗗𝗩𝗘𝗥𝗧𝗘𝗡𝗖𝗜𝗔* ╏ 😏\n*Solo es chisme... o es la verdad*\n\n> *36 chismes disponibles* 🍵`
        await conn.reply(m.chat, texto, m, { mentions: mentionedJid? [mentionedJid] : [] })

    } else if (command === 'yonunca') {
        let random = yonunca[Math.floor(Math.random() * yonunca.length)]
        let texto = `ᯇ 🔥 𝗬𝗢 𝗡𝗨𝗡𝗖𝗔 +18 🔥 ୧\n⤷ ┇ 𝗤𝗨𝗜𝗘𝗡 𝗟𝗢 𝗛𝗔 𝗛𝗘𝗖𝗛𝗢 𝗤𝗨𝗘 𝗥𝗘𝗔𝗖𝗜𝗢𝗡𝗘 ：✿ 。\n\n${random}\n\n──愛 *𝗥𝗘𝗚𝗟𝗔𝗦* ╏ 😏\n*Reacciona con 🔥 si lo hiciste*\n*Reacciona con 😇 si nunca*\n\n> *36 preguntas disponibles* 🍵`
        await conn.reply(m.chat, texto, m)

    } else if (command === 'verdad18') {
        let random = verdad[Math.floor(Math.random() * verdad.length)]
        let texto = `ᯇ ❤️‍🔥 𝗩𝗘𝗥𝗗𝗔𝗗 +18 ❤️‍🔥 ୧\n${random}\n\n──愛 *𝗥𝗘𝗚𝗟𝗔𝗦* ╏\n*Responde con sinceridad o tomas shot* 😏\n\n> *36 preguntas disponibles*`
        await conn.reply(m.chat, texto, m)

    } else if (command === 'reto18') {
        let random = reto[Math.floor(Math.random() * reto.length)]
        let texto = `ᯇ 😈 𝗥𝗘𝗧𝗢 +18 😈 ୧\n${random}\n\n──愛 *𝗥𝗘𝗚𝗟𝗔𝗦* ╏\n*Tienes 5 min para cumplir o castigo* 🔥\n\n> *36 retos disponibles*`
        await conn.reply(m.chat, texto, m)

    } else if (command === 'ship') {
        let who = m.mentionedJid[0]? m.mentionedJid[0] : m.sender
        let who2 = m.mentionedJid[1]? m.mentionedJid[1] : m.sender
        let porcentaje = Math.floor(Math.random() * 101)
        let frase = shipFrases[Math.floor(Math.random() * shipFrases.length)]
        let texto = `ᯇ 💞 𝗦𝗛𝗜𝗣𝗘𝗥 💞 ୧\n@${who.split('@')[0]} + @${who2.split('@')[0]}\n\n⤷ 𝗖𝗢𝗠𝗣𝗔𝗧𝗜𝗕𝗜𝗟𝗜𝗗𝗔𝗗: ${porcentaje}%\n⤷ *${frase}*\n\n──愛 *𝗘𝗟 𝗗𝗘𝗦𝗧𝗜𝗡𝗢 𝗛𝗔𝗕𝗟𝗔* ╏ 😏`
        await conn.reply(m.chat, texto, m, { mentions: [who, who2] })

    } else if (command === 'clima') {
        let niveles = ["TRANQUI 😇", "TIBIO 😐", "CALIENTE 🔥", "HIRVIENDO 🥵", "EXTREMADAMENTE CALIENTE 😈"]
        let nivel = niveles[Math.floor(Math.random() * niveles.length)]
        let razones = ["Mucho.chisme", "Spameo de.ship", "Actividad en yonunca", "Retos a deshoras"]
        let razon = razones[Math.floor(Math.random() * razones.length)]
        let texto = `ᯇ 🌡️ 𝗖𝗟𝗜𝗠𝗔 𝗗𝗘𝗟 𝗚𝗥𝗨𝗣𝗢 🌡️ ୧\n⤷ 𝗘𝗦𝗧𝗔𝗗𝗢: *${nivel}*\n⤷ 𝗥𝗔𝗭𝗢𝗡: ${razon}\n\n──愛 *Recomendación: Abríguense* ╏ 😏\n\n> *Usa.clima para verlo otra vez*`
        await conn.reply(m.chat, texto, m)

    } else if (command === 'piropo18') {
        let mentionedJid = m.mentionedJid[0]
        let target = mentionedJid? `@${mentionedJid.split('@')[0]}` : 'alguien'
        let random = piropos[Math.floor(Math.random() * piropos.length)]
        let texto = `ᯇ 💋 𝗣𝗜𝗥𝗢𝗣𝗢 +18 💋 ୧\nPara: ${target}\n\n${random}\n\n──愛 *Con cariño, el bot chismoso* ╏ 😏`
        await conn.reply(m.chat, texto, m, { mentions: mentionedJid? [mentionedJid] : [] })
    }
}

handler.help = ['chisme [@usuario]', 'yonunca', 'verdad18', 'reto18', 'ship [@1 @2]', 'clima', 'piropo18 [@usuario]']
handler.tags = ['fun']
handler.command = /^(chisme|yonunca|verdad18|reto18|ship|clima|piropo18)$/i
handler.group = true

export default handler