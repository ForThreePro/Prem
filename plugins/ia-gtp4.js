import fetch from 'node-fetch'
let handler = async (m, { conn, text }) => {
  if (!text) return m.reply('⛈️ *RAYO PREM IA* ➔ Escribe tu consulta\n⚡ *Ejemplo:* .gpt4 que es un rayo') // Cambiado
  await m.react('🌩️') // Cambiado
  let key = Buffer.from('c2FzdWtl', 'base64').toString('utf-8')
  let res = await fetch(`https://api.evogb.org/ai/gpt4-session?text=${encodeURIComponent(text)}&session=12&key=${key}`)
  let json = await res.json()
  if (json.status) {
    await m.react('⚡') // Cambiado
    m.reply(`⛈️ *RAYO PREM IA* 🌙\n\n${json.result}\n\n⚡ *Team Nightwish*`) // Cambiado
  } else {
    await m.react('❌')
    m.reply('⛈️ *RAYO PREM ERROR* ➔ No pude conectar con la IA') // Cambiado
  }
}
handler.help = ['gpt4 <texto>']
handler.tags = ['inteligencia artificial']
handler.command = ['gpt4']
export default handler