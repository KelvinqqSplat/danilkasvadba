// netlify/functions/sendMessage.js
exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { botToken, chatId, text } = JSON.parse(event.body);
        const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

        const params = new URLSearchParams();
        params.append('chat_id', chatId);
        params.append('text', text);
        params.append('parse_mode', 'HTML');

        const response = await fetch(url, {
            method: 'POST',
            body: params,
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.description);

        return {
            statusCode: 200,
            body: JSON.stringify({ ok: true }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};