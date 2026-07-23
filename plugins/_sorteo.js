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

    // NUEVA FUNCION: CONVERTIR LID A NUMERO REAL
    const getNumeroReal = async (jid) => {
        let num = jid.split('@')[0]
        if(jid.endsWith('@lid')){
            try {
                let [result] = await conn.onWhatsApp(num) // busca el numero real del LID
                return result?.jid? result.jid.split('@')[0] : num
            } catch(e){ return num }
        }
        return num.replace(/[^0-9]/g, '')
    }

    if (command.startsWith('set')) {
        if (!isAdmin) return m.reply('❄️ ❌ *SOLO ADMINS* ❌')
        if (!dias.includes(dia)) return m.reply('❄️ ❌ *DÍA INVÁLIDO* ❌')
        let mentioned = m.mentionedJid
        if (mentioned.length === 0) return m.reply(`❄️ ❌ *FALTA MENCIONAR* ❌`)

        // CONVERTIR TODOS A NUMERO REAL ANTES DE GUARDAR
        let numeros = []
        for(let j of mentioned){
            numeros.push(await getNumeroReal(j))
        }

        sorteos[chatId][dia] = { usuarios: numeros, texto: textoFijo }
        evidencia[chatId][dia] = {}

        let list = numeros.map((u, i) => `│ ❄️ ${i+1}. @${u}`).join('\n')
        let msg = `┏━━━━━━━━━━━━━━━┓\n┃ ✧ 𝗔𝗦𝗜𝗚𝗡𝗔𝗖𝗜𝗢𝗡 𝗖𝗥𝗜𝗦𝗧𝗔𝗟 ✧ ┃\n┗━━━━━━━━━━━━━━━┛\n❄️ ${emojis[dia]} *${dia.toUpperCase()}* ${emojis[dia]}\n\n┌─ PARTICIPANTES ASIGNADOS ─┐\n${list}\n└──────────────────────────┘\n\n📜 *DIRECTIVA:* ${textoFijo}`
        await conn.reply(m.chat, msg, m, { mentions: mentioned })
        return
    }

    if (command.startsWith('borrar')) {
        if (!isAdmin) return m.reply('❄️ ❌ *SOLO ADMINS* ❌')
        delete sorteos[chatId][dia]
        delete evidencia[chatId][dia]
        return m.reply(`✅ *BORRADO EXITOSO*\n❄️ Se eliminó *${dia.toUpperCase()}*`)
    }

    if (dias.includes(command.toLowerCase())) {
        if (!isAdmin) return m.reply('❄️ ❌ *SOLO ADMINS* ❌')
        let sorteo = sorteos[chatId][command.toLowerCase()]
        if (!sorteo) return m.reply(`❄️ ❌ *SIN ASIGNACIÓN* ❌`)
        let numeros = sorteo.usuarios
        let list = numeros.map((u, i) => `│ ❄️ ${i+1}. @${u}`).join('\n')
        let msg = `┏━━━━━━━━━━━━━━━┓\n┃ ✧ 𝗥𝗘𝗖𝗢𝗥𝗗𝗔𝗧𝗢𝗥𝗜𝗢 𝗖𝗥𝗜𝗦𝗧𝗔𝗟 ✧ ┃\n┗━━━━━━━━━━━━━━━┛\n${emojis[command]} *${command.toUpperCase()}*\n\n┌─ PARTICIPANTES ASIGNADOS ─┐\n${list}\n└──────────────────────────┘\n\n📜 ${sorteo.texto}`
        await conn.reply(m.chat, msg, m, { mentions: numeros.map(n => n + '@s.whatsapp.net') })
        return
    }

    if (command === 'listo') {
        let sorteoHoy = sorteos[chatId][hoy]
        if (!sorteoHoy) return m.reply(`❄️ ❌ *NO HAY PARTICIPANTES ASIGNADOS HOY* ❌`)

        let yoNumero = await getNumeroReal(m.sender) // <- TAMBIEN CONVERTIMOS EL TUYO
        let asignadosNumeros = sorteoHoy.usuarios

        if (!asignadosNumeros.includes(yoNumero)) {
            let listaNombres = asignadosNumeros.map(u => `@${u}`).join(' ')
            return m.reply(`❄️ ❌ *NO ESTÁS ASIGNADO PARA HOY* ❌\n> Hoy: *${hoy.toUpperCase()}*\n> Tu numero detectado: ${yoNumero}\n❄️ *Asignados:* ${listaNombres}`, null, { mentions: asignadosNumeros.map(n => n + '@s.whatsapp.net') })
        }

        if (evidencia[chatId][hoy][yoNumero]) return m.reply('❄️ ✅ *YA REGISTRASTE EVIDENCIA HOY* ✅')

        let q = m.quoted? m.quoted : m
        let mime = (q.msg || q).mimetype || ''
        if (!/image/.test(mime)) return m.reply(`❄️ ❌ *MANDA CAPTURA* ❌`)

        evidencia[chatId][hoy][yoNumero] = true
        let nombre = await conn.getName(m.sender)
        if (!lista[chatId][hoy].some(p => p.numero === yoNumero)) {
            lista[chatId][hoy].push({user: m.sender, nombre, numero: yoNumero, premio: 'Participante', hora: new Date().toLocaleTimeString('es-PE', {timeZone: 'America/Lima'})})
        }
        let caption = `✅ @${yoNumero} *CUMPLIÓ*\n${emojis[hoy]} *${hoy.toUpperCase()}* PERÚ`
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
            sorteos[chatId][d].usuarios.forEach((u, i) => { txt += `│ ❄️ ${i+1}. @${u}\n` })
            txt += `│\n`
        }
        return conn.reply(m.chat, txt, m, { mentions: Object.values(sorteos[chatId]).flatMap(s => s.usuarios.map(n => n + '@s.whatsapp.net')) })
    }
}

handler.help = ['setlunes @user','setmartes @user','setmiercoles @user','setjueves @user','setviernes @user','setsabado @user','borrarlunes','borrarmartes','borrarmiercoles','borrarjueves','borrarviernes','borrarsabado','lunes','martes','miercoles','jueves','viernes','sabado','verdias','listo','verlista']
handler.tags = ['sorteos']
handler.command = /^(setlunes|setmartes|setmiercoles|setjueves|setviernes|setsabado|borrarlunes|borrarmartes|borrarmiercoles|borrarjueves|borrarviernes|borrarsabado|lunes|martes|miercoles|jueves|viernes|sabado|listo|verlista|verdias)$/i
handler.group = true
export default handler