let mutedUsers = new Set();

let handler = async (m, { conn, command, participants }) => {
    let mentionedJid = m.mentionedJid[0]? m.mentionedJid[0] : m.quoted? m.quoted.sender : false;
    if (!mentionedJid) return m.reply(`╭─❒ *『 𝗖𝗬𝗕𝗘𝗥 𝗕𝗢𝗧 』* ❒
│ 🔇 *SISTEMA DE MUTE*
│
│ ⚡ *Etiqueta a una persona o responde a un mensaje*
╰─────────────────❒`);

    let isUserAdmin = participants.find(p => p.id === mentionedJid)?.admin;
    if (isUserAdmin) return m.reply(`╭─❒ *『 𝗖𝗬𝗕𝗘𝗥 𝗕𝗢𝗧 』* ❒
│ ❌ *ERROR DE SISTEMA*
│
│ ⚡ *No puedes mutear a un administrador*
╰─────────────────❒`);
    if (mentionedJid === conn.user.jid) return m.reply(`╭─❒ *『 𝗖𝗬𝗕𝗘𝗥 𝗕𝗢𝗧 』* ❒
│ ❌ *ERROR DE SISTEMA*
│
│ ⚡ *No puedo mutearme a mi mismo*
╰─────────────────❒`);

    if (command === "mute") {
        mutedUsers.add(mentionedJid);
        conn.reply(m.chat, `╭─❒ *『 𝗖𝗬𝗕𝗘𝗥 𝗕𝗢𝗧 』* ❒
│ 🔇 *USUARIO SILENCIADO*
│
│ ⚡ *@${mentionedJid.split('@')[0]}*
│ 💻 *Sus mensajes serán eliminados*
╰─────────────────❒`, m, { mentions: [mentionedJid] });
    } else if (command === "unmute") {
        mutedUsers.delete(mentionedJid);
        conn.reply(m.chat, `╭─❒ *『 𝗖𝗬𝗕𝗘𝗥 𝗕𝗢𝗧 』* ❒
│ 🔊 *USUARIO DESMUTEADO*
│
│ ⚡ *@${mentionedJid.split('@')[0]}*
│ 💻 *Ya puede hablar de nuevo*
╰─────────────────❒`, m, { mentions: [mentionedJid] });
    }
};

handler.before = async (m, { conn, isAdmin }) => {
    // Si el remitente del mensaje está en la lista de muteados, eliminamos el mensaje
    if (mutedUsers.has(m.sender)) {
        try {
            await conn.sendMessage(m.chat, { delete: m.key });
        } catch (e) {
            console.error(e);
        }
    }
};

handler.help = ['mute', 'unmute'].map(v => v + ' @user');
handler.tags = ['grupos'];
handler.command = /^(mute|unmute)$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;