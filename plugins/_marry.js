let handler = async (m, { conn, usedPrefix, command }) => {
    let who = m.mentionedJid[0]? m.mentionedJid[0] : m.quoted? m.quoted.sender : null

    // Asegurar DB
    global.db.data.users[m.sender] = global.db.data.users[m.sender] || { pareja: null }

    // ===== CASARSE =====
    if (command == 'marry' || command == 'casar') {
        if (!who) return m.reply(`💍 *Uso:* ${usedPrefix}marry @usuario\n*Etiqueta a alguien para proponerle*`)
        if (who === m.sender) return m.reply('🙄 *No te puedes casar contigo mismo xd*')

        global.db.data.users[who] = global.db.data.users[who] || { pareja: null }
        let user = global.db.data.users[m.sender]
        let target = global.db.data.users[who]

        if (user.pareja) return m.reply(`💍 *Ya estás casado con @${user.pareja.split('@')[0]}*\n*Usa ${usedPrefix}divorcio primero*`, null, { mentions: [user.pareja] })
        if (target.pareja) return m.reply(`💔 *@${who.split('@')[0]} ya tiene pareja*`, null, { mentions: [who] })

        // Casarlos
        user.pareja = who
        target.pareja = m.sender

        let fecha = new Date().toLocaleDateString('es-PE', { day: '2-digit', month: 'long', year: 'numeric' })

        return conn.sendMessage(m.chat, {
            text: `ᯇ 💒 𝗠𝗔𝗧𝗥𝗜𝗠𝗢𝗡𝗜𝗢 💒 ୧

⤷ ┇ 𝗖𝗘𝗥𝗘𝗠𝗢𝗡𝗜𝗔 𝗖𝗢𝗡𝗖𝗟𝗨𝗜𝗗𝗔 ：✿ 。

꒰ ◞⁺⊹ ．💖 *¡FELICIDADES!* 💖

@${m.sender.split('@')[0]} ❤️ @${who.split('@')[0]}
*AHORA ESTÁN CASADOS*

──愛 *𝗗𝗘𝗧𝗔𝗟𝗘𝗦* ╏ 💍
📅 𝗙𝗲𝗰𝗵𝗮: ${fecha}
💬 "Hasta que el ${usedPrefix}divorcio los separe" 😈

> *Que vivan los novios!!!* 🎉`,
            mentions: [m.sender, who]
        }, { quoted: m })
    }

    // ===== DIVORCIARSE =====
    if (command == 'divorcio' || command == 'divorce') {
        let user = global.db.data.users[m.sender]
        if (!user.pareja) return m.reply(`💔 *No tienes pareja*\n*Usa ${usedPrefix}marry @usuario*`)

        let pareja = user.pareja

        // Divorcio
        user.pareja = null
        global.db.data.users[pareja].pareja = null

        return conn.sendMessage(m.chat, {
            text: `ᯇ 💔 𝗗𝗜𝗩𝗢𝗥𝗖𝗜𝗢 💔 ୧

⤷ ┇ 𝗦𝗘𝗣𝗔𝗥𝗔𝗖𝗜𝗢𝗡 𝗢𝗙𝗜𝗖𝗜𝗔𝗟 ：✿ 。

꒰ ◞⁺⊹ ．😭 *SE ACABÓ EL AMOR* 😭

@${m.sender.split('@')[0]} 💔 @${pareja.split('@')[0]}
*YA NO ESTÁN JUNTOS*

──愛 *𝗠𝗢𝗧𝗜𝗩𝗢* ╏ 📝
*La rutina y el lag*
*División de bienes:* El que se queda con el wifi gana

> *Ahora son libres de nuevo* 🕊️`,
            mentions: [m.sender, pareja]
        }, { quoted: m })
    }
}

handler.help = ['marry @usuario', 'divorcio']
handler.tags = ['fun']
handler.command = /^(marry|casar|divorcio|divorce)$/i
handler.group = true

export default handler