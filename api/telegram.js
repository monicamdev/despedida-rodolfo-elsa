export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, phone, guests, companionName, message } = req.body;
  const TELEGRAM_TOKEN = '8734607791:AAGOEOqrYHedzAtnnhV2tfTm_WZV12YcIMw';
  const TELEGRAM_CHAT_ID = '7461517847';

  const textMsg = `🪩 Nuevo Confirmado!\n\n👤 Nombre: ${name}\n📞 Whats: ${phone || 'N/A'}\n🤝 Acompañante: ${guests === '1' ? companionName : 'Ninguno'}\n💬 Mensaje: ${message || 'N/A'}`;
  
  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: textMsg })
    });
    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
