const handler = async (m, { isOwner, isAdmin, conn, participants, args }) => {
  try {
    if (!(isAdmin || isOwner)) return global.dfail('admin', m, conn);

    const customMessage = args.join(' ') || '📢 *ATENCIÓN TEAM NIGHTWISH*'
    const groupMetadata = await conn.groupMetadata(m.chat).catch(() => ({ subject: 'Team Nightwish', participants: [] }))
    const groupName = groupMetadata.subject

    // Lista de banderas por prefijo
    const countryFlags = [
      { prefijo: '51', bandera: '🇵🇪' }, { prefijo: '52', bandera: '🇲🇽' }, { prefijo: '54', bandera: '🇦🇷' },
      { prefijo: '55', bandera: '🇧🇷' }, { prefijo: '56', bandera: '🇨🇱' }, { prefijo: '57', bandera: '🇨🇴' },
      { prefijo: '58', bandera: '🇻🇪' }, { prefijo: '502', bandera: '🇬🇹' }, { prefijo: '503', bandera: '🇸🇻' },
      { prefijo: '504', bandera: '🇭🇳' }, { prefijo: '505', bandera: '🇳🇮' }, { prefijo: '506', bandera: '🇨🇷' },
      { prefijo: '507', bandera: '🇵🇦' }, { prefijo: '591', bandera: '🇧🇴' }, { prefijo: '593', bandera: '🇪🇨' },
      { prefijo: '595', bandera: '🇵🇾' }, { prefijo: '598', bandera: '🇺🇾' }, { prefijo: '1', bandera: '🇺🇸' },
      { prefijo: '34', bandera: '🇪🇸' }
    ];

    const getCountryFlag = (mem) => {
      const rawJid = mem.jid || mem.id || '';
      const phoneNumber = rawJid.split('@')[0];
      const match = countryFlags.find(c => phoneNumber.startsWith(c.prefijo));
      return match? match.bandera : '🚩';
    };

    // Agrupar participantes por bandera
    const grouped = {};
    for (const mem of participants) {
      const flag = getCountryFlag(mem);
      if (!grouped[flag]) grouped[flag] = [];
      grouped[flag].push(mem);
    }

    // Ordenar las banderas
    const orderedFlags = countryFlags.map(c => c.bandera).concat(['🚩']);

    // Texto con estética Rayo Prem
    let messageText = `⚡ *RAYO PREM* | INVOCACIÓN ⚡
╭─〔 *${groupName}* 〕─╮
│ 👥 *Miembros:* ${participants.length}
│ 📢 *Mensaje:* ${customMessage}
╰──────────────────────╯

⛈️ *LISTA POR PAÍSES* ⛈️
`

    for (const flag of orderedFlags) {
      if (grouped[flag]) {
        messageText += `\n${flag} *${flag}*\n`
        for (const mem of grouped[flag]) {
          const realJid = mem.jid || mem.id || '';
          const displayNumber = realJid.split('@')[0];
          messageText += `│ ⚡ @${displayNumber}\n`;
        }
      }
    }

    messageText += `\n╰──────────────────────╯\n> "Cuando truena, todos responden"`

    // Imagen del trueno
    const imageUrl = 'https://files.evogb.win/91Vvmc.jpg';

    await conn.sendMessage(m.chat, {
      image: { url: imageUrl },
      caption: messageText,
      mentions: participants.map(a => a.jid || a.id)
    }, { quoted: m });

    await conn.react(m.chat, '⚡', m.key)

  } catch (error) {
    console.error("[ERROR RAYO]:", error);
    conn.reply(m.chat, `🌙 *Rayo Prem* | Error al invocar al grupo.`, m);
  }
};

handler.help = ['todos <texto>']
handler.tags = ['grupos']
handler.command = /^(todos|invocar|tagall)$/i
handler.admin = true
handler.group = true

export default handler