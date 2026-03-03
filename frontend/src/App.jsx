import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export default function App() {
  const [greeting, setGreeting] = useState("Click the button 🙂");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function getRandomGreeting() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/api/greetings/random`, {
        headers: { "x-api-key": API_KEY },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Request failed");
      setGreeting(data.greeting);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <div className="card">
        <h2>Random Greetings</h2>
        <button onClick={getRandomGreeting} disabled={loading}>
          {loading ? "Loading..." : "Get Greeting"}
        </button>

        <div className="greeting">{greeting}</div>
        {error && <div className="small">Error: {error}</div>}
        <div className="small">API: {API_URL}</div>
      </div>
    </div>
  );
}
