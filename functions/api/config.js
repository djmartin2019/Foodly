// Cloudflare Pages Function to serve environment variables securely
export async function onRequest(context) {
  // Get environment variables from Cloudflare Pages
  const config = {
    VITE_SUPABASE_URL: context.env.VITE_SUPABASE_URL,
    VITE_SUPABASE_ANON_KEY: context.env.VITE_SUPABASE_ANON_KEY,
    VITE_MAPBOX_TOKEN: context.env.VITE_MAPBOX_TOKEN,
  };

  // Return as JSON with CORS headers
  return new Response(JSON.stringify(config), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
