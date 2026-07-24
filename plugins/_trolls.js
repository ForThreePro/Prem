let handler = async (m, { conn, args, usedPrefix, command }) => {
let who = m.mentionedJid[0]? m.mentionedJid[0] : m.quoted? m.quoted.sender : false
let name = await conn.getName(who || m.sender)
let namem = await conn.getName(m.sender)
let pp = await conn.profilePictureUrl(who || m.sender, 'image').catch(_ => 'https://i.imgur.com/8KeOaWq.jpg')

// 1. ALMA GEMELA
if (command == 'almagemela') {
let love = Math.floor(Math.random() * 100) + 1
let frases = ['Almas gemelas 💘','Destino total ✨','Match perfecto 🔥','Casense ya xd']
let frase = frases[Math.floor(Math.random() * frases.length)]
let txt = `💘 *ALMA GEMELA DETECTADA* 💘

@${m.sender.split('@')[0]} + @${who? who.split('@')[0] : 'alguien'}
*Nivel de conexión:* ${love}%

> ${frase}`
conn.sendFile(m.chat, pp, 'pp.jpg', txt, m, false, { mentions: [m.sender, who].filter(Boolean) })
}

// 2. MALDICION
if (command == 'maldicion') {
if (!who) return conn.reply(m.chat, `Etiqueta a alguien\nEjemplo: ${usedPrefix + command} @tag`, m)
let maldiciones = ['24h sin stickers 😈','Cambiar nombre a "Soy un bot"','Decir "uwu" x24h','Foto de gato obligatoria']
let maldicion = maldiciones[Math.floor(Math.random() * maldiciones.length)]
let txt = `🔮 *MALDICIÓN LANZADA* 🔮

@${who.split('@')[0]} ha sido maldecido!

*Castigo:* ${maldicion}
*Lanzado por:* @${m.sender.split('@')[0]}`
conn.sendFile(m.chat, pp, 'pp.jpg', txt, m, false, { mentions: [who, m.sender] })
}

// 3. ENEMIGO
if (command == 'enemigo') {
if (!who) return conn.reply(m.chat, `Etiqueta a tu enemigo`, m)
let odio = Math.floor(Math.random() * 100) + 1
let txt = `⚔️ *ENEMIGO DETECTADO* ⚔️

@${m.sender.split('@')[0]} vs @${who.split('@')[0]}
*Nivel de odio:* ${odio}%`
conn.sendFile(m.chat, pp, 'pp.jpg', txt, m, false, { mentions: [who, m.sender] })
}

// 4. MEJOR AMIGO
if (command == 'mejoramigo') {
if (!who) return conn.reply(m.chat, `Etiqueta a tu mejor amigo`, m)
let amistad = Math.floor(Math.random() * 50) + 50
let txt = `👬 *MEJOR AMIGO OFICIAL* 👬

@${who.split('@')[0]} es el mejor amigo de @${m.sender.split('@')[0]}
*Nivel:* ${amistad}%`
conn.sendFile(m.chat, pp, 'pp.jpg', txt, m, false, { mentions: [who, m.sender] })
}

// 5. CRUSH
if (command == 'crush') {
if (!who) return conn.reply(m.chat, `Etiqueta a tu crush`, m)
let txt = `💌 *CONFESIÓN* 💌

@${who.split('@')[0]}...
@${m.sender.split('@')[0]} tiene crush contigo 😳`
conn.sendFile(m.chat, pp, 'pp.jpg', txt, m, false, { mentions: [who, m.sender] })
}

// 6. BENDICION
if (command == 'bendicion') {
if (!who) return conn.reply(m.chat, `Etiqueta a quien bendecir`, m)
let bendiciones = ['Suerte x24h 🍀','+100 monedas 💰','Encontrarás amor 💘']
let bendicion = bendiciones[Math.floor(Math.random() * bendiciones.length)]
let txt = `✨ *BENDICIÓN* ✨

@${m.sender.split('@')[0]} bendice a @${who.split('@')[0]}
*Beneficio:* ${bendicion}`
conn.sendFile(m.chat, pp, 'pp.jpg', txt, m, false, { mentions: [who, m.sender] })
}

// 7. EX
if (command == 'ex') {
if (!who) return conn.reply(m.chat, `Etiqueta a alguien`, m)
let txt = `💔 *ANÁLISIS DE EX* 💔

Nombre: Karen
Razón: te dejó por tu amigo
*Nivel tóxico:* ${Math.floor(Math.random() * 100)}%
@${who.split('@')[0]} superalo`
conn.sendFile(m.chat, pp, 'pp.jpg', txt, m, false, { mentions: [who] })
}

// 8. FUTURO
if (command == 'futuro') {
if (!who) return conn.reply(m.chat, `Etiqueta a alguien`, m)
let futuros = ['Serás admin','Tendrás novia','Te harás millonario']
let txt = `🔮 *FUTURO* 🔮

@${who.split('@')[0]}: ${futuros[Math.floor(Math.random() * futuros.length)]}`
conn.sendFile(m.chat, pp, 'pp.jpg', txt, m, false, { mentions: [who] })
}

// 9. NIVEL AMOR
if (command == 'nivelamor') {
if (m.mentionedJid.length < 2) return conn.reply(m.chat, `Etiqueta a 2 personas`, m)
let love = Math.floor(Math.random() * 100) + 1
let txt = `💞 *NIVEL DE AMOR* 💞

@${m.mentionedJid[0].split('@')[0]} + @${m.mentionedJid[1].split('@')[0]}
${love}%`
conn.sendFile(m.chat, pp, 'pp.jpg', txt, m, false, { mentions: m.mentionedJid })
}

}
handler.help = ['almagemela','maldicion','enemigo','mejoramigo','crush','bendicion','ex','futuro','nivelamor']
handler.tags = ['troll']
handler.command = /^(almagemela|maldicion|enemigo|mejoramigo|crush|bendicion|ex|futuro|nivelamor)$/i
export default handler