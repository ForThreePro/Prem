import fs from 'fs'
import os from 'os'

let handler = async (m, { conn, command }) => {
    // CLEAN TMP
    if (command === 'cleartmp') {
        const tmpPath = './tmp'
        if (fs.existsSync(tmpPath)) {
            fs.readdirSync(tmpPath).forEach(file => fs.unlinkSync(`${tmpPath}/${file}`))
        }
        return m.reply(`╭─❒ *『 𝗖𝗬𝗕𝗘𝗥 𝗕𝗢𝗧 』* ❒
│ 🧹 *PURGA DE CACHÉ*
│
│ ✅ *Estado:* Archivos temporales eliminados
│ 💻 *El sistema está limpio*
╰─────────────────❒`)
    }

    // RAM
    if (command === 'ram') {
        const used = process.memoryUsage()
        return m.reply(`💻 *CYBER BOT* ➔ Consumo de Sistema
⚡ *RAM Usada:* ${(used.heapUsed / 1024 / 1024).toFixed(2)} MB
🤖 *Estado:* Sistema estable`)
    }

    // CPU
    if (command === 'cpu') {
        let cpu = os.loadavg()[0].toFixed(2)
        return m.reply(`╭─❒ *『 𝗖𝗬𝗕𝗘𝗥 𝗕𝗢𝗧 』* ❒
│ 🖥️ *MONITOR CPU*
│
│ ⚡ *Carga Actual:* ${cpu}%
│ 💻 *Estado:* Procesando datos
╰─────────────────❒`)
    }

    // INFO
    if (command === 'info') {
        let _muptime = process.uptime() * 1000
        let muptime = clockString(_muptime)
        const used = process.memoryUsage()
        let cpu = os.loadavg()[0].toFixed(2)

        let info = `╭─❒ *『 𝗖𝗬𝗕𝗘𝗥 𝗕𝗢𝗧 』* ❒
│ 📊 *ESTADO DEL SISTEMA*
│
│ ⏰ *Uptime:* ${muptime}
│ 🧠 *RAM Usada:* ${(used.heapUsed / 1024 / 1024).toFixed(2)} MB
│ ⚡ *Carga CPU:* ${cpu}%
│
│ 👑 *Desarrollado por:* Whois Yallico
│ > *“Sistema conectado 24/7”*
╰─────────────────❒`
        return m.reply(info)
    }

    // UPTIME
    if (command === 'uptime') {
        let _uptime = process.uptime() * 1000
        let uptime = clockString(_uptime)
        return m.reply(`╭─❒ *『 𝗖𝗬𝗕𝗘𝗥 𝗕𝗢𝗧 』* ❒
│ ⏰ *TIEMPO ACTIVO*
│
│ ⚡ *Online:* ${uptime}
│ 💻 *Estado:* El sistema no duerme
╰─────────────────❒`)
    }
}

function clockString(ms) {
    let d = Math.floor(ms / 86400000)
    let h = Math.floor(ms / 3600000) % 24
    let m = Math.floor(ms / 60000) % 60
    let s = Math.floor(ms / 1000) % 60
    return `${d}d ${h}h ${m}m ${s}s`
}

handler.help = ['cleartmp', 'ram', 'cpu', 'info', 'uptime']
handler.tags = ['main']
handler.command = /^(cleartmp|ram|cpu|info|uptime)$/i
handler.rowner = true // solo owner para cleartmp

export default handler