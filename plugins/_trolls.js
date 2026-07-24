let handler = async (m, { conn, args, usedPrefix, command }) => {
let who = m.mentionedJid[0]? m.mentionedJid[0] : m.quoted? m.quoted.sender : false
let pp = await conn.profilePictureUrl(who || m.sender, 'image').catch(_ => 'https://i.imgur.com/8KeOaWq.jpg')

// ARRAYS CON 40+ FRASES
const frasesAlma = ['Almas gemelas 💘','Destino total ✨','Match perfecto 🔥','Casense ya xd','Amor a primera vista','Hecho en el cielo','Cupido los flechó','Química nivel Dios','Se huelen desde lejos','Boda en 3,2,1','Se aman y lo niegan','El universo conspiró','Nacieron el uno para el otro','Te encontré','Eran el uno para el otro','Fueron felices y comieron perdices','Shippeados al 100%','Hay feeling','Se ven bonitos juntos','Deberían tener hijos','Pareja del año','Team perfecto','Se complementan','El amor de tu vida','Media naranja','Alma gemela nivel legendario','Match del destino','Se escribieron solos','El amor los encontró','Juntos hasta la muerte','Power couple','La pareja ideal','Dios los cría y el bot los junta','Se buscan desde vidas pasadas','Química explosiva','Amor verdadero','Destino inevitable','Corazones conectados','El uno para el otro','Predestinados']

const frasesMaldicion = ['24h sin stickers 😈','Cambiar nombre a "Soy un bot"','Decir "uwu" x24h','Foto de gato obligatoria','No reaccionar en 24h','Solo mandar audios x1 día','No ver estados x24h','Escribir todo en MAYÚSCULAS','Poner "xd" al final de todo','No poder mandar memes','Perder 100 monedas','Ser funado por el admin','Cambiar foto por la del bot','Mandar "los amo" al grupo','No insultar en 24h','Solo hablar en inglés','Perder tu puesto de admin','Que te roben el crush','Tener mala suerte x3 días','Que te ignoren 24h','No poder salir del grupo','Ser el burro del grupo','Pagar penitencia','Mandar 10 "perdón"','No usar stickers bonitos','Solo mandar notas de voz de 1min','Perder todos tus puntos','Que te hackeen la cuenta xd','Cambiar biografía a "soy noob"','No poder etiquetar','Ser muteado 1h','Darle admin a tu enemigo','Perder 50 de nivel','No ver porno x1 semana','Comer solo arroz 24h','Llamar "papá" al admin','Usar "pro" en todo','No poder cambiar foto','Mandar cadena o te banean','Ser el mandadero del grupo']

const frasesEnemigo = ['Guerra total 💀','Se caen mal xd','Rivales a muerte','Odio puro','No se pueden ni ver','Pelea de gallos','Enemigos naturales','Se tiran hate 24/7','Competencia extrema','Se odian desde la cuna','Rivalidad épica','Agua y aceite','Fuego vs hielo','Gato vs perro','Se sacan los ojos','Pelea de barrio','Enemistad histórica','No hay tregua','Se hacen la guerra','Odio nivel 100','Se caen gordos','No se tragan','Choque de titanes','Pelea de egos','Rivales de leyenda','Se lanzan veneno','Guerra fría','Enemigos por siempre','No hay perdón','Se odian con el alma','Rivalidad mortal','Pelea de pesos pesados','Se desean el mal','Odio mutuo','No se soportan','Pelea de perros','Enemigos declarados','Guerra sin cuartel','Odio eterno','Se matan con la mirada']

const frasesAmigo = ['Hermanos de otra madre 💪','Mejores amigos forever','Amistad nivel Dios','Uñas y mugre','Compas de toda la vida','Team inseparable','Amigos para siempre','La dupla perfecta','Hermanos del alma','Besties certificados','Se cuidan entre ellos','Amistad verdadera','Compinches','Cómplices de todo','Amigos del alma','La amistad lo puede todo','Juntos en las buenas y malas','Amistad de acero','Hermanos de guerra','Mejores compas','Amistad épica','Se tienen la espalda','Amigos de fierro','La amistad más pura','Team ganador','Amigos de verdad','Se quieren mucho','Amistad legendaria','Carnales','Amistad sin límites','Mejores del mundo','Amigos por destino','Se apoyan siempre','Amistad nivel 1000','Compas fieles','Amistad eterna','Los mejores','Amigos de oro','Team soñado','Amistad inquebrantable']

const frasesCrush = ['Tiene crush contigo 😳','Le gustas desde hace tiempo','Te ama en secreto','Piensa en ti 24/7','Le encantas','Te quiere para él/ella','Sueña contigo','Le pareces guapo/a','Le gustas mucho','Te quiere besar','Le atraes un montón','Te adora','Le caes bien bonito','Le gustas desde el día 1','Te quiere de novio/a','Piensa en declararse','Le gustas demasiado','Te ve diferente','Le encanta tu forma de ser','Te quiere conquistar','Le gustas y no lo niega','Te tiene en la mira','Le pareces lindo/a','Te quiere mucho','Le gustas en serio','Te quiere a su lado','Le gustas con locura','Te piensa a cada rato','Le gustas demasiado xd','Te quiere para siempre','Le encantas tú','Te quiere dar amor','Le gustas un montón','Te quiere abrazar','Le pareces especial','Te quiere cuidar','Le gustas de verdad','Te quiere conocer mejor','Le gustas con todo','Te quiere en su vida']

const frasesBendicion = ['Tendrás mucha suerte x24h 🍀','+100 monedas gratis 💰','Encontrarás amor hoy 💘','No te banean en 1 semana 🙏','Te va a ir bien en todo','Vas a ganar la lotería','Tendrás admin pronto','Vas a ligar hoy','Tendrás mucha comida','No te enfermas en 1 mes','Te suben de nivel','Vas a ganar un sorteo','Tendrás paz mental','Te va a escribir tu crush','Vas a ser feliz','Tendrás buen internet','No te va a fallar el bot','Vas a ganar peleas','Tendrás muchas risas','Te va a ir excelente','Vas a progresar mucho','Tendrás buena suerte','Te van a querer más','Vas a tener éxito','Te va a sonreír la vida','Tendrás bendiciones','Vas a estar tranquilo','Te va a llegar dinero','Tendrás salud','Vas a cumplir metas','Te va a ir genial','Tendrás alegría','Vas a estar protegido','Te va a ir bonito','Tendrás prosperidad','Vas a estar bendecido','Te va a ir súper','Tendrás armonía','Vas a estar bien','Te va a ir de lujo']

const frasesEx = ['te dejó por tu amigo','era muy tóxico','no te valoraba','pidió tiempo y nunca volvió','te engañó 3 veces','solo jugaba contigo','te usaba por interés','no estaba listo','se fue con otro','no te merecía','era una red flag','te ghosteó','te dejó en visto','no te quería','solo te entretenía','te mintió mucho','no era para ti','te hizo daño','te trató mal','no te respetaba','era inmaduro','te manipulaba','no te amaba','te dejó sin razón','era una tóxica','no supo valorarte','te cambió por otro','te hizo sufrir','no era leal','te ilusionó','te rompió el corazón','no fue real','te usó y tiró','no te quiso','era falso','te jugó chueco','no te convenía','te dejó tirado','no te cuidó','fue un error']

const frasesFuturo = ['Serás admin del grupo','Tendrás novia en 1 mes','Te harás millonario','Te van a banear xd','Conocerás a tu alma gemela','Vas a viajar','Tendrás 2 hijos','Serás famoso','Vas a comprar carro','Te gradúas pronto','Tendrás éxito','Vas a ser streamer','Te harás youtuber','Tendrás mansión','Vas a ligar mucho','Serás dueño del grupo','Te harás viral','Tendrás negocio','Vas a ser jefe','Te vas a casar','Tendrás perro','Vas a ganar dinero','Serás leyenda','Te harás pro','Tendrás suerte','Vas a triunfar','Serás respetado','Te harás importante','Tendrás fama','Vas a estar bien','Serás feliz','Te irá bien','Tendrás todo','Vas a lograrlo','Serás grande','Te harás rico','Tendrás amor','Vas a destacar','Serás el mejor','Te va a ir de lujo']

const frasesRobo = ['50 monedas 💰','Su dignidad','A su crush','El puesto de admin','Su foto de perfil','Su respeto','Su nivel','Sus puntos','Su novia','Su fama','Su corona','Su trono','Su lugar','Su atención','Sus stickers','Sus memes','Su gracia','Su carisma','Su suerte','Su poder','Su fama en el grupo','Su puesto','Su lugar en el top','Sus privilegios','Su nombre','Su reputación','Sus amigos','Su confianza','Su amor','Su paz','Su tranquilidad','Su tiempo','Sus recursos','Sus beneficios','Su estatus','Su gloria','Su honor','Su orgullo','Sus derechos','Su corona virtual']

const getRandom = arr => arr[Math.floor(Math.random() * arr.length)]

// 1. ALMA GEMELA
if (command == 'almagemela') {
let love = Math.floor(Math.random() * 100) + 1
let txt = `💘 *ALMA GEMELA DETECTADA* 💘

@${m.sender.split('@')[0]} + @${who? who.split('@')[0] : 'alguien'}
*Nivel de conexión:* ${love}%

> ${getRandom(frasesAlma)}

${love > 80? '👉 Boda cuando?' : love > 50? '👉 Hay potencial' : '👉 Mejor como amigos xd'}`
conn.sendFile(m.chat, pp, 'pp.jpg', txt, m, false, { mentions: [m.sender, who].filter(Boolean) })
}

// 2. MALDICION
if (command == 'maldicion') {
if (!who) return conn.reply(m.chat, `Etiqueta a alguien\nEjemplo: ${usedPrefix + command} @tag`, m)
let txt = `🔮 *MALDICIÓN LANZADA* 🔮

@${who.split('@')[0]} ha sido maldecido!

*Castigo:* ${getRandom(frasesMaldicion)}
*Lanzado por:* @${m.sender.split('@')[0]}

Que los dioses te ayuden xd`
conn.sendFile(m.chat, pp, 'pp.jpg', txt, m, false, { mentions: [who, m.sender] })
}

// 3. ENEMIGO
if (command == 'enemigo') {
if (!who) return conn.reply(m.chat, `Etiqueta a tu enemigo`, m)
let odio = Math.floor(Math.random() * 100) + 1
let txt = `⚔️ *ENEMIGO DETECTADO* ⚔️

@${m.sender.split('@')[0]} vs @${who.split('@')[0]}
*Nivel de odio:* ${odio}%

${getRandom(frasesEnemigo)}`
conn.sendFile(m.chat, pp, 'pp.jpg', txt, m, false, { mentions: [who, m.sender] })
}

// 4. MEJOR AMIGO
if (command == 'mejoramigo') {
if (!who) return conn.reply(m.chat, `Etiqueta a tu mejor amigo`, m)
let amistad = Math.floor(Math.random() * 50) + 50
let txt = `👬 *MEJOR AMIGO OFICIAL* 👬

@${who.split('@')[0]} es el mejor amigo de @${m.sender.split('@')[0]}
*Nivel de amistad:* ${amistad}%

${getRandom(frasesAmigo)}`
conn.sendFile(m.chat, pp, 'pp.jpg', txt, m, false, { mentions: [who, m.sender] })
}

// 5. CRUSH
if (command == 'crush') {
if (!who) return conn.reply(m.chat, `Etiqueta a tu crush`, m)
let txt = `💌 *CONFESIÓN ANÓNIMA* 💌

Oe @${who.split('@')[0]}...
@${m.sender.split('@')[0]} ${getRandom(frasesCrush)}`
conn.sendFile(m.chat, pp, 'pp.jpg', txt, m, false, { mentions: [who, m.sender] })
}

// 6. BENDICION
if (command == 'bendicion') {
if (!who) return conn.reply(m.chat, `Etiqueta a quien bendecir`, m)
let txt = `✨ *BENDICIÓN DIVINA* ✨

@${m.sender.split('@')[0]} bendice a @${who.split('@')[0]}

*Beneficio:* ${getRandom(frasesBendicion)}
Aprovéchalo!`
conn.sendFile(m.chat, pp, 'pp.jpg', txt, m, false, { mentions: [who, m.sender] })
}

// 7. EX
if (command == 'ex') {
if (!who) return conn.reply(m.chat, `Etiqueta a alguien`, m)
let toxic = Math.floor(Math.random() * 100) + 1
let txt = `💔 *ANÁLISIS DE EX* 💔

@${who.split('@')[0]} ${getRandom(frasesEx)}
*Nivel de tóxico:* ${toxic}%

Superalo rey/queen`
conn.sendFile(m.chat, pp, 'pp.jpg', txt, m, false, { mentions: [who] })
}

// 8. FUTURO
if (command == 'futuro') {
if (!who) return conn.reply(m.chat, `Etiqueta a alguien`, m)
let txt = `🔮 *PREDICCIÓN DEL FUTURO* 🔮

Para @${who.split('@')[0]}:
En 3 meses: ${getRandom(frasesFuturo)}

Firmado: El Oráculo`
conn.sendFile(m.chat, pp, 'pp.jpg', txt, m, false, { mentions: [who] })
}

// 9. NIVEL AMOR
if (command == 'nivelamor') {
if (m.mentionedJid.length < 2) return conn.reply(m.chat, `Etiqueta a 2 personas`, m)
let love = Math.floor(Math.random() * 100) + 1
let barra = '❤️'.repeat(Math.floor(love/10)) + '🤍'.repeat(10 - Math.floor(love/10))
let txt = `💞 *NIVEL DE AMOR* 💞

@${m.mentionedJid[0].split('@')[0]} + @${m.mentionedJid[1].split('@')[0]}
${barra} ${love}%

${getRandom(frasesAlma)}`
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

${getRandom(['Certificados por la NASA','Aprobado por el doctor','Oficial del grupo','Ballenas detectadas','Peso pesado confirmado'])}`
conn.sendFile(m.chat, pp, 'pp.jpg', txt, m, false, { mentions: participants.map(p => p.id) })
}

// 11. CASAR
if (command == 'casar') {
if (m.mentionedJid.length < 2) return conn.reply(m.chat, `Etiqueta a 2 personas`, m)
let fecha = new Date().toLocaleDateString()
let txt = `💍 *CERTIFICADO DE MATRIMONIO* 💍

Yo, el bot, los declaro:
@${m.mentionedJid[0].split('@')[0]} + @${m.mentionedJid[1].split('@')[0]}

*Marido y Mujer*
*Fecha:* ${fecha}

${getRandom(['Que viva el amor! 🥂','Que Dios los bendiga','Para toda la vida','Que sean felices','Amor eterno'])}`
conn.sendFile(m.chat, pp, 'pp.jpg', txt, m, false, { mentions: m.mentionedJid })
}

// 12. MENTIRA - ARREGLADO
if (command == 'mentira') {
if (!who) return conn.reply(m.chat, `Etiqueta a alguien\nEjemplo: ${usedPrefix + command} @tag`, m)
let porcentaje = Math.floor(Math.random() * 100) + 1
let txt = `🤥 *DETECTOR DE MENTIRAS* 🤥

@${who.split('@')[0]} miente *${porcentaje}%*
${porcentaje > 70? 'No le creas nada 😡' : porcentaje > 40? 'Miente la mitad xd' : 'Es confiable 🙏' }

*3 Mentiras random:*
1. ${getRandom(frasesEx)}
2. ${getRandom(frasesMaldicion)}
3. ${getRandom(frasesFuturo)}

Fuente: Los chismes`
conn.sendFile(m.chat, pp, 'pp.jpg', txt, m, false, { mentions: [who] })
}

// 13. ROBAR
if (command == 'robar') {
if (!who) return conn.reply(m.chat, `Etiqueta a quien robar`, m)
let txt = `😈 *ASALTO EXITOSO* 😈

@${m.sender.split('@')[0]} le robó a @${who.split('@')[0]}

*Objeto robado:* ${getRandom(frasesRobo)}
F en el chat por @${who.split('@')[0]}`
conn.sendFile(m.chat, pp, 'pp.jpg', txt, m, false, { mentions: [who, m.sender] })
}

}
handler.help = ['almagemela','maldicion','enemigo','mejoramigo','crush','bendicion','ex','futuro','nivelamor','topgordo','casar','mentira','robar']
handler.tags = ['troll']
handler.command = /^(almagemela|maldicion|enemigo|mejoramigo|crush|bendicion|ex|futuro|nivelamor|topgordo|casar|mentira|robar)$/i
export default handler