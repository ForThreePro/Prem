let handler = async (m, { conn, command, usedPrefix, isAdmin }) => {

    global.db.data.sorteos = global.db.data.sorteos || {}
    let sorteos = global.db.data.sorteos
    let chatId = m.chat

    const dias = ['lunes','martes','miercoles','jueves','viernes','sabado']
    const emojis = {lunes:'🌙', martes:'☀️', miercoles:'⚡', jueves:'💎', viernes:'🔥', sabado:'👑'}

    let dia = command.replace('set','').replace('borrar','').toLowerCase()
    sorteos[chatId] = sorteos[chatId] || {}

    const limpiar = (jid) => jid.split('@')[0].replace(/[^0-9]/g, '')

    // ===== 1. ASIGNAR.setlunes @user =====
    if (command.startsWith('set')) {
        if (!isAdmin) return m.reply(`❄️ *ACCESO DENEGADO* ❄️ Solo admins`)
        if (!dias.includes(dia)) return m.reply(`❄️ *DÍA INVÁLIDO*`)

        let mentioned = m.mentionedJid
        if (mentioned.length === 0) return m.reply(`❄️ *FALTA MENCIONAR*\n*Ejemplo:* ${usedPrefix}set${dia} @user1 @user2`)

        sorteos[chatId][dia] = [...new Set(mentioned)] // Guardamos el JID completo, no solo el número

        let list = sorteos[chatId][dia].map((u, i) => `┃ ${i+1} │ @${u.split('@')[0]}`).join('\n')
        let msg = `╔══════════════╗
║ ❄️ CRISTAL SORTEOS ❄️ ║
╚══════════════╝

◆ DIA: ${emojis[dia]} ${dia.toUpperCase()} ${emojis[dia]}
◆ ESTADO: ASIGNADO ✓

┌── PARTICIPANTES ──┐
${list}
└───────────────────┘

📋 INSTRUCCIÓN:
Realizar sorteo + Reaccionar + Compartir

Usa *${usedPrefix}${dia}* para ver el recordatorio`
        await conn.reply(m.chat, msg, m, { mentions: mentioned })
        return
    }

    // ===== 2. BORRAR.borrarlunes =====
    if (command.startsWith('borrar')) {
        if (!isAdmin) return m.reply(`❄️ *ACCESO DENEGADO* ❄️ Solo admins`)
        delete sorteos[chatId][dia]
        return m.reply(`✅ *ELIMINADO*\nSe borró la asignación de *${dia.toUpperCase()}*`)
    }

    // ===== 3. RECORDATORIO.lunes =====
    if (dias.includes(command.toLowerCase())) {
        if (!isAdmin) return m.reply(`❄️ *ACCESO DENEGADO* ❄️ Solo admins`)
        let asignados = sorteos[chatId][command.toLowerCase()]
        if (!asignados ||!asignados.length) return m.reply(`❄️ *SIN ASIGNACIÓN*\nUsa: ${usedPrefix}set${command} @user`)

        let list = asignados.map((u, i) => `┃ ${i+1} │ @${u.split('@')[0]}`).join('\n')

        let msg = `╔══════════════╗
║ ❄️ RECORDATORIO ❄️ ║
╚══════════════╝

◆ DIA: ${emojis[command]} ${command.toUpperCase()} ${emojis[command]}
◆ ESTADO: PENDIENTE ⚠️

┌── PARTICIPANTES ──┐
${list}
└───────────────────┘

📋 INSTRUCCIÓN:
Realizar sorteo + Reaccionar + Compartir

❄️ Cumplan su turno`
        await conn.reply(m.chat, msg, m, { mentions: asignados }) // <-- Aquí ya pasamos el JID completo
        return
    }

    // ===== 4. VER TODO.ver =====
    if (command === 'ver') {
        let diasConData = dias.filter(d => Array.isArray(sorteos[chatId][d]) && sorteos[chatId][d].length > 0)
        if (diasConData.length === 0) return m.reply(`❄️ *CRONOGRAMA VACÍO*`)

        let txt = `╔══════════════════════╗
║ ❄️ CRONOGRAMA SEMANAL ❄️ ║
╚══════════════╝\n\n`

        let todos = []
        for(let d of dias){
            if(!Array.isArray(sorteos[chatId][d])) continue
            txt += `◆ ${emojis[d]} ${d.toUpperCase()}\n`
            sorteos[chatId][d].forEach((u, i) => {
                txt += `┃ ${i+1} │ @${u.split('@')[0]}\n`
                todos.push(u)
            })
            txt += `│\n`
        }
        txt += `╚══════════════╝`
        return conn.reply(m.chat, txt, m, { mentions: [...new Set(todos)] })
    }
}

handler.help = ['setlunes @tag','lunes','borrarlunes','ver']
handler.tags = ['sorteos']
handler.command = /^(setlunes|setmartes|setmiercoles|setjueves|setviernes|setsabado|borrarlunes|borrarmartes|borrarmiercoles|borrarjueves|borrarviernes|borrarsabado|lunes|martes|miercoles|jueves|viernes|sabado|ver)$/i
handler.group = true
handler.admin = true // solo admins pueden usarlo
export default handler