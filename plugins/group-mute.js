let mutedUsers = new Set();

let handler = async (m, { conn, command, participants }) => {
    let mentionedJid = m.mentionedJid[0]? m.mentionedJid[0] : m.quoted? m.quoted.sender : false;
    if (!mentionedJid) return m.reply(`⚡ *RAYO PREM* | SILENCIAR USUARIO

╭─〔 *Team Nightwish* 〕─╮
│ 📌 *Uso:* ${command} @usuario
│ ⚡ *Ejemplo:* ${command} @123456789
╰──────────────────────╯

> "Menciona o responde al objetivo"`, m)

    let nameUser = await conn.getName(mentionedJid)
    let isUserAdmin = participants.find(p => p.id === mentionedJid)?.admin;
    if (isUserAdmin) return m.reply(`⛈️ *Rayo Prem* | No puedo silenciar a un admin.`, m)
    if (mentionedJid === conn.user.jid) return m.reply(`🌙 *Rayo Prem* | No puedo silenciarme a mí mismo.`, m)

    if (command === "mute") {
        if (mutedUsers.has(mentionedJid)) return m.reply(`⚡ *Rayo Prem* | ${nameUser} ya está silenciado.`, m)
        mutedUsers.add(mentionedJid);
        conn.reply(m.chat, `⛈️ *RAYO PREM* | SILENCIADO ⛈️
╭─〔 *Team Nightwish* 〕─╮
│ 🔇 *Usuario:* ${nameUser}
│ 👑 *Ejecutado por:* @${m.sender.split('@')[0]}
│ ⚡ *Estado:* No puede enviar mensajes
╰──────────────────────╯

> "El trueno le quitó la voz"`, m, { mentions: [mentionedJid, m.sender] });
    } else if (command === "unmute") {
        if (!mutedUsers.has(mentionedJid)) return m.reply(`⚡ *Rayo Prem* | ${nameUser} no está silenciado.`, m)
        mutedUsers.delete(mentionedJid);
        conn.reply(m.chat, `⚡ *RAYO PREM* | DESILENCIADO ⚡
╭─〔 *Team Nightwish* 〕─╮
│ 🔊 *Usuario:* ${nameUser}
│ 👑 *Ejecutado por:* @${m.sender.split('@')[0]}
│ 🌀 *Estado:* Puede hablar de nuevo
╰──────────────────────╯

> "El trueno le devolvió la voz"`, m, { mentions: [mentionedJid, m.sender] });
    }
};

handler.before = async (m, { conn, isAdmin }) => {
    // Si el remitente del mensaje está en la lista de muteados, eliminamos el mensaje
    if (mutedUsers.has(m.sender) &&!isAdmin) {
        try {
            await conn.sendMessage(m.chat, { delete: m.key });
            await conn.sendMessage(m.chat, {
                text: `⛈️ *Rayo Prem* | @${m.sender.split('@')[0]} está silenciado y no puede hablar.`,
                mentions: [m.sender]
            })
        } catch (e) {
            console.error(e);
        }
    }
};

handler.help = ['mute @user', 'unmute @user']
handler.tags = ['grupos']
handler.command = /^(mute|unmute|silenciar|desmutear)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler