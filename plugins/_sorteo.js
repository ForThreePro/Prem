let handler = async (m, { conn, command, args, usedPrefix, isAdmin }) => {

    global.db.data.sorteos = global.db.data.sorteos || {}
    global.db.data.sorteosEvidencia = global.db.data.sorteosEvidencia || {}
    global.db.data.sorteosLista = global.db.data.sorteosLista || {}
    global.db.data.sorteosMap = global.db.data.sorteosMap || {} // MAPA LID -> NUMERO
    let sorteos = global.db.data.sorteos
    let evidencia = global.db.data.sorteosEvidencia
    let lista = global.db.data.sorteosLista
    let mapa = global.db.data.sorteosMap

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
    mapa[chatId] = mapa[chatId] || {}

    const getNumero = (jid) => jid.split('@')[0].replace(/[^0-9]/g, '')

    // REGISTRAR: cada vez que alguien habla guardamos LID = Numero
    mapa[chatId][getNumero(m.sender)] = m.sender

    if (command.startsWith('set')) {
        if (!isAdmin) return m.reply('❄️ ❌ *SOLO ADMINS* ❌')
        let mentioned = m.mentionedJid
        if (mentioned.length === 0) return m.reply(`❄️ ❌ *FALTA MENCIONAR* ❌`)

        let numeros = mentioned.map(j => getNumero(j)) // guarda el LID o numero que sea
        sorteos[chatId][dia] = { usuarios: numeros, texto: textoFijo }
        evidencia[chatId][dia] = {}

        let list = numeros.map((u, i) => `│ ❄️ ${i+1}. @${u}`).join('\n')
        await conn.reply(m.chat, `❄️ ${emojis[dia]} *${dia.toUpperCase()}* \n\n${list}`, m, { mentions: mentioned })
        return
    }

    if (command === 'listo') {
        let sorteoHoy = sorteos[chatId][hoy]
        if (!sorteoHoy) return m.reply(`❄️ ❌ *NO HAY PARTICIPANTES ASIGNADOS HOY* ❌`)

        let yoNumero = getNumero(m.sender)
        let yoJid = m.sender

        // BUSCAR: si estoy asignado por numero O por LID
        let estoy = sorteoHoy.usuarios.some(u => {
            let jidAsignado = mapa[chatId][u] || u + '@s.whatsapp.net' // busca si ese numero tiene un JID guardado
            return getNumero(jidAsignado) === yoNumero || u === yoNumero
        })

        if (!estoy) {
            let listaNombres = sorteoHoy.usuarios.map(u => `@${u}`).join(' ')
            return m.reply(`❄️ ❌ *NO ESTÁS ASIGNADO PARA HOY* ❌\n> Tu ID: ${yoNumero}`, null, { mentions: sorteoHoy.usuarios.map(n => mapa[chatId][n] || n + '@s.whatsapp.net') })
        }

        if (evidencia[chatId][hoy][yoNumero]) return m.reply('❄️ ✅ *YA REGISTRASTE EVIDENCIA HOY* ✅')

        let q = m.quoted? m.quoted : m
        if (!/image/.test((q.msg || q).mimetype || '')) return m.reply(`❄️ ❌ *MANDA CAPTURA* ❌`)

        evidencia[chatId][hoy][yoNumero] = true
        let nombre = await conn.getName(m.sender)
        if (!lista[chatId][hoy].some(p => p.numero === yoNumero)) {
            lista[chatId][hoy].push({user: m.sender, nombre, numero: yoNumero, premio: 'Participante'})
        }
        await conn.sendMessage(m.chat, {image: q, caption: `✅ @${yoNumero} *CUMPLIÓ*`}, { mentions: [m.sender] })
        return
    }

    if (dias.includes(command.toLowerCase())) {
        if (!isAdmin) return m.reply('❄️ ❌ *SOLO ADMINS* ❌')
        let sorteo = sorteos[chatId][command.toLowerCase()]
        if (!sorteo) return m.reply(`❄️ ❌ *SIN ASIGNACIÓN* ❌`)
        let menciones = sorteo.usuarios.map(n => mapa[chatId][n] || n + '@s.whatsapp.net')
        let list = sorteo.usuarios.map((u, i) => `│ ❄️ ${i+1}. @${u}`).join('\n')
        await conn.reply(m.chat, `${emojis[command]} *${command.toUpperCase()}*\n\n${list}`, m, { mentions: menciones })
        return
    }
}

handler.help = ['setlunes @user','setjueves @user','jueves','listo']
handler.tags = ['sorteos']
handler.command = /^(setlunes|setmartes|setmiercoles|setjueves|setviernes|setsabado|borrarlunes|borrarmartes|borrarmiercoles|borrarjueves|borrarviernes|borrarsabado|lunes|martes|miercoles|jueves|viernes|sabado|listo|verlista|verdias)$/i
handler.group = true
export default handler