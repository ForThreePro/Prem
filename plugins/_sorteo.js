let handler = async (m, { conn, command, args, usedPrefix, isAdmin }) => {

    global.db.data.sorteos = global.db.data.sorteos || {}
    let sorteos = global.db.data.sorteos
    let chatId = m.chat

    const dias = ['lunes','martes','miercoles','jueves','viernes','sabado']
    const emojis = {lunes:'🌙', martes:'☀️', miercoles:'⚡', jueves:'💎', viernes:'🔥', sabado:'👑'}
    const brillo = '✧･ﾟ: *✧･ﾟ:* *:･ﾟ✧*:･ﾟ✧'

    let dia = command.replace('set','').toLowerCase()
    let chatId = m.chat

    sorteos[chatId] = sorteos[chatId] || {}

    // ===== 1. ASIGNAR:.setjueves @user1 @user2 =====
    if (command.startsWith('set')) {
        if (!isAdmin) return m.reply(`❄️ ${brillo}\n┃ ❌ *SOLO ADMINS* ❌\n${brillo}`)
        if (!dias.includes(dia)) return m.reply(`❄️ ❌ *DÍA INVÁLIDO* ❌\n> Usa: lunes a sábado`)

        let mentioned = m.mentionedJid
        if (mentioned.length === 0) return m.reply(`❄️ ${brillo}\n┃ ❌ *FALTA MENCIONAR* ❌\n┃ *Ejemplo:* ${usedPrefix}set${dia} @user1 @user2\n${brillo}`)

        sorteos[chatId][dia] = mentioned

        let list = mentioned.map((u, i) => `│ ✨ ${i+1}. @${u.split('@')[0]}`).join('\n')
        let msg = `┏━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ${brillo} ┃
┃ ✦ 𝗔𝗦𝗜𝗚𝗡𝗔𝗖𝗜𝗢𝗡 𝗖𝗥𝗜𝗦𝗧𝗔𝗟 ✦ ┃
┃ ${brillo} ┃
┗━━━━━━━━━━━━━━━━━━━━━━━┛
💎 ${emojis[dia]} *${dia.toUpperCase()}* ${emojis[dia]} 💎

┌─ ✦ PARTICIPANTES ✦ ─┐
${list}
└─────────────────────┘

📜 *DIRECTIVA:*
│ Realiza el sorteo del día
│ Reacciona y comparte en el grupo

${brillo}
> Usa:.${dia} para recordar`
        await conn.reply(m.chat, msg, m, { mentions: mentioned })
        return
    }

    // ===== 2. BORRAR:.borrarjueves =====
    if (command.startsWith('borrar')) {
        if (!isAdmin) return m.reply(`❄️ ❌ *SOLO ADMINS* ❌`)
        if (!dias.includes(dia)) return m.reply(`❄️ ❌ *DÍA INVÁLIDO* ❌`)
        delete sorteos[chatId][dia]
        return m.reply(`✅ ${brillo}\n┃ *BORRADO EXITOSO*\n┃ Se eliminó *${dia.toUpperCase()}*\n${brillo}`)
    }

    // ===== 3. RECORDATORIO:.jueves =====
    if (dias.includes(command.toLowerCase())) {
        if (!isAdmin) return m.reply(`❄️ ❌ *SOLO ADMINS* ❌`)
        let asignados = sorteos[chatId][command.toLowerCase()]
        if (!asignados) return m.reply(`❄️ ${brillo}\n┃ ❌ *SIN ASIGNACIÓN* ❌\n┃ Usa: ${usedPrefix}set${command} @user\n${brillo}`)

        let list = asignados.map((u, i) => `│ ✨ ${i+1}. @${u.split('@')[0]}`).join('\n')
        let msg = `┏━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ${brillo} ┃
┃ ✦ 𝗥𝗘𝗖𝗢𝗥𝗗𝗔𝗧𝗢𝗥𝗜𝗢 𝗖𝗥𝗜𝗦𝗧𝗔𝗟 ✦ ┃
┃ ${brillo} ┃
┗━━━━━━━━━━━━━━━┛
${emojis[command]} *${command.toUpperCase()}* ${emojis[command]}

┌─ ✦ PARTICIPANTES ✦ ─┐
${list}
└─────────────────────┘

┌─ ✦ DIRECTIVA ✦ ─┐
│ 📜 Realiza el sorteo del día
│ 📜 Reacciona y comparte
└─────────────────┘

${brillo}
⚠️ *Recuerden cumplir su turno*`
        await conn.reply(m.chat, msg, m, { mentions: asignados })
        return
    }

    // ===== 4. VER SEMANA:.versorteos =====
    if (command === 'versorteos') {
        if (Object.keys(sorteos[chatId]).length === 0) return m.reply(`❄️ ❌ *NO HAY ASIGNACIONES* ❌`)

        let txt = `┏━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ${brillo} ┃
┃ ✦ 𝗖𝗥𝗢𝗡𝗢𝗚𝗥𝗔𝗠𝗔 𝗦𝗘𝗠𝗔𝗡𝗔𝗟 ✦ ┃
┃ ${brillo} ┃
┗━━━━━━━━━━━━━━━━━━━━━━━┛\n\n`

        for(let d of dias){
            if(!sorteos[chatId][d]) continue
            txt += `${emojis[d]} *${d.toUpperCase()}*\n`
            sorteos[chatId][d].forEach((u, i) => { txt += `│ ✨ ${i+1}. @${u.split('@')[0]}\n` })
            txt += `│\n`
        }
        txt += `${brillo}`
        return conn.reply(m.chat, txt, m, { mentions: Object.values(sorteos[chatId]).flat() })
    }
}

handler.help = ['setlunes @user','setmartes @user','setmiercoles @user','setjueves @user','setviernes @user','setsabado @user','borrarjueves','lunes','martes','miercoles','jueves','viernes','sabado','versorteos']
handler.tags = ['sorteos']
handler.command = /^(setlunes|setmartes|setmiercoles|setjueves|setviernes|setsabado|borrarlunes|borrarmartes|borrarmiercoles|borrarjueves|borrarviernes|borrarsabado|lunes|martes|miercoles|jueves|viernes|sabado|versorteos)$/i
handler.group = true
handler.admin = false
export default handler