let handler = async (m, { conn, participants, groupMetadata, command }) => {

    // SI ES GDC
    if (command === 'gdc' || command === 'guerradeclanes' || command === 'guerra') {
        const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || './storage/img/rayo.jpg'
        const groupAdmins = participants.filter(p => p.admin)
        const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net'

        let text = `⚡✧･ﾟ: *💻 𝙶𝙳𝙲 - 𝙲𝚈𝙱𝙴𝚁 𝙱𝙾𝚃 💻* :ﾟ･✧⚡

👑 𝗦𝗜𝗦𝗧𝗘𝗠𝗔: ${groupMetadata.subject}
⏰ 𝗛𝗢𝗥𝗔𝗥𝗜𝗢: __:__ 🇦🇷 / __:__ 🇵🇪

╭──────────────╮
│ㅤ⚡ 𝗘𝗤𝗨𝗜𝗣𝗢 ➹𝟏
│
│👑 ➤ ・
│🤖 ➤ ・
│🤖 ➤ ・
│🤖 ➤ ・
│
│⚡ 𝗘𝗤𝗨𝗜𝗣𝗢 ➹𝟐
│
│👑 ➤ ・
│🤖 ➤ ・
│🤖 ➤ ・
│🤖 ➤ ・
│
│⚡ 𝗘𝗤𝗨𝗜𝗣𝗢 ➹𝟑
│
│👑 ➤ ・
│🤖 ➤ ・
│🤖 ➤ ・
│🤖 ➤ ・
│
│⚡ 𝗘𝗤𝗨𝗜𝗣𝗢 ➹𝟒
│
│👑 ➤ ・
│🤖 ➤ ・
│🤖 ➤ ・
│🤖 ➤ ・
│
│⚡ 𝗘𝗤𝗨𝗜𝗣𝗢 ➹𝟓
│
│👑 ➤ ・
│🤖 ➤ ・
│🤖 ➤ ・
│🤖 ➤ ・
│
│⚡ 𝗘𝗤𝗨𝗜𝗣𝗢 ➹𝟔
│
│👑 ➤ ・
│🤖 ➤ ・
│🤖 ➤ ・
│🤖 ➤ ・
│
│ㅤ💻 𝗥𝗘𝗦𝗘𝗥𝗩𝗔𝗦:
│⚡ ➤ ・
│⚡ ➤ ・
│⚡ ➤ ・
│⚡ ➤ ・
│⚡ ➤ ・
│⚡ ➤ ・
╰─────────────╯

⚡✧･ﾟ: *Completen y copien* :ﾟ･✧⚡`.trim()

        return await conn.sendFile(m.chat, pp, 'gdc.jpg', text, m, false, { mentions: [...groupAdmins.map(v => v.id), owner] })
    }

    // SI ES VS4 O VS6
    let titulares = command === 'vs6'? 6 : 4
    let suplentes = command === 'vs6'? 3 : 2

    let listaTitulares = ''
    for(let i = 1; i <= titulares; i++) {
        listaTitulares += `⚡ ${i}. ・\n`
    }

    let listaSuplentes = ''
    for(let i = 1; i <= suplentes; i++) {
        listaSuplentes += `💻 ${i}. ・\n`
    }

    let plantilla = `⚡✧･ﾟ: *💻 𝙲𝚈𝙱𝙴𝚁 𝙱𝙾𝚃 💻* :ﾟ･✧⚡

👑 𝗔𝗗𝗠𝗜𝗡: ・
⏰ 𝗛𝗢𝗥𝗔: __:__ 🇦🇷 / __:__ 🇵🇪

───────────────
    ⚡ 𝗧𝗜𝗧𝗨𝗟𝗔𝗥𝗘𝗦 ⚡
───────────────
${listaTitulares}
───────────────
   💻 𝗥𝗘𝗦𝗘𝗥𝗩𝗔𝗦 💻
───────────────
${listaSuplentes}
───────────────
   🎁 𝗔𝗡𝗙𝗜𝗧𝗥𝗜𝗢𝗡 🎁
───────────────
⚡ ・

⚡✧･ﾟ: *Completen y copien* :ﾟ･✧⚡`

    await conn.sendMessage(m.chat, { text: plantilla }, { quoted: m })
}

handler.help = ['vs4', 'vs6', 'gdc']
handler.tags = ['ff']
handler.command = /^(vs4|vs6|gdc|guerradeclanes|guerra)$/i
handler.group = true
handler.admin = true // SOLO ADMINS

export default handler