let toM = a => '@' + a.split('@')[0]

let handler = async (m, { conn, command, args }) => {
    let user = global.db.data.users
    let who = m.mentionedJid[0] || m.quoted?.sender

    // Inicializar si no existe
    if (!user[m.sender].pareja) user[m.sender].pareja = ""
    if (who &&!user[who].pareja) user[who].pareja = ""

    // ===== CASARSE =====
    if (command == 'matrimonio' || command == 'casar') {
        if (!who) return m.reply(`💔 *Uso:*.matrimonio @usuario\n*Tienes que proponerle matrimonio a alguien*`)
        if (who == m.sender) return m.reply(`🙄 *No te puedes casar contigo mismo causa*`)

        let parejaTuya = user[m.sender].pareja
        let parejaDeEl = user[who].pareja

        if (parejaTuya) return m.reply(`💍 *Ya estás casado con @${parejaTuya.split('@')[0]}*\n*Divórciate primero con.divorcio*`)
        if (parejaDeEl) return m.reply(`💔 *@${who.split('@')[0]} ya está casado con @${parejaDeEl.split('@')[0]}*`)

        // Casamiento
        user[m.sender].pareja = who
        user[who].pareja = m.sender

        let name = await conn.getName(m.sender)
        let name2 = await conn.getName(who)

        return m.reply(`┏━━━━━━━━━━━━━━━┓
┃ 💒 *MATRIMONIO* 💒 ┃
┗━━━━━━━━━━━┛

💍 *¡FELICIDADES!*

${toM(m.sender)} y ${toM(who)}
*AHORA ESTÁN CASADOS* 💑

📅 *Fecha:* ${new Date().toLocaleDateString('es-PE')}
💬 *"Hasta que la muerte los separe... o hasta que usen.divorcio"* 😈

> Que vivan los novios!!! 🎉`, null, { mentions: [m.sender, who] })
    }

    // ===== DIVORCIO =====
    if (command == 'divorcio' || command == 'separar') {
        if (!user[m.sender].pareja) return m.reply(`💔 *No estás casado con nadie*`)

        let pareja = user[m.sender].pareja
        let name = await conn.getName(m.sender)
        let name2 = await conn.getName(pareja)

        // Divorcio
        user[m.sender].pareja = ""
        user[pareja].pareja = ""

        return m.reply(`┏━━━━━━━━━━━━━━━┓
┃ 💔 *DIVORCIO* 💔 ┃
┗━━━━━━━━━━━━━━━━━━━┛

${name} y ${name2}
*YA NO ESTÁN JUNTOS* 😭

*Motivo:* La rutina los mató
*División de bienes:* Se queda con el wifi

> Ahora ambos son libres de nuevo 🕊️`, null, { mentions: [m.sender, pareja] })
    }

    // ===== VER PAREJA =====
    if (command == 'pareja' || command == 'esposo' || command == 'esposa') {
        let pareja = user[m.sender].pareja
        if (!pareja) return m.reply(`💔 *Estás soltero causa*\nUsa.matrimonio @usuario`)

        let name = await conn.getName(pareja)
        return m.reply(`┏━━━━━━━━━━━━━━━┓
┃ 💍 *MI PAREJA* 💍 ┃
┗━━━━━━━━━━━┛

👤 @${pareja.split('@')[0]}
*Nombre:* ${name}
*Estado:* Casados 💑

> "El amor es bonito" 🥰`, null, { mentions: [pareja] })
    }

    // ===== TOP PAREJAS DEL GRUPO =====
    if (command == 'topparejas' || command == 'parejas') {
        let parejas = []
        let vistos = new Set()

        for (let u in user) {
            if (user[u].pareja &&!vistos.has(u) &&!vistos.has(user[u].pareja)) {
                parejas.push([u, user[u].pareja])
                vistos.add(u)
                vistos.add(user[u].pareja)
            }
        }

        if (parejas.length == 0) return m.reply(`💔 *No hay parejas en el grupo aún*`)

        let texto = `┏━━━━━━━━━━━━━━━┓
┃ 💑 *TOP PAREJAS* 💑 ┃
┗━━━━━━━━━━━┛\n\n`

        let i = 1
        for (let [a, b] of parejas) {
            let nameA = await conn.getName(a)
            let nameB = await conn.getName(b)
            texto += `${i}. ${toM(a)} ❤️ ${toM(b)}\n`
            i++
        }

        texto += `\n*Total:* ${parejas.length} parejas casadas`
        return m.reply(texto, null, { mentions: parejas.flat() })
    }
}

handler.help = ['matrimonio @user', 'divorcio', 'pareja', 'topparejas']
handler.tags = ['fun']
handler.command = /^(matrimonio|casar|divorcio|separar|pareja|esposo|esposa|topparejas|parejas)$/i
handler.group = true

export default handler