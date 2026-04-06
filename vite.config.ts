import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) =>{
  const env = loadEnv(mode, process.cwd(), ''); // Use '' as the prefix to load all variables, not just VITE_*
  // Split the string from the .env file into an array of strings, or set to true
  const allowedHosts = env.ALLOWED_HOSTS === 'true' ? true : env.ALLOWED_HOSTS.split(',');
  return {
  server: {
    allowedHosts: allowedHosts,
    host: '0.0.0.0', // or true
    // You can also specify the port if needed, e.g., port: 3000,
  },
  plugins: [react(), tailwindcss()],
}
});
