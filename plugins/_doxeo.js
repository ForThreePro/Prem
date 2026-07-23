const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`*Ingresa un nombre o etiqueta*\nEjemplo: ${usedPrefix + command} @usuario`);

  const target = text.replace(/@.+/, '').trim() || '@usuario';

  // Función para generar cosas fakes random
  const randIP = () => `${Math.floor(Math.random()*223)+1}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}`;
  const randMAC = () => Array.from({length: 6}, () => Math.floor(Math.random()*256).toString(16).padStart(2, '0').toUpperCase()).join(':');

  let msg = await conn.sendMessage(m.chat, { text: `*☠ ¡¡INICIANDO DOXXEO A ${target.toUpperCase()}!! ☠*\n\n[░░░░░░░░░░] 0%` }, { quoted: m });

  // Efecto de carga editando el mensaje
  const delays = [300, 600, 900, 1300];
  const percents = ['18%', '47%', '79%', '100%'];

  for (let i = 0; i < percents.length; i++) {
    await new Promise(r => setTimeout(r, delays[i]));
    await conn.sendMessage(m.chat, { text: `*☠ ¡¡INICIANDO DOXXEO A ${target.toUpperCase()}!! ☠*\n\n[${'█'.repeat((i+1)*2)}${'░'.repeat(8-(i+1)*2)}] ${percents[i]}`, edit: msg.key });
  }

  const fakeData = `*[ ✔ ] PERSONA DOXXEADA CON ÉXITO*
*⏳ Tiempo: ${(Math.random() * 2 + 0.5).toFixed(3)} segundos*

*— RESULTADOS OBTENIDOS —*

*» Nombre:* ${target}
*» IP:* ${randIP()}
*» N:* 43.${Math.floor(Math.random()*9000)} | W: 12.${Math.floor(Math.random()*9000)}
*» SS NUMBER:* ${Math.floor(Math.random()*9e15) + 1e15}
*» IPV6:* fe80::${Math.floor(Math.random()*9999)}:${Math.floor(Math.random()*9999)}%12
*» MAC:* ${randMAC()}
*» ISP:* ${['Movistar','Claro','UCOM Universal','Entel','Telmex'][Math.floor(Math.random()*5)]}
*» DNS:* 8.8.8.8
*» GATEWAY:* 192.168.0.1
*» SUBNET:* 255.255.255.0
*» PORTS:* TCP [443, 80] | UDP [8080, 53]
*» DEVICE:* WIN32-X / Android
*» ROUTER:* ERICSSON / TP-LINK

> *Nota: Este es un comando de broma, todos los datos son falsos y generados aleatoriamente.*`;

  await conn.sendMessage(m.chat, { text: fakeData, mentions: conn.parseMention(fakeData), edit: msg.key });
};

handler.help = ['doxear <@tag>'];
handler.tags = ['fun'];
handler.command = /^(doxx?eo|doxx?ear|doxx?eame|doxeame)$/i;

export default handler;