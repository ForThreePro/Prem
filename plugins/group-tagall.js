import { join } from 'path'
import { readFileSync } from 'fs'

const handler = async (m, { isOwner, isAdmin, conn, participants, args }) => {
  try {
    if (!(isAdmin || isOwner)) {
      global.dfail('admin', m, conn);
      return;
    }

    const customMessage = args.join(' ') || '⛈️ Invocación del Trueno';
    const groupMetadata = await conn.groupMetadata(m.chat).catch(() => ({ subject: 'Grupo', participants: [] }));
    const groupName = groupMetadata.subject;

    // Banderas por prefijo
    const countryFlags = [
      { prefijo: '502', bandera: '🇬🇹' }, { prefijo: '503', bandera: '🇸🇻' },
      { prefijo: '504', bandera: '🇭🇳' }, { prefijo: '505', bandera: '🇳🇮' },
      { prefijo: '506', bandera: '🇨🇷' }, { prefijo: '507', bandera: '🇵🇦' },
      { prefijo: '591', bandera: '🇧🇴' }, { prefijo: '592', bandera: '🇬🇾' },
      { prefijo: '593', bandera: '🇪🇨' }, { prefijo: '595', bandera: '🇵🇾' },
      { prefijo: '598', bandera: '🇺🇾' }, { prefijo: '58', bandera: '🇻🇪' },
      { prefijo: '52', bandera: '🇲🇽' }, { prefijo: '54', bandera: '🇦🇷' },
      { prefijo: '57', bandera: '🇨🇴' }, { prefijo: '51', bandera: '🇵🇪' },
      { prefijo: '56', bandera: '🇨🇱' }, { prefijo: '55', bandera: '🇧🇷' },
      { prefijo: '34', bandera: '🇪🇸' }, { prefijo: '44', bandera: '🇬🇧' },
      { prefijo: '33', bandera: '🇫🇷' }, { prefijo: '49', bandera: '🇩🇪' },
      { prefijo: '39', bandera: '🇮🇹' }, { prefijo: '81', bandera: '🇯🇵' },
      { prefijo: '82', bandera: '🇰🇷' }, { prefijo: '86', bandera: '🇨🇳' },
      { prefijo: '91', bandera: '🇮🇳' }, { prefijo: '61', bandera: '🇦🇺' },
      { prefijo: '64', bandera: '🇳🇿' }, { prefijo: '1', bandera: '🇺🇸' },
      { prefijo: '7', bandera: '🇷🇺' }, { prefijo: '63', bandera: '🇵🇭' },
      { prefijo: '95', bandera: '🇲' }
    ];

    const getCountryFlag = (mem) => {
      const rawJid = mem.jid || mem.id || '';
      const phoneNumber = rawJid.split('@')[0];
      const match3 = countryFlags.find(c => c.prefijo.length === 3 && phoneNumber.startsWith(c.prefijo));
      if (match3) return match3.bandera;
      const match2 = countryFlags.find(c => c.prefijo.length === 2 && phoneNumber.startsWith(c.prefijo));
      if (match2) return match2.bandera;
      const match1 = countryFlags.find(c => c.prefijo.length === 1 && phoneNumber.startsWith(c.prefijo));
      if (match1) return match1.bandera;
      return '🚩';
    };

    // Agrupar por bandera CORRECTO
    const grouped = {};
    for (const mem of participants) {
      const flag = getCountryFlag(mem);
      if (!grouped[flag]) grouped[flag] = [];
      grouped[flag].push(mem);
    }

    const orderedFlags = countryFlags.map(c => c.bandera).concat(['🚩']);

    // ESTILO RAYO PREM BOT THUNDER CLEAN
    let messageText = `ᯇ 𝗥𝗔𝗬𝗢 𝗣𝗥𝗘𝗠 𝗕𝗢𝗧 ⚡ ୧

 ⤷ ┇ 𝗜𝗡𝗩𝗢𝗖𝗔𝗖𝗜𝗢𝗡 𝗚𝗘𝗡𝗘𝗥𝗔𝗟 ：✿ 。
꒰ ◞⁺⊹ ．grupo • ${groupName}

 ꒱ ׁ. ᘏ 𝗆𝖾𝗇𝗌⍺𝗃𝖾 ׅ 𝆬
⚡ ${customMessage} ࣪ ꕀ ˚
> *"Domina el trueno, domina el chat"*

──愛 *INTEGRANTES* ╏ 📊
👥 Total: ${participants.length} usuarios

──⚡ *LISTA POR PAÍS* ⚡──
`

    for (const flag of orderedFlags) {
      if (grouped[flag]) { // <-- ESTA ERA LA FALLA
        messageText += `\n.⃟𖥔 ݁⚡𖦹˙— \`${flag}\` —˙𖦹⚡꒷\n`
        for (const mem of grouped[flag]) { // <-- Y ESTA
          const realJid = mem.jid || mem.id || '';
          const displayNumber = realJid.split('@')[0];
          messageText += ` ⚡ ➛@${displayNumber}\n`
        }
        messageText += ` ㅤ└──.✦ ── ⊰ ̟!!.✦. ˙\n`
      }
    }

    messageText += `
⚡━━━━━━━━
⛈️ *BOT:* RAYO PREM BOT
⚡ *Creador:* Whois Yallico 👑
⛈️ *Versión:* 3.0.4 Thunder Clean

> *"Que el trueno los reúna"* ⚡
⚡━━━━━━━━`

    // Foto del grupo
    let img
    try {
      img = await conn.profilePictureUrl(m.chat, 'image')
    } catch {
      img = readFileSync(join(process.cwd(), 'storage', 'img', 'rayo.jpg'))
    }

    await conn.sendMessage(m.chat, {
      image: img,
      caption: messageText,
      mentions: participants.map(a => a.jid || a.id)
    }, { quoted: m });

  } catch (error) {
    console.error("[ERROR EN RAYO TODOS]:", error);
    conn.reply(m.chat, `⚡━━━━━━━━
⛈️ *ERROR EN INVOCACION*
⚡ ${error.message}
⚡━━━━━━━━`, m);
  }
};

handler.help = ['todos <texto>'];
handler.tags = ['grupos'];
handler.command = /^(todos|invocar|tagall)$/i;
handler.admin = true;
handler.group = true;

export default handler