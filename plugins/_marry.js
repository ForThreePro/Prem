let handler = async (m, { conn, args, usedPrefix, command }) => {
    let who = m.mentionedJid[0]? m.mentionedJid[0] : m.quoted? m.quoted.sender : null
    if (!who) return m.reply(`💍 Etiqueta a alguien para casarte.\nEjemplo: ${usedPrefix}marry @usuario`)
    if (who === m.sender) return m.reply('No te puedes casar contigo mismo xd')

    // Aseguramos que ambos existan en la DB
    global.db.data.users[m.sender] = global.db.data.users[m.sender] || { pareja: null }
    global.db.data.users[who] = global.db.data.users[who] || { pareja: null }

    let user = global.db.data.users[m.sender]
    let target = global.db.data.users[who]

    // ===== CASAR =====
    if (command == 'marry' || command == 'casar' || command == 'casarse') {
        if (user.pareja) return m.reply(`💍 Ya tienes pareja: @${user.pareja.split('@')[0]}`, null, { mentions: [user.pareja] })
        if (target.pareja) return m.reply(`💔 @${who.split('@')[0]} ya tiene pareja`, null, { mentions: [who] })

        // Casarlos
        user.pareja = who
        target.pareja = m.sender

        // FIX: Si getName falla usamos el nombre del pushName o el numero
        let nombre1 = m.pushName || m.sender.split('@')[0]
        let nombre2 = (await conn.onWhatsApp(who))[0]?.notify || who.split('@')[0]

        return conn.sendMessage(m.chat, {
            text: `┏━━━━━━━━━━━━━━━┓
┃ 💒 *¡FELICIDADES!* 💒 ┃
┗━━━━━━━━━━━┛

@${m.sender.split('@')[0]} y @${who.split('@')[0]}
*AHORA ESTÁN CASADOS* 💖

📅 ${new Date().toLocaleDateString('es-PE')}`,
            mentions: [m.sender, who] // ESTO ES LO QUE HACE QUE MENCIONE
        }, { quoted: m })
    }

    // ===== DIVORCIO =====
    if (command == 'divorcio' || command == 'divorce') {
        if (!user.pareja) return m.reply(`💔 No tienes pareja`)
        let pareja = user.pareja
        global.db.data.users[m.sender].pareja = null
        global.db.data.users[pareja].pareja = null

        return conn.sendMessage(m.chat, {
            text: `┏━━━━━━━━━━━━━━━┓
┃ 💔 *DIVORCIO* 💔 ┃
┗━━━━━━━━━━━┛

@${m.sender.split('@')[0]} y @${pareja.split('@')[0]}
*YA NO ESTÁN JUNTOS* 😭`,
            mentions: [m.sender, pareja]
        }, { quoted: m })
    }

    // ===== VER PAREJA =====
    if (command == 'pareja') {
        if (!user.pareja) return m.reply(`💔 Estás soltero\nUsa: ${usedPrefix}marry @usuario`)
        return conn.sendMessage(m.chat, {
            text: `💍 *MI PAREJA*\n\n👤 @${user.pareja.split('@')[0]}\n*Estado:* Casados 💑`,
            mentions: [user.pareja]
        }, { quoted: m })
    }
}

handler.help = ['marry @usuario', 'divorcio', 'pareja']
handler.tags = ['fun']
handler.command = /^(marry|casar|casarse|divorcio|divorce|pareja)$/i
handler.group = true

export default handler