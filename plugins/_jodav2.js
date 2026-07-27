let handler = async (m, { conn, command, args }) => {
    let who = m.mentionedJid[0]? m.mentionedJid[0] : m.quoted? m.quoted.sender : false
    if (!who) who = m.sender
    let user = conn.getName(who)
    let porcentaje = Math.floor(Math.random() * 101)

    const BOX_TOP = `╭─「 😈 *JODA* 」`
    const BOX_MID = `│`
    const BOX_BOT = `╰─────────────────`

    let txt = ''
    let mention = [who]

    switch(command) {
        case 'puto':
        case 'puta':
            txt = `${BOX_TOP}
${BOX_MID} 🔥 *@${who.split('@')[0]} ES ${command.toUpperCase()}* 🔥
${BOX_MID}
${BOX_MID} Nivel de ${command}: ${porcentaje}%
${BOX_MID} Certificado oficial del grupo 😂
${BOX_BOT}`
            break

        case 'manco':
        case 'manca':
            txt = `${BOX_TOP}
${BOX_MID} 🎮 *@${who.split('@')[0]}*
${BOX_MID}
${BOX_MID} Nivel de ${command}: ${porcentaje}%
${BOX_MID} Ni en Free Fire le ganas a un bot
${BOX_MID} GG EZ
${BOX_BOT}`
            break

        case 'rata':
            txt = `${BOX_TOP}
${BOX_MID} 🐀 *RATA DETECTADA* 🐀
${BOX_MID}
${BOX_MID} Nombre: @${who.split('@')[0]}
${BOX_MID} Nivel de rata: ${porcentaje}%
${BOX_MID} Se roba hasta el wifi del vecino
${BOX_BOT}`
            break

        case 'chipi':
            txt = `${BOX_TOP}
${BOX_MID} 👶 *@${who.split('@')[0]} ES CHIPI* 👶
${BOX_MID}
${BOX_MID} Nivel de chipi: ${porcentaje}%
${BOX_MID} Aún toma leche y usa pañal
${BOX_BOT}`
            break

        case 'sintetas':
            txt = `${BOX_TOP}
${BOX_MID} 📉 *@${who.split('@')[0]}*
${BOX_MID}
${BOX_MID} Estado: SIN TETAS
${BOX_MID} Tabla de planchar certificada
${BOX_MID} F en el chat
${BOX_BOT}`
            break

        case 'sinpoto':
            txt = `${BOX_TOP}
${BOX_MID} 🍑 *@${who.split('@')[0]}*
${BOX_MID}
${BOX_MID} Estado: SIN POTO
${BOX_MID} Puro hueso y dolor
${BOX_MID} Sientate en un alfiler
${BOX_BOT}`
            break

        case 'sinpito':
            txt = `${BOX_TOP}
${BOX_MID} 🌭 *@${who.split('@')[0]}*
${BOX_MID}
${BOX_MID} Estado: SIN PITO
${BOX_MID} Microondas certificado
${BOX_MID} Ni para calentar sirve
${BOX_BOT}`
            break

        case 'pajero':
            txt = `${BOX_TOP}
${BOX_MID} 🖐️ *@${who.split('@')[0]} ES PAJERO* 🖐️
${BOX_MID}
${BOX_MID} Nivel de pajero: ${porcentaje}%
${BOX_MID} Vive con la mano ocupada
${BOX_BOT}`
            break

        case 'pitochico':
            txt = `${BOX_TOP}
${BOX_MID} 📏 *MEDIDOR OFICIAL* 📏
${BOX_MID}
${BOX_MID} @${who.split('@')[0]}: ${porcentaje} cm
${BOX_MID} ${porcentaje < 10? 'Ala bro F' : porcentaje < 15? 'Promedio pe' : 'Grande pe mano'}
${BOX_BOT}`
            break

        case 'feo':
        case 'fea':
            txt = `${BOX_TOP}
${BOX_MID} 👹 *@${who.split('@')[0]} ES ${command.toUpperCase()}* 👹
${BOX_MID}
${BOX_MID} Nivel de ${command}: ${porcentaje}%
${BOX_MID} Asusta hasta a su sombra
${BOX_BOT}`
            break

        case 'rica':
            txt = `${BOX_TOP}
${BOX_MID} 🍑 *@${who.split('@')[0]} ESTA RICA* 🍑
${BOX_MID}
${BOX_MID} Nivel de rica: ${porcentaje}%
${BOX_MID} Mamasita nivel diosa 😍
${BOX_BOT}`
            break

        case 'horrible':
            txt = `${BOX_TOP}
${BOX_MID} ☢️ *@${who.split('@')[0]} ES HORRIBLE* ☢️
${BOX_MID}
${BOX_MID} Nivel: ${porcentaje}%
${BOX_MID} Contaminación visual detectada
${BOX_BOT}`
            break

        case 'mostro':
        case 'mostra':
            txt = `${BOX_TOP}
${BOX_MID} 🐒 *@${who.split('@')[0]} ES ${command.toUpperCase()}* 🐒
${BOX_MID}
${BOX_MID} Nivel de ${command}: ${porcentaje}%
${BOX_MID} Parecido al mono de tu foto
${BOX_BOT}`
            break

        case 'soylindo':
            txt = `${BOX_TOP}
${BOX_MID} ✨ *@${who.split('@')[0]} ES LINDO* ✨
${BOX_MID}
${BOX_MID} Nivel de lindo: ${porcentaje}%
${BOX_MID} Se cree modelo de instagram
${BOX_BOT}`
            break

        case 'soylinda':
            txt = `${BOX_TOP}
${BOX_MID} 👑 *@${who.split('@')[0]} ES LINDA* 👑
${BOX_MID}
${BOX_MID} Nivel de linda: ${porcentaje}%
${BOX_MID} Reina del grupo
${BOX_BOT}`
            break

        default:
            return
    }

    await conn.reply(m.chat, txt, m, { mentions: mention })
}

handler.help = ['puto', 'puta', 'manco', 'manca', 'rata', 'chipi', 'pajero', 'sintetas', 'sinpoto', 'sinpito', 'pitochico', 'feo', 'fea', 'rica', 'horrible', 'mostro', 'mostra', 'soylindo', 'soylinda']
handler.tags = ['fun']
handler.command = /^(puto|puta|manco|manca|rata|chipi|pajero|sintetas|sinpoto|sinpito|pitochico|feo|fea|rica|horrible|mostro|mostra|soylindo|soylinda)$/i
handler.group = true
export default handler