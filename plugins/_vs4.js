let handler = async (m, { conn }) => {

    let plantilla = `🌙✧･ﾟ: *🌌 𝚃𝙴𝙰𝙼 𝙽𝙸𝙶𝙷𝚃𝚆𝙸𝚂𝙷 🌌* :ﾟ･✧🌙

👑 𝗘𝗡𝗖𝗔𝗥𝗚𝗔𝗗𝗔: ・
⏰ 𝗛𝗢𝗥𝗔: __:__ 🇦🇷  /  __:__ 🇵🇪

───────────────
    ✨ 𝗧𝗜𝗧𝗨𝗟𝗔𝗥𝗘𝗦 ✨
───────────────
🌟 1. ・
🌟 2. ・  
🌟 3. ・
🌟 4. ・

───────────────
   💫 𝗦𝗨𝗣𝗟𝗘𝗡𝗧𝗘𝗦 💫
───────────────
💜 1. ・
💜 2. ・

───────────────
   🎁 𝗗𝗢𝗡𝗔𝗗𝗢𝗥𝗔 𝗗𝗘 𝗦𝗔𝗟𝗔 🎁
───────────────
💎 ・

🌙✧･ﾟ: *Llenen y copien* :ﾟ･✧🌙`

    await conn.sendMessage(m.chat, { text: plantilla }, { quoted: m })
}

handler.help = ['vs4']
handler.tags = ['ff', 'teamnightwish']
handler.command = /^(vs4)$/i
handler.group = true
handler.admin = true  // ← SOLO ADMINS

export default handler