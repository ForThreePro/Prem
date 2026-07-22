let handler = async (m, { conn, command }) => {
  let who = m.mentionedJid && m.mentionedJid[0]
         ? m.mentionedJid[0]
          : m.quoted
         ? m.quoted.sender
          : m.sender;

  let yo = m.sender
  let nameYo = await conn.getName(yo);
  let nameUser = await conn.getName(who);
  let porcentaje = Math.floor(Math.random() * 101);

  if(command == 'love'){
    let frase = porcentaje < 30
     ? '💔 *MEJOR AMIGOS*'
      : porcentaje < 60
     ? '😏 *HAY CHANCE*'
      : porcentaje < 85
     ? '💕 *SE VEN BIEN JUNTOS*'
      : '💍 *CÁSENSE YA*'

    await conn.sendMessage(m.chat, {
      text: `⚡ *CYBER BOT LOVE SCANNER* 💘\n\n🤖 *@${yo.split('@')[0]}* y *@${who.split('@')[0]}* *TIEN* *${porcentaje}%* *DE COMPATIBILIDAD*\n${frase}\n💻 *Cyber Love System*`,
      mentions: [yo, who]
    }, {quoted: m})
  }
}

handler.help = ['love *@user*']
handler.tags = ['love']
handler.command = /^(love)$/i

export default handler