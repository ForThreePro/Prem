let handler = async (m, { conn, args }) => {
    let chismes = [
        "😈 *CHISME #1:* Dicen que @ se manda 'buenas noches' hasta las 4am con alguien",
        "🔥 *CHISME #2:* @ stalkea el 'en línea' de alguien específico todos los días",
        "🍷 *CHISME #3:* Me contaron que @ le dice 'dormiste?' a las 2am",
        "💋 *CHISME #4:* Ayer @ puso 'me voy a dormir' y siguió conectado 3 horas",
        "😏 *CHISME #5:* Dicen que @ guarda capturas de conversaciones importantes 👀",
        "🛏️ *CHISME #6:* @ se ríe solo cuando mencionan a su crush",
        "👀 *CHISME #7:* @ cambió su foto después de que alguien lo halagara",
        "🌙 *CHISME #8:* Me dijeron que @ se pone intenso en las madrugadas",
        "😳 *CHISME #9:* @ dejó en visto 5 horas y respondió 'jaja perdón estaba ocupado'",
        "💌 *CHISME #10:* Dicen que @ ya está pasando números por DM",
        "🤭 *CHISME #11:* @ reacciona a TODO lo que pone su crush",
        "💔 *CHISME #12:* @ usó.divorcio por celos y al día siguiente volvió",
        "🥵 *CHISME #13:* @ preguntó '¿qué haces?' a las 2am y borró el mensaje",
        "😮‍💨 *CHISME #14:* Dicen que @ se puso de acuerdo para no hablarle a alguien... y falló",
        "🙈 *CHISME #15:* @ ensaya que decir antes de escribirle a alguien",
        "😇 *CHISME #16:* @ se pone nervioso cuando le hablan por privado",
        "🍵 *CHISME #17:* @ borró 10 mensajes seguidos por arrepentimiento",
        "💞 *CHISME #18:* Dicen que @ tiene algo con alguien del grupo",
        "😈 *CHISME #19:* @ le dio like a una foto de hace 2 años... casualidad?",
        "🔥 *CHISME #20:* @ se pelea en el grupo pero habla bonito en DM",
        "🍷 *CHISME #21:* @ pregunta '¿quién está despierto?' todas las noches",
        "💋 *CHISME #22:* Dicen que @ se sonroja leyendo los.ship",
        "😏 *CHISME #23:* @ tiene el número de 4 personas del grupo",
        "👀 *CHISME #24:* @ puso estado y lo borró a los 5 minutos... ¿por qué?",
        "🌙 *CHISME #25:* @ siempre aparece conectado a la misma hora que alguien",
        "😳 *CHISME #26:* @ le dijo 'me caes bien' y se arrepintió",
        "💌 *CHISME #27:* Dicen que @ ya pidió fotos... de perfil nomas",
        "🤭 *CHISME #28:* @ se ríe solo leyendo los chismes",
        "💔 *CHISME #29:* @ extraña a su ex pero le habla a otro",
        "🥵 *CHISME #30:* @ puso 'nadie me habla' y 3 le respondieron al toque"
    ]

    let mentionedJid = m.mentionedJid[0]
    let target = mentionedJid? `@${mentionedJid.split('@')[0]}` : 'alguien'
    let random = chismes[Math.floor(Math.random() * chismes.length)]

    // Reemplaza el @ por el usuario mencionado o "alguien"
    let chismeFinal = random.replace(/@/g, target)

    let texto = `ᯇ 🔥 𝗖𝗛𝗜𝗦𝗠𝗘 +30 🔥 ୧

⤷ ┇ 𝗟𝗢 𝗤𝗨𝗘 𝗣𝗔𝗦𝗔 𝗘𝗡 𝗟𝗔 𝗠𝗔𝗗𝗥𝗨𝗚𝗔𝗗𝗔 ：✿ 。

${chismeFinal}

──愛 *𝗔𝗗𝗩𝗘𝗥𝗧𝗘𝗡𝗖𝗜𝗔* ╏ 😏
*Solo es chisme... o es la verdad*
*Usa.chisme @usuario para personalizar*

> *30 chismes disponibles* 🍵`

    await conn.reply(m.chat, texto, m, { mentions: mentionedJid? [mentionedJid] : [] })
}

handler.help = ['chisme [@usuario]']
handler.tags = ['fun']
handler.command = /^(chisme|rumor|chismes)$/i
handler.group = true

export default handler