let handler = async (m, { conn, isOwner }) => {
if (!isOwner) return m.reply(`❌ Solo el Owner`)
    
let mensajeFijo = `╭━━━━━━━━━━━━━━━━━━╮
   🤖 *VENTA DE BOTS WHATSAPP* 🤖
╰━━━━━━━━━━━━━━━━━━╯

¿Quieres tu propio BOT con juegos, descargas y admin? 👀

*✨ LO QUE INCLUYE TU BOT:*
✅ Juegos: Ahorcado, Ruleta, Slot, 8ball
✅ Descargas: TikTok, YT, Facebook 
✅ Admin: Kick, Ban, Bienvenida, Antilink
✅ Diversión: Chistes, Frases, Memes, Verdad/Reto
✅ 100% Personalizable + Soporte 24/7

*🚀 ACTIVA TU BOT YA*

📲 *GRUPO OFICIAL:*
https://chat.whatsapp.com/LjPhgjqCM934QEzYz3vrVk

*Precio accesible* 💰 Escríbeme al DM
#BotWhatsApp #Ventas`

let grupos = Object.keys(conn.chats).filter(jid => jid.endsWith('@g.us'))
if(grupos.length == 0) return m.reply(`No estoy en ningún grupo`)

await m.reply(`📢 Enviando a ${grupos.length} grupos...`)

let enviados = 0
for (let jid of grupos) {
try {
await conn.sendMessage(jid, { text: mensajeFijo })
enviados++
await new Promise(r => setTimeout(r, 2000))
} catch(e) { console.log(e) }
}

m.reply(`✅ Terminado. Enviado a ${enviados}/${grupos.length} grupos`)
}
handler.command = ['bc', 'broadcast']
handler.owner = true
export default handler