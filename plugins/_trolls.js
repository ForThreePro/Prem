let handler = async (m, { conn, args, usedPrefix, command }) => {
let who = m.mentionedJid[0]? m.mentionedJid[0] : m.quoted? m.quoted.sender : false
let name = await conn.getName(who || m.sender)
let namem = await conn.getName(m.sender)
let pp = await conn.profilePictureUrl(who || m.sender, 'image').catch(_ => 'https://i.imgur.com/8KeOaWq.jpg')

// 1. ALMA GEMELA
if (command == 'almagemela') {
let love = Math.floor(Math.random() * 100) + 1
let frases = ['Almas gemelas 💘','Destino total ✨','Match perfecto 🔥','Casense ya xd','Amor a primera vista']
let frase = frases[Math.floor(Math.random() * frases.length)]
let target = who || m.chat
let txt = `💘 *ALMA GEMELA DETECTADA* 💘

@${m.sender.split('@')[0]} + @${who? who.split('@')[0] : 'alguien'}
*Nivel de conexión:* ${love}%

> ${frase}

${love > 80? '👉 Boda cuando?' : love > 50? '👉 Hay potencial' : '👉 Mejor como amigos xd'}`
conn.sendFile(m.chat, pp, 'pp.jpg', txt, m, false, { mentions: [m.sender, who].filter(Boolean) })
}

// 2. MALDICION
if (command == 'maldicion') {
if (!who) return conn.reply(m.chat, `Etiqueta a alguien ps bro\nEjemplo: ${usedPrefix + command} @tag`, m)
let maldiciones = [
'24h sin poder mandar stickers 😈',
'Cambiar nombre a "Soy un bot" por 1 día',
'No puedes reaccionar con emojis en 24h',
'Tu próxima foto de perfil será de un gato',
'Deberás decir "uwu" al final de cada mensaje x24h'
]
let maldicion = maldiciones[Math.floor(Math.random() * maldiciones.length)]
let txt = `🔮 *MALDICIÓN LANZADA* 🔮

@${who.split('@')[0]} ha sido maldecido!

*Castigo:* ${maldicion}
*Lanzado por:* @${m.sender.split('@')[0]}

Que los dioses te ayuden xd`
conn.sendFile(m.chat, pp, 'pp.jpg', txt, m, false, { mentions: [who, m.sender] })
}

// 3. ENEMIGO
if (command == 'enemigo') {
if (!who) return conn.reply(m.chat, `Etiqueta a tu enemigo\nEjemplo: ${usedPrefix + command} @tag`, m)
let odio = Math.floor(Math.random() * 100) + 1
let txt = `⚔️ *ENEMIGO DETECTADO* ⚔️

@${m.sender.split('@')[0]} vs @${who.split('@')[0]}
*Nivel de odio:* ${odio}%

${odio > 80? 'Guerra total 💀' : odio > 50? 'Se caen mal xd' : 'Se quieren pero lo niegan' }`
conn.sendFile(m.chat, pp, 'pp.jpg', txt, m, false, { mentions: [who, m.sender] })
}

// 4. MEJOR AMIGO
if (command == 'mejoramigo') {
if (!who) return conn.reply(m.chat, `Etiqueta a tu mejor amigo\nEjemplo: ${usedPrefix + command} @tag`, m)
let amistad = Math.floor(Math.random() * 50) + 50
let txt = `👬 *MEJOR AMIGO OFICIAL* 👬

Certifico que @${who.split('@')[0]} es el mejor amigo de @${m.sender.split('@')[0]}
*Nivel de amistad:* ${amistad}%

Hermanos de otra madre 💪`
conn.sendFile(m.chat, pp, 'pp.jpg', txt, m, false, { mentions: [who, m.sender] })
}

// 5. CRUSH
if (command == 'crush') {
if (!who) return conn.reply(m.chat, `Etiqueta a tu crush\nEjemplo: ${usedPrefix + command} @tag`, m)
let txt = `💌 *CONFESIÓN ANÓNIMA* 💌

Oe @${who.split('@')[0]}...
@${m.sender.split('@')[0]} tiene crush contigo desde hace días 😳

Ya ps di que si`
conn.sendFile(m.chat, pp, 'pp.jpg', txt, m, false, { mentions: [who, m.sender] })
}

// 6. BENDICION
if (command == 'bendicion') {
if (!who) return conn.reply(m.chat, `Etiqueta a quien bendecir\nEjemplo: ${usedPrefix + command} @tag`, m)
let bendiciones = ['Tendrás mucha suerte x24h 🍀','+100 monedas gratis 💰','Encontrarás amor hoy 💘','No te banean en 1 semana 🙏']
let bendicion = bendiciones[Math.floor(Math.random() * bendiciones.length)]
let txt = `✨ *BENDICIÓN DIVINA* ✨

@${m.sender.split('@')[0]} bendice a @${who.split('@')[0]}

*Beneficio:* ${bendicion}
Aprovéchalo!`
conn.sendFile(m.chat, pp, 'pp.jpg', txt, m, false, { mentions: [who, m.sender] })
}

// 7. EX
if (command == 'ex') {
if (!who) return conn.reply(m.chat, `Etiqueta a alguien\nEjemplo: ${usedPrefix + command} @tag`, m)
let nombres = ['Karen','Brayan','Jennifer','Kevin','Yoselin']
let razones = ['te dejó por tu amigo','era muy tóxico','no te valoraba','pidió tiempo y nunca volvió']
let nombre = nombres[Math.floor(Math.random() * nombres.length)]
let razon = razones[Math.floor(Math.random() * razones.length)]
let toxic = Math.floor(Math.random() * 100) + 1
let txt = `💔 *ANÁLISIS DE EX* 💔

Nombre: ${nombre}
Razón: ${razon}
*Nivel de tóxico:* ${toxic}%

@${who.split('@')[0]} superalo rey/queen`
conn.sendFile(m.chat, pp, 'pp.jpg', txt, m, false, { mentions: [who] })
}

// 8. FUTURO
if (command == 'futuro') {
if (!who) return conn.reply(m.chat, `Etiqueta a alguien\nEjemplo: ${usedPrefix + command} @tag`, m)
let futuros = ['Serás admin del grupo','Tendrás novia en 1 mes','Te harás millonario','Te van a dar baneado xd','Conocerás a tu alma gemela']
let futuro = futuros[Math.floor(Math.random() * futuros.length)]
let txt = `🔮 *PREDICCIÓN DEL FUTURO* 🔮

Para @${who.split('@')[0]}:
En 3 meses: ${futuro}

Firmado: El Oráculo`
conn.sendFile(m.chat, pp, 'pp.jpg', txt, m, false, { mentions: [who] })
}

// 9. NIVEL AMOR
if (command == 'nivelamor') {
if (m.mentionedJid.length < 2) return conn.reply(m.chat, `Etiqueta a 2 personas\nEjemplo: ${usedPrefix + command} @tag1 @tag2`, m)
let love = Math.floor(Math.random() * 100) + 1
let barra = '❤️'.repeat(Math.floor(love/10)) + '🤍'.repeat(10 - Math.floor(love/10))
let txt = `💞 *NIVEL DE AMOR* 💞

@${m.mentionedJid[0].split('@')[0]} + @${m.mentionedJid[1].split('@')[0]}
${barra} ${love}%

${love > 80? 'Boda ya!' : love > 50? 'Hay química' : 'Frienzzone' }`
conn.sendFile(m.chat, pp, 'pp.jpg', txt, m, false, { mentions: m.mentionedJid })
}

// 10. TOP GORDO
if (command == 'topgordo') {
let metadata = m.isGroup? await conn.groupMetadata(m.chat) : false
let participants = metadata? metadata.participants : [{id: m.sender}]
let top = []
for(let i=0; i<3; i++){
let random = participants[Math.floor(Math.random() * participants.length)]
let gordo = Math.floor(Math.random() * 100) + 1
top.push(`${i+1}. @${random.id.split('@')[0]} - ${gordo}% 🐋`)
}
let txt = `🏆 *TOP 3 GORDITOS DEL GRUPO* 🏆

${top.join('\n')}

Certificados por la NASA`
conn.sendFile(m.chat, pp, 'pp.jpg', txt, m, false, { mentions: participants.map(p => p.id) })
}

// 11. CASAR
if (command == 'casar') {
if (m.mentionedJid.length < 2) return conn.reply(m.chat, `Etiqueta a 2 personas\nEjemplo: ${usedPrefix + command} @tag1 @tag2`, m)
let fecha = new Date().toLocaleDateString()
let txt = `💍 *CERTIFICADO DE MATRIMONIO* 💍

Yo, el bot, los declaro:
@${m.mentionedJid[0].split('@')[0]} + @${m.mentionedJid[1].split('@')[0]}

*Marido y Mujer*
*Fecha:* ${fecha}

Que viva el amor! 🥂`
conn.sendFile(m.chat, pp, 'pp.jpg', txt, m, false, { mentions: m.mentionedJid })
}

// 12. MENTIRA
if (command == 'mentira') {
if (!who) return conn.reply(m.chat, `Etiqueta a alguien\nEjemplo: ${usedPrefix + command} @tag`, m)
let mentiras = [
`Le debe dinero a medio grupo`,
`Tiene 2 celulares y 1 novia secreta`,
`Se hace el admin pero no lo es`,
`Mira tus estados con otra cuenta`,
`Dice que tiene 18 pero tiene 30`
]
let txt = `🤥 *3 MENTIRAS SOBRE @${who.split('@')[0]}* 🤥

1. ${mentiras[Math.floor(Math.random() * mentiras.length)]}
2. ${mentiras[Math.floor(Math.random() * mentiras.length)]}
3. ${mentiras[Math.floor(Math.random() * mentiras.length)]}

Fuente: Los chismes`
conn.sendFile(m.chat, pp, 'pp.jpg', txt, m, false, { mentions: [who] })
}

// 13. ROBAR
if (command == 'robar') {
if (!who) return conn.reply(m.chat, `Etiqueta a quien robar\nEjemplo: ${usedPrefix + command} @tag`, m)
let robos = ['50 monedas 💰','Su dignidad','A su crush','El puesto de admin','Su foto de perfil']
let robo = robos[Math.floor(Math.random() * robos.length)]
let txt = `😈 *ASALTO EXITOSO* 😈

@${m.sender.split('@')[0]} le robó a @${who.split('@')[0]}

*Objeto robado:* ${robo}
F en el chat por @${who.split('@')[0]}`
conn.sendFile(m.chat, pp, 'pp.jpg', txt, m, false, { mentions: [who, m.sender] })
}

}
handler.help = ['almagemela','maldicion','enemigo','mejoramigo','crush','bendicion','ex','futuro','nivelamor','topgordo','casar','mentira','robar']
handler.tags = ['troll']
handler.command = /^(almagemela|maldicion|enemigo|mejoramigo|crush|bendicion|ex|futuro|nivelamor|topgordo|casar|mentira|robar)$/i
export default handler