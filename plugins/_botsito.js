import fetch from 'node-fetch'

let handler = m => m // esto es clave

handler.all = async function (m, { conn }) {
let chat = global.db.data.chats[m.chat] = global.db.data.chats[m.chat] || {}
chat.memoria = chat.memoria || []

// COMANDOS
if (m.text == '.iaon') {
chat.ia = true
chat.memoria = []
return conn.reply(m.chat, `🧠 *CYBER IA GRATIS ACTIVADO*\n\nYa háblame normal`, m)
}
if (m.text == '.iaoff') {
chat.ia = false
return conn.reply(m.chat, `❌ *MODO IA DESACTIVADO*`, m)
}
if (m.text == '.borrarmemoria') {
chat.memoria = []
return conn.reply(m.chat, `🗑️ *MEMORIA BORRADA*`, m)
}

// SI LA IA ESTA ACTIVA, RESPONDE A TODO
if (!chat.ia) return
if (m.isBaileys || m.fromMe || !m.text) return

let nombre = await conn.getName(m.sender)
chat.memoria.push(`Usuario ${nombre}: ${m.text}`)
let historial = chat.memoria.slice(-6).join('\n')

let prompt = `Eres Cyber, bot de Perú. Divertido, troll, usas emojis. Max 3 líneas.
Historial:
${historial}
Cyber:`

try {
await conn.sendPresenceUpdate('composing', m.chat)
let res = await fetch('https://api.together.xyz/v1/completions', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({
model: "meta-llama/Llama-3-8b-chat-hf",
prompt: prompt,
max_tokens: 200,
temperature: 0.8,
stop: ["Usuario"]
})
let json = await res.json()
let respuesta = json.choices[0].text.trim()

chat.memoria.push(`Cyber: ${respuesta}`)
await conn.reply(m.chat, `🤖 *Cyber IA*\n\n${respuesta}`, m)

} catch (e) {
console.log(e)
}
}
export default handler