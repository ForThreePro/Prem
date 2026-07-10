let handler = async (m, { conn, args, usedPrefix, command }) => {
    let isClose = {
        'abrir': 'not_announcement',
        'open': 'not_announcement',
        'cerrar': 'announcement',
        'close': 'announcement',
    }[(args[0] || '').toLowerCase()]

    if (isClose === undefined) {
        await conn.reply(m.chat, `⚡ *RAYO PREM* | CONTROL DE GRUPO

╭─〔 *Team Nightwish* 〕─╮
│ 📌 *Uso:* ${usedPrefix}${command} abrir/cerrar
│ ⚡ *Ejemplo:* ${usedPrefix}${command} cerrar
╰──────────────────────╯

> "El trueno decide quien habla"`, m)
        return
    }

    await conn.groupSettingUpdate(m.chat, isClose)

    let estado = isClose === 'announcement'? 'CERRADO 🔒' : 'ABIERTO 🔓'
    let desc = isClose === 'announcement'? 'Solo admins pueden enviar mensajes' : 'Todos pueden enviar mensajes'
    let emoji = isClose === 'announcement'? '⛈️' : '⚡'

    await conn.reply(m.chat, `${emoji} *RAYO PREM* | GRUPO ${estado} ${emoji}
╭─〔 *Team Nightwish* 〕─╮
│ 📊 *Estado:* ${estado}
│ 📝 *Nota:* ${desc}
│ 👑 *Ejecutado por:* @${m.sender.split('@')[0]}
╰──────────────────────╯

> "El trueno selló el grupo"`, m, {
        mentions: [m.sender]
    })
}

handler.help = ['grupo abrir', 'grupo cerrar']
handler.tags = ['grupos']
handler.command = ['group', 'grupo']
handler.admin = true
handler.botAdmin = true

export default handler