const handler = async (m, { conn, text, command, isAdmin, isOwner }) => {
    if (!m.isGroup || (!isAdmin &&!isOwner)) {
        return m.reply('❌ ¡Solo los administradores o el dueño pueden usar estos comandos!');
    }

    let chat = global.db.data.chats[m.chat]??= {}

    if (command === 'setwelcome') {
        if (!text) return m.reply('❌ Por favor, proporciona un mensaje.\n*Placeholders:* `@user` `@group` `@count` `@desc`\n\n*Ejemplo:* .setwelcome Bienvenido @user a @group. Eres el miembro #@count');
        chat.customWelcome = text.trim();

        return m.reply(`✅ *Bienvenida personalizada establecida*\n\n\`\`${text.trim()}\`\n\nPara quitarla usa: .delwelcome`);

    } else if (command === 'delwelcome') {
        if (!chat.customWelcome) return m.reply('⚠️ No tienes una bienvenida editada.');
        delete chat.customWelcome;
        return m.reply('✅ *Listo*\n\nSe eliminó la bienvenida personalizada. Ahora se usa la de `welcome.js`.');
    }
};
handler.help = ['setwelcome <mensaje>', 'delwelcome'];
handler.tags = ['group'];
handler.command = /^(setwelcome|delwelcome)$/i;
handler.admin = true;
handler.group = true;
export default handler;

Acá igual solo diseño