let handler = async (m, { conn, participants, usedPrefix, command }) => {
    let mentionedJid = m.mentionedJid && m.mentionedJid[0]? m.mentionedJid[0] : m.quoted? m.quoted.sender : null

    if (!mentionedJid) return conn.reply(m.chat, `⚡ *RAYO PREM* | EXPULSAR USUARIO

╭─〔 *Team Nightwish* 〕─╮
│ 📌 *Uso:* ${usedPrefix}${command} @usuario
│ ⚡ *Ejemplo:* ${usedPrefix}${command} @123456789
╰──────────────────────╯

> "Menciona o responde al objetivo"`, m)

    try {
        let groupMetadata = await conn.groupMetadata(m.chat)
        let ownerGroup = groupMetadata.owner || m.chat.split`-`[0] + '@s.whatsapp.net'
        let ownerBot = global.owner[0][0] + '@s.whatsapp.net'
        let nameUser = await conn.getName(mentionedJid)

        if (mentionedJid === conn.user.jid) return conn.reply(m.chat, `🌙 *Rayo Prem* | No puedo auto-destruirme.`, m)
        if (mentionedJid === ownerGroup) return conn.reply(m.chat, `⛈️ *Rayo Prem* | No puedo expulsar al dueño del grupo.`, m)
        if (mentionedJid === ownerBot) return conn.reply(m.chat, `⛈️ *Rayo Prem* | No puedo expulsar a mi creador.`, m)

        await conn.groupParticipantsUpdate(m.chat, [mentionedJid], 'remove')

        let msgKick = `⛈️ *RAYO PREM* | EXPULSIÓN ⛈️
╭─〔 *Team Nightwish* 〕─╮
│ 🗡️ *Expulsado:* ${nameUser}
│ 👑 *Ejecutado por:* @${m.sender.split('@')[0]}
│ ⚡ *Estado:* Eliminado del grupo
╰──────────────────────╯

> "El trueno lo sacó del grupo"`

        conn.reply(m.chat, msgKick, m, { mentions: [mentionedJid, m.sender] })

    } catch (e) {
        console.error(e)
        conn.reply(m.chat, `🌙 *Rayo Prem* | Error al expulsar al usuario.\n> *Motivo:* ${e.message}`, m)
    }
}

handler.help = ['kick @user']
handler.tags = ['grupos']
handler.command = ['kick', 'echar', 'hechar', 'sacar', 'ban']
handler.admin = true
handler.group = true
handler.botAdmin = true

export default handler