let handler = async (m, { conn, command, args }) => {
    let who = m.mentionedJid[0]? m.mentionedJid[0] : m.quoted? m.quoted.sender : m.sender
    let user = conn.getName(who)
    let porcentaje = Math.floor(Math.random() * 101)

    const BOX_TOP = `╭─「 😈 *JODA* 」`
    const BOX_MID = `│`
    const BOX_BOT = `╰─────────────────`

    switch(command) {
        case 'puto':
        case 'puta':
            await conn.reply(m.chat, `${BOX_TOP}
${BOX_MID} 🔥 *${user.toUpperCase()} ES UN ${command.toUpperCase()}* 🔥
${BOX_MID}
${BOX_MID} Nivel: ${porcentaje}%
${BOX_MID} Certificado oficial del grupo 😂
${BOX_BOT}`, m)
            break

        case 'manco':
        case 'manca':
            await conn.reply(m.chat, `${BOX_TOP}
${BOX_MID} 🎮 *${user}*
${BOX_MID}
${BOX_MID} Nivel de manco: ${porcentaje}%
${BOX_MID} Ni en Free Fire le ganas a un bot
${BOX_BOT}`, m)
            break

        case 'rata':
            await conn.reply(m.chat, `${BOX_TOP}
${BOX_MID} 🐀 *RATA DETECTADA* 🐀
${BOX_MID}
${BOX_MID} Nombre: ${user}
${BOX_MID} Nivel de rata: ${porcentaje}%
${BOX_MID} Se roba hasta el wifi
${BOX_BOT}`, m)
            break

        case 'chipi':
            await conn.reply(m.chat, `${BOX_TOP}
${BOX_MID} 👶 *${user} ES CHIPI* 👶
${BOX_MID}
${BOX_MID} Nivel de chipi: ${porcentaje}%
${BOX_MID} Aún toma leche
${BOX_BOT}`, m)
            break

        case 'sintetas':
            await conn.reply(m.chat, `${BOX_TOP}
${BOX_MID} 📉 *${user}*
${BOX_MID}
${BOX_MID} Estado: SIN TETAS
${BOX_MID} Tabla de planchar certificada
${BOX_BOT}`, m)
            break

        case 'sinpoto':
            await conn.reply(m.chat, `${BOX_TOP}
${BOX_MID} 🍑 *${user}*
${BOX_MID}
${BOX_MID} Estado: SIN POTO
${BOX_MID} Puro hueso y dolor
${BOX_BOT}`, m)
            break

        case 'sinpito':
            await conn.reply(m.chat, `${BOX_TOP}
${BOX_MID} 🌭 *${user}*
${BOX_MID}
${BOX_MID} Estado: SIN PITO
${BOX_MID} Microondas nivel miniatura
${BOX_MID} F por él
${BOX_BOT}`, m)
            break

        case 'pajero':
            await conn.reply(m.chat, `${BOX_TOP}
${BOX_MID} 🖐️ *${user} ES PAJERO* 🖐️
${BOX_MID}
${BOX_MID} Nivel: ${porcentaje}%
${BOX_MID} 5 dedos de experiencia
${BOX_BOT}`, m)
            break

        case 'pitochico':
            await conn.reply(m.chat, `${BOX_TOP}
${BOX_MID} 📏 *${user}*
${BOX_MID}
${BOX_MID} Medida: ${porcentaje / 10} cm
${BOX_MID} No pasa de la uña
${BOX_MID} Usa zoom para verlo
${BOX_BOT}`, m)
            break

        case 'feo':
        case 'fea':
            await conn.reply(m.chat, `${BOX_TOP}
${BOX_MID} 👹 *${user}*
${BOX_MID}
${BOX_MID} Nivel de feo: ${porcentaje}%
${BOX_MID} Asusta hasta al espejo
${BOX_BOT}`, m)
            break

        case 'rica':
            await conn.reply(m.chat, `${BOX_TOP}
${BOX_MID} 🍑 *MAMACITA DETECTADA* 🍑
${BOX_MID}
${BOX_MID} Nombre: ${user}
${BOX_MID} Nivel de rica: ${porcentaje}%
${BOX_MID} Diosito se esmeró
${BOX_BOT}`, m)
            break

        case 'horrible':
            await conn.reply(m.chat, `${BOX_TOP}
${BOX_MID} ☢️ *NIVEL HORRIBLE* ☢️
${BOX_MID}
${BOX_MID} ${user}
${BOX_MID} Daño colateral: ${porcentaje}%
${BOX_MID} Prohibido mostrarse de día
${BOX_BOT}`, m)
            break

        case 'mostro':
        case 'mostra':
            await conn.reply(m.chat, `${BOX_TOP}
${BOX_MID} 🐒 *${user.toUpperCase()} ES UN MOSTRO* 🐒
${BOX_MID}
${BOX_MID} Nivel de mostro: ${porcentaje}%
${BOX_MID} Parecido al mono de tu foto
${BOX_BOT}`, m)
            break

        case 'soylindo':
            await conn.reply(m.chat, `${BOX_TOP}
${BOX_MID} ✨ *${user}*
${BOX_MID}
${BOX_MID} Nivel de lindo: ${porcentaje}%
${BOX_MID} Se le cae la belleza
${BOX_BOT}`, m)
            break

        case 'soylinda':
            await conn.reply(m.chat, `${BOX_TOP}
${BOX_MID} 👑 *${user}*
${BOX_MID}
${BOX_MID} Nivel de linda: ${porcentaje}%
${BOX_MID} Perrísima y lo sabe
${BOX_BOT}`, m)
            break
    }
}

handler.help = ['puto', 'puta', 'manco', 'rata', 'chipi', 'sintetas', 'sinpoto', 'sinpito', 'pajero', 'pitochico', 'feo', 'fea', 'rica', 'horrible', 'mostro', 'mostra', 'soylindo', 'soylinda']
handler.tags = ['fun']
handler.command = /^(puto|puta|manco|manca|rata|chipi|sintetas|sinpoto|sinpito|pajero|pitochico|feo|fea|rica|horrible|mostro|mostra|soylindo|soylinda)$/i
handler.group = true
export default handler