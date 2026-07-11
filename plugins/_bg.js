let handler = async (m, { conn, usedPrefix, command }) => {
    let q = m.quoted? m.quoted : m;
    let mime = (q.msg || q).mimetype || '';

    if (!mime) return m.reply(`❄ *Responde a una imagen con ${usedPrefix + command}*`);
    if (!/image\/(jpe?g|png)/.test(mime)) return m.reply(`⚠️ *Solo imágenes JPG/PNG*`);

    await m.react('⏳');
    let img = await q.download();
    let result = null;
    let apiUsed = '';

    // Subir imagen usando fetch nativo + blob
    async function uploadImage(buffer) {
        const blob = new Blob([buffer], { type: 'image/jpeg' });
        const form = new FormData();
        form.append('file', blob, 'img.jpg');
        const res = await fetch('https://telegra.ph/upload', { method: 'POST', body: form });
        const json = await res.json();
        return 'https://telegra.ph' + json[0].src;
    }

    try {
        let url = await uploadImage(img);

        // 1. SIPUTZX - Gratis, no pide key
        try {
            apiUsed = 'siputzx';
            let res = await fetch(`https://api.siputzx.my.id/api/iloveimg/removebg?image=${encodeURIComponent(url)}`);
            if (res.ok) result = res.url;
        } catch {}

        // 2. LOLHUMAN
        if (!result) try {
            apiUsed = 'lolhuman';
            let res = await fetch(`https://api.lolhuman.xyz/api/removebg?apikey=GataDiosV3&img=${url}`);
            let json = await res.json();
            if (json.status == 200) result = json.result;
        } catch {}

        // 3. SKIZO
        if (!result) try {
            apiUsed = 'skizo';
            let res = await fetch(`https://skizo.tech/api/removebg?apikey=GataDios&url=${url}`);
            let json = await res.json();
            if (json.status) result = json.result;
        } catch {}

        // 4. FGmods
        if (!result) try {
            apiUsed = 'fgmods';
            let res = await fetch(`https://api.fgmods.xyz/api/removebg?apikey=elrebelde21&url=${url}`);
            let json = await res.json();
            if (json.status) result = json.result;
        } catch {}

    } catch (e) {
        console.log(e)
    }

    if (!result) {
        await m.react('❌');
        return m.reply('⚠️ *Todas las APIs fallaron. Intenta con otra imagen*');
    }

    await conn.sendFile(m.chat, result, 'removebg.png', `✅ *Fondo eliminado*\n⚡ *API:* ${apiUsed}`, m);
    await m.react('✅');
};

handler.help = ['removebg'];
handler.tags = ['tools'];
handler.command = /^removebg|nofondo$/i;
module.exports = handler; // <- Para tu host CommonJS