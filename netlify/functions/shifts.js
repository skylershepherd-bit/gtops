export default async (req, context) => {
  const TOKEN = Netlify.env.get('SHIFTS_TOKEN') || '';
  const API   = 'https://api.7shifts.com/v2';

  const url = new URL(req.url);
  const path = url.searchParams.get('path') || '/whoami';

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  if (req.method === 'OPTIONS') {
    return new Response('', { status: 200, headers: corsHeaders });
  }

  try {
    const resp = await fetch(API + path, {
      headers: {
        'Authorization': 'Bearer ' + TOKEN,
        'Content-Type': 'application/json',
      }
    });

    const data = await resp.text();
    return new Response(data, {
      status: resp.status,
      headers: corsHeaders,
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: corsHeaders,
    });
  }
};

export const config = { path: '/.netlify/functions/shifts' };
