let handler = async (m, { conn, command, args }) => {
    let who = m.mentionedJid[0]? m.mentionedJid[0] : m.quoted? m.quoted.sender : m.sender
    let user = conn.getName(who)
    let self = conn.getName(m.sender)
    let porcentaje = Math.floor(Math.random() * 101)

    const BOX_TOP = `╭─「 😈 *JODA* 」`
    const BOX_MID = `│`
    const BOX_BOT = `╰─────────────────`

    switch(command) {
        case 'puto':
        case 'puta':
            await conn.reply(m.chat, `${BOX_TOP}
${BOX_MID} 🔥 *${user.toUpperCase()} ES ${command.toUpperCase()}* 🔥
${BOX_MID}
${BOX_MID} Nivel de ${command}: ${porcentaje}%
${BOX_MID} Certificado oficial del grupo 😂
${BOX_BOT}`, m)
            break

        case 'manco':
        case 'manca':
            await conn.reply(m.chat, `${BOX_TOP}
${BOX_MID} 🎮 *${user}*
${BOX_MID}
${BOX_MID} Nivel de ${command}: ${porcentaje}%
${BOX_MID} Ni en Free Fire le ganas a un bot
${BOX_MID} GG EZ
${BOX_BOT}`, m)
            break

        case 'rata':
            await conn.reply(m.chat, `${BOX_TOP}
${BOX_MID} 🐀 *RATA DETECTADA* 🐀
${BOX_MID}
${BOX_MID} Nombre: ${user}
${BOX_MID} Nivel de rata: ${porcentaje}%
${BOX_MID} Se roba hasta el wifi del vecino
${BOX_BOT}`, m)
            break

        case 'chipi':
            await conn.reply(m.chat, `${BOX_TOP}
${BOX_MID} 👶 *${user} ES CHIPI* 👶
${BOX_MID}
${BOX_MID} Nivel de chipi: ${porcentaje}%
${BOX_MID} Aún toma leche y usa pañal
${BOX_BOT}`, m)
            break

        case 'pajero':
            await conn.reply(m.chat, `${BOX_TOP}
${BOX_MID} 🖐️ *${user.toUpperCase()} ES PAJERO* 🖐️
${BOX_MID}
${BOX_MID} Nivel de pajero: ${porcentaje}%
${BOX_MID} Vive con la mano ocupada
${BOX_BOT}`, m)
            break

        case 'sintetas':
            await conn.reply(m.chat, `${BOX_TOP}
${BOX_MID} 📉 *${user}*
${BOX_MID}
${BOX_MID} Estado: SIN TETAS
${BOX_MID} Tabla de planchar certificada
${BOX_MID} F en el chat
${BOX_BOT}`, m)
            break

        case 'sinpoto':
            await conn.reply(m.chat, `${BOX_TOP}
${BOX_MID} 🍑 *${user}*
${BOX_MID}
${BOX_MID} Estado: SIN POTO
${BOX_MID} Puro hueso y dolor
${BOX_MID} Sientate en un alfiler
${BOX_BOT}`, m)
            break

        case 'sinpito':
            await conn.reply(m.chat, `${BOX_TOP}
${BOX_MID} 🌭 *${user}*
${BOX_MID}
${BOX_MID} Estado: SIN PITO
${BOX_MID} Microondas certificado
${BOX_MID} Ni para calentar sirve
${BOX_BOT}`, m)
            break

        case 'pitochico':
            await conn.reply(m.chat, `${BOX_TOP}
${BOX_MID} 📏 *MEDIDOR OFICIAL* 📏
${BOX_MID}
${BOX_MID} ${user}: ${porcentaje} cm
${BOX_MID} ${porcentaje < 10? 'Ala bro F' : porcentaje < 15? 'Promedio pe' : 'Grande pe mano'}
${BOX_BOT}`, m)
            break

        case 'feo':
        case 'fea':
            await conn.reply(m.chat, `${BOX_TOP}
${BOX_MID} 👹 *${user.toUpperCase()} ES ${command.toUpperCase()}* 👹
${BOX_MID}
${BOX_MID} Nivel de ${command}: ${porcentaje}%
${BOX_MID} Asusta hasta a su sombra
${BOX_BOT}`, m)
            break

        case 'rica':
            await conn.reply(m.chat, `${BOX_TOP}
${BOX_MID} 🍑 *${user.toUpperCase()} ESTA RICA* 🍑
${BOX_MID}
${BOX_MID} Nivel de rica: ${porcentaje}%
${BOX_MID} Mamasita nivel diosa 😍
${BOX_BOT}`, m)
            break

        case 'horrible':
            await conn.reply(m.chat, `${BOX_TOP}
${BOX_MID} ☢️ *${user.toUpperCase()} ES HORRIBLE* ☢️
${BOX_MID}
${BOX_MID} Nivel: ${porcentaje}%
${BOX_MID} Contaminación visual detectada
${BOX_BOT}`, m)
            break

        case 'mostro':
        case 'mostra':
            await conn.reply(m.chat, `${BOX_TOP}
${BOX_MID} 🐒 *${user.toUpperCase()} ES ${command.toUpperCase()}* 🐒
${BOX_MID}
${BOX_MID} Nivel de ${command}: ${porcentaje}%
${BOX_MID} Parecido al mono de tu foto
${BOX_BOT}`, m)
            break

        case 'soylindo':
            await conn.reply(m.chat, `${BOX_TOP}
${BOX_MID} ✨ *${user.toUpperCase()} ES LINDO* ✨
${BOX_MID}
${BOX_MID} Nivel de lindo: ${porcentaje}%
${BOX_MID} Se cree modelo de instagram
${BOX_BOT}`, m)
            break

        case 'soylinda':
            await conn.reply(m.chat, `${BOX_TOP}
${BOX_MID} 👑 *${user.toUpperCase()} ES LINDA* 👑
${BOX_MID}
${BOX_MID} Nivel de linda: ${porcentaje}%
${BOX_MID} Reina del grupo
${BOX_BOT}`, m)
            break
    }
}

handler.help = ['puto', 'puta', 'manco', 'manca', 'rata', 'chipi', 'pajero', 'sintetas', 'sinpoto', 'sinpito', 'pitochico', 'feo', 'fea', 'rica', 'horrible', 'mostro', 'mostra', 'soylindo', 'soylinda']
handler.tags = ['fun']
handler.command = /^(puto|puta|manco|manca|rata|chipi|pajero|sintetas|sinpoto|sinpito|pitochico|feo|fea|rica|horrible|mostro|mostra|soylindo|soylinda)$/i
handler.group = true
export default handler