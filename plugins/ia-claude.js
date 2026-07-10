import fetch from 'node-fetch'
let handler = async (m, { conn, text }) => {
  if (!text) return m.reply('⛈️ *RAYO PREM IA* ➔ Escribe tu consulta para Claude\n⚡ *Ejemplo:* .claude resume este texto') // Cambiado
  await m.react('🌩️') // Cambiado
  let key = Buffer.from('c2FzdWtl', 'base64').toString('utf-8')
  let res = await fetch(`https://api.evogb.org/ai/claude?text=${encodeURIComponent(text)}&key=${key}`)
  let json = await res.json()
  if (json.status) {
    await m.react('⚡') // Cambiado
    m.reply(`⛈️ *RAYO PREM CLAUDE* 🌙\n\n${json.result}\n\n⚡ *Team Nightwish*`) // Cambiado
  } else {
    await m.react('❌')
    m.reply('⛈️ *RAYO PREM ERROR* ➔ Claude no respondió') // Cambiado
  }
}
handler.help = ['claude <texto>']
handler.tags = ['inteligencia artificial']
handler.command = ['claude']
export default handler