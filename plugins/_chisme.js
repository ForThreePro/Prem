let handler = async (m, { conn, command, args }) => {

    // CHISMES
    let chismes = [
        "😈 *CHISME #1:* Dicen que @ se manda 'buenas noches' hasta las 4am con alguien",
        "🔥 *CHISME #2:* @ stalkea el 'en línea' de alguien específico todos los días",
        "🍷 *CHISME #3:* Me contaron que @ le dice 'dormiste?' a las 2am",
        //... aquí van tus 30 chismes completos
        "🥵 *CHISME #30:* @ puso 'nadie me habla' y 3 le respondieron al toque"
    ]

    // YO NUNCA
    let yonunca = [
        "😈 *YO NUNCA:* he mandado un 'hola' a las 3am esperando que me respondan",
        //... aquí van tus 30 yo nunca completos
        "🥵 *YO NUNCA:* he puesto 'nadie me habla' esperando respuestas"
    ]

    // VERDAD +18
    let verdad = [
        "😏 ¿A quién del grupo le darías un beso?",
        "🔥 ¿Cuál es tu mayor red flag?",
        "💋 ¿A quién stalkeas más?",
        "🙈 ¿De quién tienes capturas guardadas?",
        "🥵 ¿Con quién te gustaría tener una cita?",
        "😈 ¿Qué fue lo más hot que hiciste por chat?"
    ]

    // RETO +18
    let reto = [
        "😈 Manda un audio diciendo 'buenas noches' sexy",
        "🔥 Cambia tu foto 1 hora por la de tu crush",
        "💋 Declárate al primero que veas conectado",
        "🍷 Manda 'te extraño' a alguien sin contexto",
        "👀 Reacciona con 😏 a todo lo que ponga tu crush por 1 día",
        "🌙 Di 3 cosas que te gustan de alguien del grupo"
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

    // PIROPOS +18
    let piropos = [
        "😈 Si fueras wifi, quisiera conectarme toda la noche contigo",
        "🔥 No soy fotógrafo, pero me imagino contigo en 4K",
        "💋 Tienes cara de 'me haces perder la cordura'",
        "🍷 Si los besos fueran puntos, ya te hubiera ganado el juego",
        "👀 Me gustas más que el chisme de las 3am",
        "🌙 ¿Eres pizza? Porque te quiero completa y a deshoras",
        "🥵 Si sonreír fuera pecado, irías presa de lo guapa que estás",
        "😏 No creo en flechazos... pero contigo hago una excepción"
    ]

    if (command === 'chisme') {
        let mentionedJid = m.mentionedJid[0]
        let target = mentionedJid? `@${mentionedJid.split('@')[0]}` : 'alguien'
        let random = chismes[Math.floor(Math.random() * chismes.length)]
        let chismeFinal = random.replace(/@/g, target)
        let texto = `ᯇ 🔥 𝗖𝗛𝗜𝗦𝗠𝗘 +30 🔥 ୧\n⤷ ┇ 𝗟𝗢 𝗤𝗨𝗘 𝗣𝗔𝗦𝗔 𝗘𝗡 𝗟𝗔 𝗠𝗔𝗗𝗥𝗨𝗚𝗔𝗗𝗔 ：✿ 。\n\n${chismeFinal}\n\n──愛 *𝗔𝗗𝗩𝗘𝗥𝗧𝗘𝗡𝗖𝗜𝗔* ╏ 😏\n*Solo es chisme... o es la verdad*\n\n> *30 chismes disponibles* 🍵`
        await conn.reply(m.chat, texto, m, { mentions: mentionedJid? [mentionedJid] : [] })

    } else if (command === 'yonunca') {
        let random = yonunca[Math.floor(Math.random() * yonunca.length)]
        let texto = `ᯇ 🔥 𝗬𝗢 𝗡𝗨𝗡𝗖𝗔 +18 🔥 ୧\n⤷ ┇ 𝗤𝗨𝗜𝗘𝗡 𝗟𝗢 𝗛𝗔 𝗛𝗘𝗖𝗛𝗢 𝗤𝗨𝗘 𝗥𝗘𝗔𝗖𝗜𝗢𝗡𝗘 ：✿ 。\n\n${random}\n\n──愛 *𝗥𝗘𝗚𝗟𝗔𝗦* ╏ 😏\n*Reacciona con 🔥 si lo hiciste*\n*Reacciona con 😇 si nunca*\n\n> *Que la verdad salga* 🍵`
        await conn.reply(m.chat, texto, m)

    } else if (command === 'verdad18') {
        let random = verdad[Math.floor(Math.random() * verdad.length)]
        let texto = `ᯇ ❤️‍🔥 𝗩𝗘𝗥𝗗𝗔𝗗 +18 ❤️‍🔥 ୧\n${random}\n\n──愛 *𝗥𝗘𝗚𝗟𝗔𝗦* ╏\n*Responde con sinceridad o tomas shot* 😏\n\n> *.verdad18 para otra*`
        await conn.reply(m.chat, texto, m)

    } else if (command === 'reto18') {
        let random = reto[Math.floor(Math.random() * reto.length)]
        let texto = `ᯇ 😈 𝗥𝗘𝗧𝗢 +18 😈 ୧\n${random}\n\n──愛 *𝗥𝗘𝗚𝗟𝗔𝗦* ╏\n*Tienes 5 min para cumplir o castigo* 🔥\n\n> *.reto18 para otro*`
        await conn.reply(m.chat, texto, m)

    } else if (command === 'ship') {
        let who = m.mentionedJid[0]? m.mentionedJid[0] : m.sender
        let who2 = m.mentionedJid[1]? m.mentionedJid[1] : m.sender
        let porcentaje = Math.floor(Math.random() * 101)
        let frase = shipFrases[Math.floor(Math.random() * shipFrases.length)]
        let texto = `ᯇ 💞 𝗦𝗛𝗜𝗣𝗣𝗘𝗥 💞 ୧\n\n@${who.split('@')[0]} + @${who2.split('@')[0]}\n\n⤷ 𝗖𝗢𝗠𝗣𝗔𝗧𝗜𝗕𝗜𝗟𝗜𝗗𝗔𝗗: ${porcentaje}%\n⤷ *${frase}*\n\n──愛 *𝗘𝗟 𝗗𝗘𝗦𝗧𝗜𝗡𝗢 𝗛𝗔𝗕𝗟𝗔* ╏ 😏`
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