let handler = async (m, { conn, command }) => {
    if(!m.isGroup) return m.reply('Solo funciona en grupos')

    let who = m.mentionedJid[0]? m.mentionedJid[0] : m.quoted? m.quoted.sender : m.sender
    let users = m.metadata.participants.map(u => u.id)
    let porcentaje = Math.floor(Math.random() * 101)
    let mention = [who]

    const BOX_TOP = `╭─「 😈 *JODA & JUEGOS* 」`
    const BOX_MID = `│`
    const BOX_BOT = `╰─────────────────`

    const frasesDuo = ["Somos el duo perfecto 😎","Juntos somos un peligro ⚠️","El duo que rompe grupos 💥","Duo de chisme nivel dios ☕","Dinamita pura 🧨","El mejor duo del server 👑"]
    const frasesBro = ['"Oe mano pásame 5 soles"','"Ya pe no seas malo"','"Después te pago juro"','"Invítame una gaseosa"']
    const frasesPerro = ['Te dice "amor" y a 3 más también','Huele a cuernos','Te deja en visto','Sube historias sin ti']

    function getRandomUsers(cantidad) {
        let shuffled = users.sort(() => 0.5 - Math.random())
        return shuffled.slice(0, cantidad)
    }

    let txt = ''

    switch(command) {
        // ========== FLIRT ==========
        case 'miamor': case 'mi amor':
            txt = `${BOX_TOP}\n${BOX_MID} 💕 *@${who.split('@')[0]} ES MI AMOR* 💕\n${BOX_MID}\n${BOX_MID} Te amo ${porcentaje}%\n${BOX_MID} Aunque seas tóxico/a\n${BOX_BOT}`
            break
        case 'mibebito':
            txt = `${BOX_TOP}\n${BOX_MID} 🍼 *FIU FIU* 🍼\n${BOX_MID}\n${BOX_MID} *@${who.split('@')[0]} MI BEBITO/A* 😏\n${BOX_MID} Nivel: ${porcentaje}%\n${BOX_MID} Pásame tu número\n${BOX_BOT}`
            break
        case 'bratz':
            txt = `${BOX_TOP}\n${BOX_MID} 💄 *@${who.split('@')[0]} ES BRATZ* 💄\n${BOX_MID}\n${BOX_MID} Nivel: ${porcentaje}%\n${BOX_MID} Muñeca malcriada\n${BOX_BOT}`
            break
        case 'bellaka':
            txt = `${BOX_TOP}\n${BOX_MID} 💃 *BELLAKA* 💃\n${BOX_MID}\n${BOX_MID} @${who.split('@')[0]}\n${BOX_MID} Perrea hasta el suelo\n${BOX_MID} Perreo: ${porcentaje}%\n${BOX_BOT}`
            break

        // ========== TROLO ==========
        case 'brother':
            txt = `${BOX_TOP}\n${BOX_MID} 👬 *FRASE PITUFO* 👬\n${BOX_MID}\n${BOX_MID} @${who.split('@')[0]} dice:\n${BOX_MID} ${frasesBro[Math.floor(Math.random()*4)]}\n${BOX_BOT}`
            break
        case 'perroinfiel': case 'perro infiel':
            txt = `${BOX_TOP}\n${BOX_MID} 🐕 *PERRO INFIEL* 🐕\n${BOX_MID}\n${BOX_MID} @${who.split('@')[0]}\n${BOX_MID} ${frasesPerro[Math.floor(Math.random()*4)]}\n${BOX_MID} Nivel: ${porcentaje}%\n${BOX_BOT}`
            break
        case 'mentiroso': case 'mentiras':
            txt = `${BOX_TOP}\n${BOX_MID} 🤥 *@${who.split('@')[0]} ES MENTIROSO* 🤥\n${BOX_MID}\n${BOX_MID} "Te lo juro por mi mamá"\n${BOX_MID} Nivel: ${porcentaje}%\n${BOX_BOT}`
            break

        // ========== GRUPALES ==========
        case '2p2':
            if(users.length < 4) return m.reply('Mínimo 4 personas en el grupo')
            let cuatro = getRandomUsers(4)
            mention = cuatro
            txt = `${BOX_TOP}\n${BOX_MID} 2️⃣ *2P2* 2️⃣\n${BOX_MID}\n${BOX_MID} Pareja 1: @${cuatro[0].split('@')[0]} ❤️ @${cuatro[1].split('@')[0]}\n${BOX_MID} Pareja 2: @${cuatro[2].split('@')[0]} ❤️ @${cuatro[3].split('@')[0]}\n${BOX_MID}\n${BOX_MID} Compatibilidad: ${porcentaje}%\n${BOX_BOT}`
            break
        case '3p3':
            if(users.length < 6) return m.reply('Mínimo 6 personas en el grupo')
            let seis = getRandomUsers(6)
            mention = seis
            txt = `${BOX_TOP}\n${BOX_MID} 3️⃣ *3P3* 3️⃣\n${BOX_MID}\n${BOX_MID} P1: @${seis[0].split('@')[0]} ❤️ @${seis[1].split('@')[0]}\n${BOX_MID} P2: @${seis[2].split('@')[0]} ❤️ @${seis[3].split('@')[0]}\n${BOX_MID} P3: @${seis[4].split('@')[0]} ❤️ @${seis[5].split('@')[0]}\n${BOX_MID}\n${BOX_MID} Compatibilidad: ${porcentaje}%\n${BOX_BOT}`
            break
        case 'duo':
            if(users.length < 2) return m.reply('Mínimo 2 personas en el grupo')
            let dos = getRandomUsers(2)
            mention = dos
            let frase = frasesDuo[Math.floor(Math.random() * frasesDuo.length)]
            txt = `${BOX_TOP}\n${BOX_MID} 👯 *DUO RANDOM* 👯\n${BOX_MID}\n${BOX_MID} @${dos[0].split('@')[0]} + @${dos[1].split('@')[0]}\n${BOX_MID}\n${BOX_MID} ${frase}\n${BOX_MID}\n${BOX_MID} Compatibilidad: ${porcentaje}%\n${BOX_BOT}`
            break
    }

    if(txt) await conn.reply(m.chat, txt, m, { mentions: mention })
}

handler.help = ['miamor','mibebito','bratz','bellaka','brother','perroinfiel','perro infiel','mentiroso','mentiras','2p2','3p3','duo']
handler.tags = ['joda']
handler.command = /^(miamor|mi amor|mibebito|bratz|bellaka|brother|perroinfiel|perro infiel|mentiroso|mentiras|2p2|3p3|duo)$/i
handler.group = true
export default handler