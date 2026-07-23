let handler = async (m, { conn, command, args, usedPrefix, isAdmin }) => {

    global.db.data.sorteos = global.db.data.sorteos || {}
    let sorteos = global.db.data.sorteos
    let chatId = m.chat

    const dias = ['lunes','martes','miercoles','jueves','viernes','sabado']
    const emojis = {lunes:'🌙', martes:'☀️', miercoles:'⚡', jueves:'💎', viernes:'🔥', sabado:'👑'}

    let dia = command.replace('set','').replace('borrar','').toLowerCase()
    sorteos[chatId] = sorteos[chatId] || {}

    const num = (jid) => jid.split('@')[0] // saca solo el numero para evitar LID

    // ===== 1. ASIGNAR:.setjueves @user @user2 =====
    if (command.startsWith('set')) {
        if (!isAdmin) return m.reply(`❄️ *ACCESO DENEGADO* ❄️`)
        if (!dias.includes(dia)) return m.reply(`❄️ *DÍA INVÁLIDO*\nUsa: lunes a sábado`)

        let mentioned = m.mentionedJid
        if (mentioned.length === 0) return m.reply(`❄️ *FALTA MENCIONAR*\n*Ejemplo:* ${usedPrefix}set${dia} @user1 @user2`)

        // GUARDAMOS SOLO NUMEROS
        sorteos[chatId][dia] = [...new Set(mentioned.map(j => num(j)))]

        let list = sorteos[chatId][dia].map((u, i) => `┃ ${i+1} │ @${u}`).join('\n')
        let msg = `╔══════════════════════╗
║ ❄️ CRISTAL SORTEOS ❄️ ║
╚══════════════════════╝

◆ DIA: ${emojis[dia]} ${dia.toUpperCase()} ${emojis[dia]}
◆ ESTADO: ASIGNADO ✓

┌── PARTICIPANTES ──┐
${list}
└───────────────────┘

📋 INSTRUCCIÓN:
Realizar sorteo + Reaccionar + Compartir

Usa.${dia} para ver el recordatorio`
        await conn.reply(m.chat, msg, m, { mentions: mentioned })
        return
    }

    // ===== 2. BORRAR:.borrarjueves =====
    if (command.startsWith('borrar')) {
        if (!isAdmin) return m.reply(`❄️ *ACCESO DENEGADO* ❄️`)
        if (!sorteos[chatId][dia]) return m.reply(`❄️ *NO HAY NADA QUE BORRAR*`)
        delete sorteos[chatId][dia]
        return m.reply(`✅ *ELIMINADO*\nSe borró la asignación de *${dia.toUpperCase()}*`)
    }

    // ===== 3. RECORDATORIO:.jueves =====
    if (dias.includes(command.toLowerCase())) {
        if (!isAdmin) return m.reply(`❄️ *ACCESO DENEGADO* ❄️`)
        let asignados = sorteos[chatId][command.toLowerCase()]
        if (!asignados) return m.reply(`❄️ *SIN ASIGNACIÓN*\nUsa: ${usedPrefix}set${command} @user`)

        let list = asignados.map((u, i) => `┃ ${i+1} │ @${u}`).join('\n')
        let menciones = asignados.map(n => n + '@s.whatsapp.net')

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
        await conn.reply(m.chat, msg, m, { mentions: menciones })
        return
    }

    // ===== 4. VER TODO:.ver =====
    if (command === 'ver') {
        if (Object.keys(sorteos[chatId]).length === 0) return m.reply(`❄️ *CRONOGRAMA VACÍO*`)

        let txt = `╔══════════════╗
║ ❄️ CRONOGRAMA SEMANAL ❄️ ║
╚══════════════════════╝\n\n`

        for(let d of dias){
            if(!sorteos[chatId][d]) continue
            txt += `◆ ${emojis[d]} ${d.toUpperCase()}\n`
            sorteos[chatId][d].forEach((u, i) => { txt += `┃ ${i+1} │ @${u}\n` })
            txt += `│\n`
        }
        txt += `╚══════════════════════╝`
        let todos = Object.values(sorteos[chatId]).flat().map(n => n + '@s.whatsapp.net')
        return conn.reply(m.chat, txt, m, { mentions: todos })
    }
}

handler.help = ['setjueves @user','jueves','borrarjueves','ver']
handler.tags = ['sorteos']
handler.command = /^(setlunes|setmartes|setmiercoles|setjueves|setviernes|setsabado|borrarlunes|borrarmartes|borrarmiercoles|borrarjueves|borrarviernes|borrarsabado|lunes|martes|miercoles|jueves|viernes|sabado|ver)$/i
handler.group = true
export default handler