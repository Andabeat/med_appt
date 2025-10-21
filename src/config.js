// Dynamically set your API base URL depending on environment
const hostname = window.location.hostname;

export const API_URL =
  hostname.includes("cognitiveclass.ai") || hostname.includes("skills.network")
    ? "https://romina1-8181.theiadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai"
    : "http://localhost:8181";

console.log("API_URL:", API_URL);
