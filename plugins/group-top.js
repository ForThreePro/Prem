import util from 'util'
import path from 'path'

let user = a => '@' + a.split('@')[0]

function handler(m, { groupMetadata, command, conn, text, usedPrefix }) {
if (!text) return m.reply(`⚡ *RAYO PREM* | TOP 10

╭─〔 *Team Nightwish* 〕─╮
│ 📌 *Uso:* ${usedPrefix}${command} <categoría>
│ ⚡ *Ejemplo:* ${usedPrefix}${command} Más activos
╰──────────────────────╯

> "El trueno elige a los mejores"`, m)

let ps = groupMetadata.participants.map(v => v.id)
let a = ps.getRandom()
let b = ps.getRandom()
let c = ps.getRandom()
let d = ps.getRandom()
let e = ps.getRandom()
let f = ps.getRandom()
let g = ps.getRandom()
let h = ps.getRandom()
let i = ps.getRandom()
let j = ps.getRandom()
let k = Math.floor(Math.random() * 70);
let x = pickRandom(['⚡','⛈️','🔥','👑','💀','🌙','🗿','👀','🥶','🤙'])
let vn = `https://hansxd.nasihosting.com/sound/sound${k}.mp3`

let top = `⚡ *TOP 10 ${text.toUpperCase()}* ⚡
╭─〔 *${groupMetadata.subject}* 〕─╮
│ ${x} *1.* ${user(a)}
│ ${x} *2.* ${user(b)}
│ ${x} *3.* ${user(c)}
│ ${x} *4.* ${user(d)}
│ ${x} *5.* ${user(e)}
│ ${x} *6.* ${user(f)}
│ ${x} *7.* ${user(g)}
│ ${x} *8.* ${user(h)}
│ ${x} *9.* ${user(i)}
│ ${x} *10.* ${user(j)}
╰──────────────────────╯

> "El trueno ya decidió el ranking"`

await conn.sendMessage(m.chat, {
    image: { url: 'https://files.evogb.win/91Vvmc.jpg' },
    caption: top,
    mentions: [a, b, c, d, e, f, g, h, i, j]
}, { quoted: m })

// Audio random de trueno
await conn.sendFile(m.chat, vn, 'audio.mp3', null, m, true, { type: 'audioMessage', ptt: true })

}

handler.help = ['top <texto>']
handler.tags = ['fun']
handler.command = ['top', 'top10']
handler.group = true

export default handler

function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]
}