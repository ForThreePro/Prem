let frasesAmor = [
  "Ustedes 2 tienen química de café con pan a las 10pm ❤️",
  "Si el amor fuera wifi, ustedes tendrían señal completa 💘",
  "Destino dijo: tú + tú = problemas bonitos 😏",
  "Cuidado, cupido acaba de marcar territorio aquí 💌",
  "Pareja oficial de robarse la última galleta 🍪💕",
  "El universo los juntó porque juntos son un caos lindo",
  "Modo dúo desbloqueado: complicidad nivel 100%",
  "Si esto fuera telenovela, ya habría beso con lluvia"
]

let handler = async (m, { conn, groupMetadata }) => {
  let participantes = groupMetadata.participants.map(p => p.id)

  if (participantes.length < 10) {
    return m.reply('Necesito mínimo 10 personas en el grupo para sacar 5 parejas 😅')
  }

  // Mezclar y sacar 10 personas random
  let mezclados = participantes.sort(() => Math.random() - 0.5)
  let seleccionados = mezclados.slice(0, 10)

  // Formar 5 parejas
  let parejas = []
  for (let i = 0; i < seleccionados.length; i += 2) {
    parejas.push([seleccionados[i], seleccionados[i+1]])
  }

  // Armar el mensaje
  let texto = `💞 *FORMANDO 5 PAREJAS RANDOM* 💞\n\n`

  for (let i = 0; i < parejas.length; i++) {
    let [p1, p2] = parejas[i]
    let frase = frasesAmor[Math.floor(Math.random() * frasesAmor.length)]

    texto += `*Pareja ${i+1}*\n`
    texto += `👉 @${p1.split('@')[0]} + @${p2.split('@')[0]}\n`
    texto += `_${frase}_\n\n`
  }

  texto += `Que el amor los acompañe... o el chisme 😂`

  await conn.sendMessage(m.chat, {
    text: texto,
    mentions: seleccionados
  }, { quoted: m })
}

handler.help = ['formarpareja']
handler.tags = ['love']
handler.command = /^(formarpareja|parejas)$/i
handler.group = true

export default handler