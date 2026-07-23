let handler = async (m, { conn, command, args, usedPrefix, isAdmin }) => {

    global.db.data.sorteos = global.db.data.sorteos || {}
    global.db.data.sorteosEvidencia = global.db.data.sorteosEvidencia || {}
    global.db.data.sorteosLista = global.db.data.sorteosLista || {}
    let sorteos = global.db.data.sorteos
    let evidencia = global.db.data.sorteosEvidencia
    let lista = global.db.data.sorteosLista

    const dias = ['lunes','martes','miercoles','jueves','viernes','sabado']
    const emojis = {lunes:'🌙', martes:'☀️', miercoles:'⚡', jueves:'💎', viernes:'🔥', sabado:'👑'}
    const textoFijo = 'Realiza el sorteo del día. Reacciona y comparte en el grupo'

    let dia = command.replace('set','').replace('borrar','').toLowerCase()

    // ==== HORA PERUANA FIJA ====
    const options = { weekday: 'long', timeZone: 'America/Lima' }
    let hoyRaw = new Intl.DateTimeFormat('es-PE', options).format(new Date()).toLowerCase()
    let hoy = hoyRaw.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    // ==== FIN HORA ====

    let chatId = m.chat

    sorteos[chatId] = sorteos[chatId] || {}
    evidencia[chatId] = evidencia[chatId] || {}
    lista[chatId] = lista[chatId] || {}
    lista[chatId][hoy] = lista[chatId][hoy] || []
    evidencia[chatId][hoy] = evidencia[chatId][hoy] || {}

    // ===== 1. SET ASIGNACIÓN - SOLO ADMIN =====
    if (command.startsWith('set')) {
        if (!isAdmin) return m.reply('❄️ ❌ *SOLO ADMINS* ❌')
        if (!dias.includes(dia)) return m.reply('❄️ ❌ *DÍA INVÁLIDO* ❌\n> Usa: lunes a sábado')
        let mentioned = m.mentionedJid
        if (mentioned.length === 0) return m.reply(`❄️ ❌ *FALTA MENCIONAR* ❌\n> *Ejemplo:* ${usedPrefix}set${dia} @user1 @user2`)

        sorteos[chatId][dia] = { usuarios: mentioned, texto: textoFijo }
        evidencia[chatId][dia] = {}

        let list = mentioned.map((u, i) => `│ ❄️ ${i+1}. @${u.split('@')[0]}`).join('\n')
        let msg = `┏━━━━━━━━━━━━━━━┓\n`
        msg += `┃ ✧ 𝗔𝗦𝗜𝗚𝗡𝗔𝗖𝗜𝗢𝗡 𝗖𝗥𝗜𝗦𝗧𝗔𝗟 ✧ ┃\n`
        msg += `┗━━━━━━━━━━━━━━━┛\n`
        msg += `❄️ ${emojis[dia]} *${dia.toUpperCase()}* ${emojis[dia]}\n\n`
        msg += `┌─ PARTICIPANTES ASIGNADOS ─┐\n${list}\n└──────────────────────────┘\n\n`
        msg += `📜 *DIRECTIVA:* ${textoFijo}\n\n`
        msg += `💎 Usa.${dia} para recordar\n`
        msg += `💎 Al terminar: *.listo + CAPTURA*`

        await conn.reply(m.chat, msg, m, { mentions: mentioned })
        return
    }

    // ===== 2. BORRAR DÍA - SOLO ADMIN =====
    if (command.startsWith('borrar')) {
        if (!isAdmin) return m.reply('❄️ ❌ *SOLO ADMINS* ❌')
        if (!dias.includes(dia)) return m.reply('❄️ ❌ *DÍA INVÁLIDO* ❌\n> Usa: borrarlunes, borrarmartes...')
        if (!sorteos[chatId][dia]) return m.reply(`❄️ ❌ *NO HAY ASIGNACIÓN* ❌\n> El ${dia} está vacío`)

        delete sorteos[chatId][dia]
        delete evidencia[chatId][dia]
        return m.reply(`✅ *BORRADO EXITOSO*\n❄️ Se eliminó la asignación de *${dia.toUpperCase()}*`)
    }

    // ===== 3. RECORDATORIO - SOLO ADMIN =====
    if (dias.includes(command.toLowerCase())) {
        if (!isAdmin) return m.reply('❄️ ❌ *SOLO ADMINS* ❌')
        let sorteo = sorteos[chatId][command.toLowerCase()]
        if (!sorteo) return m.reply(`❄️ ❌ *SIN ASIGNACIÓN* ❌\n> Usa: ${usedPrefix}set${command} @user`)

        let menciones = sorteo.usuarios
        let list = menciones.map((u, i) => `│ ❄️ ${i+1}. @${u.split('@')[0]}`).join('\n')

        let msg = `┏━━━━━━━━━━━━━━━┓\n`
        msg += `┃ ✧ 𝗥𝗘𝗖𝗢𝗥𝗗𝗔𝗧𝗢𝗥𝗜𝗢 𝗖𝗥𝗜𝗦𝗧𝗔𝗟 ✧ ┃\n`
        msg += `┗━━━━━━━━━━━━━━━┛\n`
        msg += `${emojis[command]} *${command.toUpperCase()}* ${emojis[command]}\n\n`
        msg += `┌─ PARTICIPANTES ASIGNADOS ─┐\n${list}\n└──────────────────────────┘\n\n`
        msg += `┌─ DIRECTIVA ─┐\n│ 📜 ${sorteo.texto}\n└─────────────┘\n\n`
        msg += `⚠️ *PROTOCOLO:*\n`
        msg += `❄️ Realizar sorteo el día asignado\n`
        msg += `❄️ Evitar tache con justificación\n`
        msg += `━━━━━━━━━━━━\n`
        msg += `✅ *Si ya sorteaste:*.listo + CAPTURA\n`
        msg += `━━━━━━━━━━━━`

        await conn.reply(m.chat, msg, m, { mentions: menciones })
        return
    }

    // ===== 4. LISTO CON EVIDENCIA =====
    if (command === 'listo') {
        let sorteoHoy = sorteos[chatId][hoy]
        if (!sorteoHoy) return m.reply(`❄️ ❌ *NO HAY PARTICIPANTES ASIGNADOS HOY* ❌\n> Hoy es *${hoy.toUpperCase()}* en Perú\n> Usa: ${usedPrefix}set${hoy} @user`)

        let asignados = sorteoHoy.usuarios.map(j => j.toLowerCase())
        let yo = m.sender.toLowerCase()

        if (!asignados.includes(yo)) {
            let listaNombres = asignados.map(u => `@${u.split('@')[0]}`).join(' ')
            return m.reply(`❄️ ❌ *NO ESTÁS ASIGNADO PARA HOY* ❌\n> Hoy es *${hoy.toUpperCase()}* en Perú\n❄️ *Asignados hoy:* ${listaNombres}`, null, { mentions: asignados })
        }

        if (evidencia[chatId][hoy][yo]) return m.reply('❄️ ✅ *YA REGISTRASTE EVIDENCIA HOY* ✅')

        let q = m.quoted? m.quoted : m
        let mime = (q.msg || q).mimetype || ''
        if (!/image/.test(mime)) return m.reply(`❄️ ❌ *MANDA CAPTURA* ❌\n> Envía la foto + pie:.listo`)

        evidencia[chatId][hoy][yo] = true

        let nombre = await conn.getName(m.sender)
        let numero = m.sender.split('@')[0]
        if (!lista[chatId][hoy].some(p => p.user.toLowerCase() === yo)) {
            lista[chatId][hoy].push({user: yo, nombre, numero, premio: 'Participante - Sorteo del día', hora: new Date().toLocaleTimeString('es-PE', {timeZone: 'America/Lima'})})
        }

        let caption = `┏━━━━━━━━━━━━━━━┓\n`
        caption += `┃ ✧ 𝗘𝗩𝗜𝗗𝗘𝗡𝗖𝗜𝗔 𝗩𝗔𝗟𝗜𝗗𝗔𝗗𝗔 ✧ ┃\n`
        caption += `┗━━━━━━━━━━━━━━━┛\n`
        caption += `✅ @${m.sender.split('@')[0]} *CUMPLIÓ*\n`
        caption += `${emojis[hoy]} *${hoy.toUpperCase()}* PERÚ\n`
        caption += `┏━━━━━━━━━━━━━━━┓\n`
        caption += `┃ ✧ 𝗣𝗔𝗥𝗧𝗜𝗖𝗜𝗣𝗔 𝗔𝗛𝗢𝗥𝗔 ✧ ┃\n`
        caption += `┗━━━━━━━━━━━━━━━┛\n`
        caption += `🎁 Usa: *.list Nombre/Numero/Premio*\n`
        caption += `💎 *Ej:*.list Juan/987654321/Iphone\n`
        caption += `⏰ *Anótate antes que cierre*\n`

        await conn.sendMessage(m.chat, {image: q, caption}, { mentions: [yo] })
        return
    }

    // ===== 5. VER LISTA =====
    if (command === 'verlista') {
        if (lista[chatId][hoy].length === 0) return m.reply(`❄️ ❌ *LISTA VACÍA* ❌\n> Nadie se ha anotado hoy *${hoy.toUpperCase()}*`)
        let txt = `┏━━━━━━━━━━━━━━━┓\n`
        txt += `┃ ✧ 𝗟𝗜𝗦𝗧𝗔 𝗗𝗘 𝗣𝗔𝗥𝗧𝗜𝗖𝗜𝗣𝗔𝗡𝗧𝗘𝗦 ✧ ┃\n`
        txt += `┗━━━━━━━━━━━━━━━┛\n`
        txt += `${emojis[hoy]} *${hoy.toUpperCase()}* PERÚ\n`
        lista[chatId][hoy].forEach((p, i) => {
            txt += `💎 *${i+1}.* ${p.nombre}\n`
            txt += ` 📱 ${p.numero}\n`
            txt += ` 🎁 ${p.premio}\n\n`
        })
        txt += `━━━━━━━━━━━━\n`
        txt += `*TOTAL:* ${lista[chatId][hoy].length} participantes`
        return conn.reply(m.chat, txt, m)
    }

    // ===== 6. VER SEMANA =====
    if (command === 'verdias') {
        if (Object.keys(sorteos[chatId]).length === 0) return m.reply('❄️ ❌ *SIN ASIGNACIONES* ❌')
        let horaPeru = new Date().toLocaleTimeString('es-PE', {timeZone: 'America/Lima'})
        let txt = `┏━━━━━━━━━━━━━━━┓\n`
        txt += `┃ ✧ 𝗖𝗥𝗢𝗡𝗢𝗚𝗥𝗔𝗠𝗔 𝗦𝗘𝗠𝗔𝗡𝗔𝗟 ✧ ┃\n`
        txt += `┗━━━━━━━━━━━━━━━┛\n`
        txt += `🕐 *Hora Perú:* ${horaPeru}\n`
        txt += `🗓️ *Hoy:* ${hoy.toUpperCase()}\n\n`
        for(let d of dias){
            if(!sorteos[chatId][d]) continue
            txt += `${emojis[d]} *${d.toUpperCase()}*\n`
            sorteos[chatId][d].usuarios.forEach((u, i) => { txt += `│ ❄️ ${i+1}. @${u.split('@')[0]}\n` })
            txt += `│\n`
        }
        txt += `━━━━━━━━━━━━`
        return conn.reply(m.chat, txt, m, { mentions: Object.values(sorteos[chatId]).flatMap(s => s.usuarios) })
    }
}

handler.help = [
'setlunes @user','setmartes @user','setmiercoles @user','setjueves @user','setviernes @user','setsabado @user',
'borrarlunes','borrarmartes','borrarmiercoles','borrarjueves','borrarviernes','borrarsabado',
'lunes','martes','miercoles','jueves','viernes','sabado','verdias','listo','verlista'
]
handler.tags = ['sorteos']
handler.command = /^(setlunes|setmartes|setmiercoles|setjueves|setviernes|setsabado|borrarlunes|borrarmartes|borrarmiercoles|borrarjueves|borrarviernes|borrarsabado|lunes|martes|miercoles|jueves|viernes|sabado|listo|verlista|verdias)$/i
handler.group = true
handler.admin = false
export default handler