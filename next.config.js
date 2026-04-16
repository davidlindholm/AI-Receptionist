/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  // Makes server-side env vars available at runtime on Amplify.
  // These are NOT exposed to the browser — keys stay server-side only.
  serverRuntimeConfig: {
    TELNYX_API_KEY: process.env.TELNYX_API_KEY,
    TELNYX_PUBLIC_KEY: process.env.TELNYX_PUBLIC_KEY,
    DEMO_BUSINESS_NAME: process.env.DEMO_BUSINESS_NAME,
  },
};

module.exports = nextConfig;
