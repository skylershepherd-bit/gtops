const TOKEN = process.env.SHIFTS_TOKEN || 'PASTE_7SHIFTS_TOKEN_HERE';
const API   = 'https://api.7shifts.com/v2';

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  const path = event.queryStringParameters?.path || '/v2/whoami';

  try {
    const url = API + path;
    const resp = await fetch(url, {
      headers: {
        'Authorization': 'Bearer ' + TOKEN,
        'Content-Type': 'application/json',
      }
    });

    const data = await resp.json();

    return {
      statusCode: resp.status,
      headers,
      body: JSON.stringify(data),
    };
  } catch (e) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: e.message }),
    };
  }
};
