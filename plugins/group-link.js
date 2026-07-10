let handler = async (m, { conn }) => {
    try {
        let link = await conn.groupInviteCode(m.chat)
        let groupMeta = await conn.groupMetadata(m.chat)
        let groupName = groupMeta.subject
        let total = groupMeta.participants.length

        let txt = `⚡ *RAYO PREM* | INVITACIÓN ⚡
╭─〔 *Team Nightwish* 〕─╮
│ 👑 *Grupo:* ${groupName}
│ 👥 *Miembros:* ${total}
│ 🔗 *Link:* https://chat.whatsapp.com/${link}
╰──────────────────────╯

> "Comparte el trueno con cuidado"`

        await conn.sendMessage(m.chat, {
            text: txt,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                externalAdReply: {
                    title: `Invitación: ${groupName}`,
                    body: `Team Nightwish | ${total} Miembros`,
                    thumbnail: await conn.profilePictureUrl(m.chat, 'image').catch(() => 'https://files.evogb.win/91Vvmc.jpg'),
                    sourceUrl: `https://chat.whatsapp.com/${link}`
                }
            }
        }, { quoted: m })

    } catch {
        m.reply(`🌙 *Rayo Prem* | No pude obtener el link. ¿Soy admin?`)
    }
}

handler.help = ['link']
handler.tags = ['grupos']
handler.command = ['link', 'linkgroup', 'grupolink']
handler.group = true

export default handler