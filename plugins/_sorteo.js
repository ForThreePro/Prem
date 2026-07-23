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

    const options = { weekday: 'long', timeZone: 'America/Lima' }
    let hoyRaw = new Intl.DateTimeFormat('es-PE', options).format(new Date()).toLowerCase()
    let hoy = hoyRaw.normalize("NFD").replace(/[\u0300-\u036f]/g, "")

    let chatId = m.chat

    sorteos[chatId] = sorteos[chatId] || {}
    evidencia[chatId] = evidencia[chatId] || {}
    lista[chatId] = lista[chatId] || {}
    lista[chatId][hoy] = lista[chatId][hoy] || []
    evidencia[chatId][hoy] = evidencia[chatId][hoy] || {}

    const limpiarNumero = (jid) => jid.replace(/[^0-9]/g, '')

    if (command.startsWith('set')) {
        if (!isAdmin) return m.reply('❄️ ❌ *SOLO ADMINS* ❌')
        if (!dias.includes(dia)) return m.reply('❄️ ❌ *DÍA INVÁLIDO* ❌')
        let mentioned = m.mentionedJid
        if (mentioned.length === 0) return m.reply(`❄️ ❌ *FALTA MENCIONAR* ❌`)
        sorteos[chatId][dia] = { usuarios: mentioned, texto: textoFijo }
        evidencia[chatId][dia] = {}
        let list = mentioned.map((u, i) => `│ ❄️ ${i+1}. @${u.split('@')[0]} - ${limpiarNumero(u)}`).join('\n')
        let msg = `┏━━━━━━━━━━━━━━━┓\n┃ ✧ 𝗔𝗦𝗜𝗚𝗡𝗔𝗖𝗜𝗢𝗡 𝗖𝗥𝗜𝗦𝗧𝗔𝗟 ✧ ┃\n┗━━━━━━━━━━━━━━━┛\n❄️ ${emojis[dia]} *${dia.toUpperCase()}* ${emojis[dia]}\n\n┌─ PARTICIPANTES ASIGNADOS ─┐\n${list}\n└──────────────────────────┘\n\n📜 *DIRECTIVA:* ${textoFijo}\n\n💎 Al terminar: *.listo + CAPTURA*`
        await conn.reply(m.chat, msg, m, { mentions: mentioned })
        return
    }

    if (command.startsWith('borrar')) {
        if (!isAdmin) return m.reply('❄️ ❌ *SOLO ADMINS* ❌')
        if (!dias.includes(dia)) return m.reply('❄️ ❌ *DÍA INVÁLIDO* ❌')
        delete sorteos[chatId][dia]
        delete evidencia[chatId][dia]
        return m.reply(`✅ *BORRADO EXITOSO*\n❄️ Se eliminó *${dia.toUpperCase()}*`)
    }

    if (dias.includes(command.toLowerCase())) {
        if (!isAdmin) return m.reply('❄️ ❌ *SOLO ADMINS* ❌')
        let sorteo = sorteos[chatId][command.toLowerCase()]
        if (!sorteo) return m.reply(`❄️ ❌ *SIN ASIGNACIÓN* ❌`)
        let menciones = sorteo.usuarios
        let list = menciones.map((u, i) => `│ ❄️ ${i+1}. @${u.split('@')[0]} - ${limpiarNumero(u)}`).join('\n') // <- AHORA MUESTRA EL NUMERO
        let msg = `┏━━━━━━━━━━━━━━━┓\n┃ ✧ 𝗥𝗘𝗖𝗢𝗥𝗗𝗔𝗧𝗢𝗥𝗜𝗢 𝗖𝗥𝗜𝗦𝗧𝗔𝗟 ✧ ┃\n┗━━━━━━━━━━━━━━━┛\n${emojis[command]} *${command.toUpperCase()}* ${emojis[command]}\n\n┌─ PARTICIPANTES ASIGNADOS ─┐\n${list}\n└──────────────────────────┘\n\n📜 ${sorteo.texto}`
        await conn.reply(m.chat, msg, m, { mentions: menciones })
        return
    }

    if (command === 'listo') {
        let sorteoHoy = sorteos[chatId][hoy]
        if (!sorteoHoy) return m.reply(`❄️ ❌ *NO HAY PARTICIPANTES ASIGNADOS HOY* ❌\n> Hoy es *${hoy.toUpperCase()}*`)

        let yoNumero = limpiarNumero(m.sender)
        let asignadosNumeros = sorteoHoy.usuarios.map(j => limpiarNumero(j))

        // DEBUG TEMPORAL - BORRA ESTO DESPUES
        if(!asignadosNumeros.includes(yoNumero)){
            return m.reply(`❄️ ❌ *NO ESTÁS ASIGNADO* ❌\n> Hoy: *${hoy.toUpperCase()}*\n> Tu numero: ${yoNumero}\n> Asignados: ${asignadosNumeros.join(', ')}`)
        }

        if (evidencia[chatId][hoy][yoNumero]) return m.reply('❄️ ✅ *YA REGISTRASTE EVIDENCIA HOY* ✅')

        let q = m.quoted? m.quoted : m
        let mime = (q.msg || q).mimetype || ''
        if (!/image/.test(mime)) return m.reply(`❄️ ❌ *MANDA CAPTURA* ❌`)

        evidencia[chatId][hoy][yoNumero] = true
        let nombre = await conn.getName(m.sender)
        let numero = m.sender.split('@')[0]
        if (!lista[chatId][hoy].some(p => limpiarNumero(p.user) === yoNumero)) {
            lista[chatId][hoy].push({user: m.sender, nombre, numero, premio: 'Participante', hora: new Date().toLocaleTimeString('es-PE', {timeZone: 'America/Lima'})})
        }
        let caption = `✅ @${m.sender.split('@')[0]} *CUMPLIÓ*\n${emojis[hoy]} *${hoy.toUpperCase()}* PERÚ`
        await conn.sendMessage(m.chat, {image: q, caption}, { mentions: [m.sender] })
        return
    }

    if (command === 'verlista') {
        if (lista[chatId][hoy].length === 0) return m.reply(`❄️ ❌ *LISTA VACÍA* ❌`)
        let txt = `┏━━━━━━━━━━━━━━━┓\n┃ ✧ 𝗟𝗜𝗦𝗧𝗔 𝗗𝗘 𝗣𝗔𝗥𝗧𝗜𝗖𝗜𝗣𝗔𝗡𝗧𝗘𝗦 ✧ ┃\n┗━━━━━━━━━━━━━━━┛\n${emojis[hoy]} *${hoy.toUpperCase()}* PERÚ\n`
        lista[chatId][hoy].forEach((p, i) => { txt += `💎 *${i+1}.* ${p.nombre}\n 📱 ${p.numero}\n\n` })
        return conn.reply(m.chat, txt, m)
    }

    if (command === 'verdias') {
        if (Object.keys(sorteos[chatId]).length === 0) return m.reply('❄️ ❌ *SIN ASIGNACIONES* ❌')
        let horaPeru = new Date().toLocaleTimeString('es-PE', {timeZone: 'America/Lima'})
        let txt = `┏━━━━━━━━━━━━━━━┓\n┃ ✧ 𝗖𝗥𝗢𝗡𝗢𝗚𝗥𝗔𝗠𝗔 𝗦𝗘𝗠𝗔𝗡𝗔𝗟 ✧ ┃\n┗━━━━━━━━━━━━━━━┛\n🕐 *Hora Perú:* ${horaPeru}\n🗓️ *Hoy:* ${hoy.toUpperCase()}\n\n`
        for(let d of dias){
            if(!sorteos[chatId][d]) continue
            txt += `${emojis[d]} *${d.toUpperCase()}*\n`
            sorteos[chatId][d].usuarios.forEach((u, i) => { txt += `│ ❄️ ${i+1}. @${u.split('@')[0]} - ${limpiarNumero(u)}\n` })
            txt += `│\n`
        }
        return conn.reply(m.chat, txt, m, { mentions: Object.values(sorteos[chatId]).flatMap(s => s.usuarios) })
    }
}

handler.help = ['setlunes @user','setmartes @user','setmiercoles @user','setjueves @user','setviernes @user','setsabado @user','borrarlunes','borrarmartes','borrarmiercoles','borrarjueves','borrarviernes','borrarsabado','lunes','martes','miercoles','jueves','viernes','sabado','verdias','listo','verlista']
handler.tags = ['sorteos']
handler.command = /^(setlunes|setmartes|setmiercoles|setjueves|setviernes|setsabado|borrarlunes|borrarmartes|borrarmiercoles|borrarjueves|borrarviernes|borrarsabado|lunes|martes|miercoles|jueves|viernes|sabado|listo|verlista|verdias)$/i
handler.group = true
export default handler