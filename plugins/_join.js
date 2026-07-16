let handler = async (m, { conn, args, text, isOwner }) => {
    // Solo el owner puede usarlo
    if (!isOwner) return m.reply('🐼 Solo mi creador puede usar este comando')

    if (!text) return m.reply(`Uso:.join https://chat.whatsapp.com/xxxxx\n\nMándame el link del grupo y me uno 💗`)

    let link = text.match(/chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/)
    if (!link) return m.reply('❌ Link inválido. Envíame un link de WhatsApp válido')

    let res = await conn.groupAcceptInvite(link[1]).catch(e => {
        console.log(e)
        return m.reply('❌ No pude unirme. Puede que ya esté en el grupo o el link expiró')
    })

    if (res) {
        m.reply(`✅ Me uní al grupo exitosamente 🐼💗\nID: ${res}`)
    }
}
handler.help = ['join <link>']
handler.tags = ['owner']
handler.command = ['join', 'unirbot']
handler.owner = true

export default handler