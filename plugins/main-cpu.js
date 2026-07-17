import os from 'os'

let handler = async (m) => {
    let cpu = os.loadavg()[0].toFixed(2)
    m.reply(`╭─❒ *『 𝗖𝗬𝗕𝗘𝗥 𝗕𝗢𝗧 』* ❒
│ 🖥️ *MONITOR CPU*
│
│ ⚡ *Carga Actual:* ${cpu}%
│ 💻 *Estado:* Procesando datos
╰─────────────────❒`)
}

handler.help = ['cpu']
handler.tags = ['main']
handler.command = ['cpu']

export default handler