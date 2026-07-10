let handler = async (m, { conn }) => {
    try {
        await conn.groupParticipantsUpdate(m.chat, [conn.user.jid], 'promote')
        m.reply('⚡ *RAYO PREM* ➔ Admin asignado. El trueno toma el control.') // Cambiado
    } catch (e) {
        m.reply('⚡ *RAYO PREM ERROR* ➔ No pude asignarme admin. Dame permisos primero.') // Cambiado
    }
}

handler.help = ['autoadmin']
handler.tags = ['owner']
handler.command = ['autoadmin']
handler.rowner = true

export default handler