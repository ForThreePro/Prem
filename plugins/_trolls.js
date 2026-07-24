import fetch from 'node-fetch'
let toM = a => '@' + a.split('@')[0]
let handler = async (m, { conn, text, usedPrefix, command }) => {
let who = m.mentionedJid[0]? m.mentionedJid[0] : m.quoted? m.quoted.sender : text? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : false
let pp = await conn.profilePictureUrl(who || m.sender, 'image').catch(_ => 'https://telegra.ph/file/24fa902ead26340f49c2d.jpg')
let name = conn.getName(who || m.sender)
let namem = conn.getName(m.sender)

// PLANTILLA
let img = 'https://telegra.ph/file/24fa902ead26340f49c2d.jpg'
let btn = [['Menu Troll', `${usedPrefix}menu`]]

// 1. ALMA GEMELA
if (command == 'almagemela') {
let users = [...new Set([...(m.mentionedJid || []),...(m.quoted? [m.quoted.sender] : [])])].filter(u => u!= m.sender)
let partner = users[0] || m.chat.members[Math.floor(Math.random() * m.chat.members.length)]
let love = Math.floor(Math.random() * 100) + 1
let frases = ['Almas gemelas 💘','Destino total ✨','Match perfecto 🔥','Casense ya xd','Amor a primera vista']
let frase = frases[Math.floor(Math.random() * frases.length)]
let txt = `💘 *ALMA GEMELA DETECTADA* 💘

${toM(m.sender)} + ${toM(partner)}
*Nivel de conexión:* ${love}%

> ${frase}

${love > 80? '👉 Boda cuando?' : love > 50? '👉 Hay potencial' : '👉 Mejor como amigos xd'}`
await conn.sendMessage(m.chat, { image: { url: pp }, caption: txt, mentions: [m.sender, partner], buttons: btn, footer: 'Troll Pro V1.0' }, { quoted: m })
}

// 2. MALDICION
if (command == 'maldicion') {
if (!who) return m.reply(`Etiqueta a alguien ps bro\nEjemplo: ${usedPrefix + command} @tag`)
let maldiciones = [
'24h sin poder mandar stickers 😈',
'Cambiar nombre a "Soy un bot" por 1 día',
'No puedes reaccionar con emojis en 24h',
'Tu próxima foto de perfil será de un gato',
'Deberás decir "uwu" al final de cada mensaje x24h'
]
let maldicion = maldiciones[Math.floor(Math.random() * maldiciones.length)]
let txt = `🔮 *MALDICIÓN LANZADA* 🔮

${toM(who)} ha sido maldecido!

*Castigo:* ${maldicion}
*Lanzado por:* ${toM(m.sender)}

Que los dioses te ayuden xd`
await conn.sendMessage(m.chat, { image: { url: pp }, caption: txt, mentions: [who, m.sender], buttons: btn, footer: 'Troll Pro V1.0' }, { quoted: m })
}

// 3. ENEMIGO
if (command == 'enemigo') {
if (!who) return m.reply(`Etiqueta a tu enemigo\nEjemplo: ${usedPrefix + command} @tag`)
let odio = Math.floor(Math.random() * 100) + 1
let txt = `⚔️ *ENEMIGO DETECTADO* ⚔️

${toM(m.sender)} vs ${toM(who)}
*Nivel de odio:* ${odio}%

${odio > 80? 'Guerra total 💀' : odio > 50? 'Se caen mal xd' : 'Se quieren pero lo niegan' }`
await conn.sendMessage(m.chat, { image: { url: pp }, caption: txt, mentions: [who, m.sender], buttons: btn, footer: 'Troll Pro V1.0' }, { quoted: m })
}

// 4. MEJOR AMIGO
if (command == 'mejoramigo') {
if (!who) return m.reply(`Etiqueta a tu mejor amigo\nEjemplo: ${usedPrefix + command} @tag`)
let amistad = Math.floor(Math.random() * 50) + 50
let txt = `👬 *MEJOR AMIGO OFICIAL* 👬

Certifico que ${toM(who)} es el mejor amigo de ${toM(m.sender)}
*Nivel de amistad:* ${amistad}%

Hermanos de otra madre 💪`
await conn.sendMessage(m.chat, { image: { url: pp }, caption: txt, mentions: [who, m.sender], buttons: btn, footer: 'Troll Pro V1.0' }, { quoted: m })
}

// 5. CRUSH
if (command == 'crush') {
if (!who) return m.reply(`Etiqueta a tu crush\nEjemplo: ${usedPrefix + command} @tag`)
let txt = `💌 *CONFESIÓN ANÓNIMA* 💌

Oe ${toM(who)}...
${toM(m.sender)} tiene crush contigo desde hace días 😳

Ya ps di que si`
await conn.sendMessage(m.chat, { image: { url: pp }, caption: txt, mentions: [who, m.sender], buttons: btn, footer: 'Troll Pro V1.0' }, { quoted: m })
}

// 6. BENDICION
if (command == 'bendicion') {
if (!who) return m.reply(`Etiqueta a quien bendecir\nEjemplo: ${usedPrefix + command} @tag`)
let bendiciones = ['Tendrás mucha suerte x24h 🍀','+100 monedas gratis 💰','Encontrarás amor hoy 💘','No te banean en 1 semana 🙏']
let bendicion = bendiciones[Math.floor(Math.random() * bendiciones.length)]
let txt = `✨ *BENDICIÓN DIVINA* ✨

${toM(m.sender)} bendice a ${toM(who)}

*Beneficio:* ${bendicion}
Aprovéchalo!`
await conn.sendMessage(m.chat, { image: { url: pp }, caption: txt, mentions: [who, m.sender], buttons: btn, footer: 'Troll Pro V1.0' }, { quoted: m })
}

// 7. EX
if (command == 'ex') {
if (!who) return m.reply(`Etiqueta a alguien\nEjemplo: ${usedPrefix + command} @tag`)
let nombres = ['Karen','Brayan','Jennifer','Kevin','Yoselin']
let razones = ['te dejó por tu amigo','era muy tóxico','no te valoraba','pidió tiempo y nunca volvió']
let nombre = nombres[Math.floor(Math.random() * nombres.length)]
let razon = razones[Math.floor(Math.random() * razones.length)]
let toxic = Math.floor(Math.random() * 100) + 1
let txt = `💔 *ANÁLISIS DE EX* 💔

Nombre: ${nombre}
Razón: ${razon}
*Nivel de tóxico:* ${toxic}%

${toM(who)} superalo rey/queen`
await conn.sendMessage(m.chat, { image: { url: pp }, caption: txt, mentions: [who], buttons: btn, footer: 'Troll Pro V1.0' }, { quoted: m })
}

// 8. FUTURO
if (command == 'futuro') {
if (!who) return m.reply(`Etiqueta a alguien\nEjemplo: ${usedPrefix + command} @tag`)
let futuros = ['Serás admin del grupo','Tendrás novia en 1 mes','Te harás millonario','Te van a dar baneado xd','Conocerás a tu alma gemela']
let futuro = futuros[Math.floor(Math.random() * futuros.length)]
let txt = `🔮 *PREDICCIÓN DEL FUTURO* 🔮

Para ${toM(who)}:
En 3 meses: ${futuro}

Firmado: El Oráculo`
await conn.sendMessage(m.chat, { image: { url: pp }, caption: txt, mentions: [who], buttons: btn, footer: 'Troll Pro V1.0' }, { quoted: m })
}

// 9. NIVEL AMOR
if (command == 'nivelamor') {
let users = [...new Set([...(m.mentionedJid || [])])].filter(u => u!= m.sender)
if (users.length < 2) return m.reply(`Etiqueta a 2 personas\nEjemplo: ${usedPrefix + command} @tag1 @tag2`)
let love = Math.floor(Math.random() * 100) + 1
let barra = '❤️'.repeat(Math.floor(love/10)) + '🤍'.repeat(10 - Math.floor(love/10))
let txt = `💞 *NIVEL DE AMOR* 💞

${toM(users[0])} + ${toM(users[1])}
${barra} ${love}%

${love > 80? 'Boda ya!' : love > 50? 'Hay química' : 'Frienzzone' }`
await conn.sendMessage(m.chat, { image: { url: pp }, caption: txt, mentions: users, buttons: btn, footer: 'Troll Pro V1.0' }, { quoted: m })
}

}
handler.help = ['almagemela','maldicion','enemigo','mejoramigo','crush','bendicion','ex','futuro','nivelamor']
handler.tags = ['troll']
handler.command = /^(almagemela|maldicion|enemigo|mejoramigo|crush|bendicion|ex|futuro|nivelamor)$/i
export default handler