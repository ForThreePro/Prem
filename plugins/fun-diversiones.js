let handler = async (m, { conn, command, text }) => {
  let who = m.mentionedJid && m.mentionedJid[0]? m.mentionedJid[0]
          : m.quoted? m.quoted.sender
          : m.sender;

  let name = await conn.getName(who);
  let userTarget = m.mentionedJid && m.mentionedJid[0]? `@${who.split('@')[0]}` : name;
  let porcentaje = Math.floor(Math.random() * 500) + 1;

  let respuestas = {
    'gay': `⚡ *RAYO PREM* | ESCÁNER ⚡
╭─〔 *Team Nightwish* 〕─╮
│ 🏳️‍🌈 *Objetivo:* ${userTarget}
│ 📊 *Nivel GAY:* ${porcentaje}%
│ ⚡ *Estado:* Confirmado por el trueno
╰──────────────────────╯`,

    'lesbiana': `⚡ *RAYO PREM* | ESCÁNER ⚡
╭─〔 *Team Nightwish* 〕─╮
│ 🏳️‍🌈 *Objetivo:* ${userTarget}
│ 📊 *Nivel LESBIANA:* ${porcentaje}%
│ ⚡ *Estado:* El rayo lo detectó
╰──────────────────────╯`,

    'pajero': `⚡ *RAYO PREM* | ESCÁNER ⚡
╭─〔 *Team Nightwish* 〕─╮
│ 😏💦 *Objetivo:* ${userTarget}
│ 📊 *Nivel PAJERO:* ${porcentaje}%
│ ⚡ *Estado:* Manos ocupadas
╰──────────────────────╯`,

    'pajera': `⚡ *RAYO PREM* | ESCÁNER ⚡
╭─〔 *Team Nightwish* 〕─╮
│ 😏💦 *Objetivo:* ${userTarget}
│ 📊 *Nivel PAJERA:* ${porcentaje}%
│ ⚡ *Estado:* Manos ocupadas
╰──────────────────────╯`,

    'puto': `⚡ *RAYO PREM* | ESCÁNER ⚡
╭─〔 *Team Nightwish* 〕─╮
│ 🔥 *Objetivo:* ${userTarget}
│ 📊 *Nivel PUTO:* ${porcentaje}%
│ 🥵 *Nota:* Info en privado XD
╰──────────────────────╯`,

    'puta': `⚡ *RAYO PREM* | ESCÁNER ⚡
╭─〔 *Team Nightwish* 〕─╮
│ 🔥 *Objetivo:* ${userTarget}
│ 📊 *Nivel PUTA:* ${porcentaje}%
│ 🥵 *Nota:* Info en privado XD
╰──────────────────────╯`,

    'manco': `⚡ *RAYO PREM* | ESCÁNER ⚡
╭─〔 *Team Nightwish* 〕─╮
│ 💩 *Objetivo:* ${userTarget}
│ 📊 *Nivel MANCO:* ${porcentaje}%
│ ⚡ *Estado:* Ni en free le gana
╰──────────────────────╯`,

    'manca': `⚡ *RAYO PREM* | ESCÁNER ⚡
╭─〔 *Team Nightwish* 〕─╮
│ 💩 *Objetivo:* ${userTarget}
│ 📊 *Nivel MANCA:* ${porcentaje}%
│ ⚡ *Estado:* Ni en free le gana
╰──────────────────────╯`,

    'rata': `⚡ *RAYO PREM* | ESCÁNER ⚡
╭─〔 *Team Nightwish* 〕─╮
│ 🐁 *Objetivo:* ${userTarget}
│ 📊 *Nivel RATA:* ${porcentaje}%
│ 🧀 *Estado:* Come queso confirmado
╰──────────────────────╯`,

    'prostituto': `⚡ *RAYO PREM* | ESCÁNER ⚡
╭─〔 *Team Nightwish* 〕─╮
│ 🫦 *Objetivo:* ${userTarget}
│ 📊 *Nivel PROSTITUTO:* ${porcentaje}%
│ 👅 *Servicios:* ¿Alguien interesado? XD
╰──────────────────────╯`,

    'prostituta': `⚡ *RAYO PREM* | ESCÁNER ⚡
╭─〔 *Team Nightwish* 〕─╮
│ 🫦 *Objetivo:* ${userTarget}
│ 📊 *Nivel PROSTITUTA:* ${porcentaje}%
│ 👅 *Servicios:* ¿Alguien interesado? XD
╰──────────────────────╯`
  }

  let respuestaFinal = respuestas[command.toLowerCase()];

  if (respuestaFinal) {
    await conn.sendMessage(m.chat, {
      text: respuestaFinal,
      mentions: [who]
    }, { quoted: m });
  }
}

handler.help = ['gay', 'lesbiana', 'pajero', 'pajera', 'puto', 'puta', 'manco', 'manca', 'rata', 'prostituta', 'prostituto'].map((v) => v + " *@user*")
handler.tags = ['fun']
handler.command = /^(gay|lesbiana|pajero|pajera|puto|puta|manco|manca|rata|prostituta|prostituto)$/i

export default handler