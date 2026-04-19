import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FormPage from "./pages/FormPage";
import MessagesPage from "./pages/MessagesPage";

function HomePage() {
  const [message, setMessage] = useState("Loading...");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const healthRes = await fetch("/api/health");
        const healthData = await healthRes.json();
        setMessage(healthData.message);

        const usersRes = await fetch("/api/users");
        const usersData = await usersRes.json();
        setUsers(usersData);
      } catch (error) {
        console.error("Fetch failed:", error);
        setMessage("Failed to connect to API");
      }
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      <Header />
      <main className="mx-auto max-w-7xl px-6 flex-grow w-full py-12">
        <h1 className="text-3xl font-bold mb-2">Booking System</h1>
        <p className="text-sm text-gray-500 mb-8">{message}</p>

        <h2 className="text-xl font-semibold mb-4">Users from database</h2>
        {users.length === 0 ? (
          <p className="text-sm text-gray-400">No users found.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {users.map(user => (
              <div key={user.id} className="rounded-2xl bg-white p-6 shadow-md">
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/messages" element={<MessagesPage />} />
      </Routes>
    </BrowserRouter>
  );
}