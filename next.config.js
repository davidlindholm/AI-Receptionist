/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  // Explicitly expose server-side env vars so they survive the
  // Next.js standalone bundle on Amplify Lambda.
  env: {
    ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
    TELNYX_API_KEY: process.env.TELNYX_API_KEY,
    TELNYX_PUBLIC_KEY: process.env.TELNYX_PUBLIC_KEY,
    WHATSAPP_FROM_NUMBER: process.env.WHATSAPP_FROM_NUMBER,
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  },
  async rewrites() {
    return [
      { source: "/",                    destination: "/gns/index.html" },
      { source: "/ai-voice-assistant",  destination: "/ai-voice-assistant/index.html" },
    ];
  },
};

module.exports = nextConfig;
