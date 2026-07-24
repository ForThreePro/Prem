import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command }) => {
let chat = global.db.data.chats[m.chat]
chat.memoria = chat.memoria || []

if (command == 'iaon') {
chat.ia = true
chat.memoria = []
return conn.reply(m.chat, `🧠 *CYBER IA GRATIS ACTIVADO*

Sin clave y con memoria 😈
Me acuerdo de las últimas 6 conversaciones

Comandos:
${usedPrefix}iaoff = desactivar
${usedPrefix}borrarmemoria = borrar memoria`, m)
}

if (command == 'iaoff') {
chat.ia = false
return conn.reply(m.chat, `❌ *MODO IA DESACTIVADO*`, m)
}

if (command == 'borrarmemoria') {
chat.memoria = []
return conn.reply(m.chat, `🗑️ *MEMORIA BORRADA* Ya me olvidé xd`, m)
}
}

handler.before = async function (m, { conn }) {
let chat = global.db.data.chats[m.chat]
if (!chat.ia) return true
if (m.isBaileys) return
if (m.fromMe) return
if (!m.text) return

let nombre = await conn.getName(m.sender)
chat.memoria = chat.memoria || []

// 1. GUARDAMOS LO QUE DIJO EL USUARIO
chat.memoria.push(`Usuario ${nombre}: ${m.text}`)

// 2. ARMAMOS EL HISTORIAL - solo 6 mensajes para que sea rápido
let historial = chat.memoria.slice(-6).join('\n')

let prompt = `Eres Cyber, un bot de WhatsApp de Perú. Hablas divertido, troll, usas emojis y respondes corto max 3 líneas.
Tienes memoria de la conversación.

Historial:
${historial}

Cyber:`

try {
await conn.sendPresenceUpdate('composing', m.chat) // muestra "escribiendo..."

let res = await fetch('https://api.together.xyz/v1/completions', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({
model: "meta-llama/Llama-3-8b-chat-hf", // IA de Meta gratis
prompt: prompt,
max_tokens: 250, // max de palabras de respuesta
temperature: 0.8, // creatividad. 0=serio, 1=muy loco
stop: ["Usuario", "Cyber:"] // para que no siga escribiendo
})
})

let json = await res.json()
let respuesta = json.choices[0].text.trim()

// 3. GUARDAMOS LO QUE RESPONDIÓ EL BOT
chat.memoria.push(`Cyber: ${respuesta}`)

await conn.reply(m.chat, `🤖 *Cyber IA*\n\n${respuesta}`, m)

} catch (e) {
console.log(e)
await conn.reply(m.chat, `Se me cayó el internet xd Intenta en 5 seg`, m)
}
return false
}

handler.help = ['iaon','iaoff','borrarmemoria']
handler.tags = ['ia']
handler.command = /^(iaon|iaoff|borrarmemoria)$/i

export default handler