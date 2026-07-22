let handler = async (m, { conn, args, usedPrefix, command }) => {
    let who = m.mentionedJid[0]? m.mentionedJid[0] : m.quoted? m.quoted.sender : null
    if (!who) return m.reply(`💍 Etiqueta a alguien para casarte.\nEjemplo: ${usedPrefix}marry @usuario`)
    if (who === m.sender) return m.reply('No te puedes casar contigo mismo xd')

    // Aseguramos que ambos existan en la DB
    if (!global.db.data.users[m.sender]) global.db.data.users[m.sender] = { pareja: null }
    if (!global.db.data.users[who]) global.db.data.users[who] = { pareja: null }

    let user = global.db.data.users[m.sender]
    let target = global.db.data.users[who]

    // Verificaciones
    if (user.pareja) return m.reply(`Ya tienes pareja: @${user.pareja.split('@')[0]}`, null, { mentions: [user.pareja] })
    if (target.pareja) return m.reply(`@${who.split('@')[0]} ya tiene pareja`, null, { mentions: [who] })

    // Casarlos
    user.pareja = who
    target.pareja = m.sender

    let nombre1 = conn.getName(m.sender)
    let nombre2 = conn.getName(who)

    conn.reply(m.chat, `💒 ¡Felicidades!\n${nombre1} y ${nombre2} ahora están casados 💖`, m, { mentions: [m.sender, who] })
}

handler.help = ['marry @usuario']
handler.tags = ['fun']
handler.command = /^(marry|casar|casarse)$/i

export default handler