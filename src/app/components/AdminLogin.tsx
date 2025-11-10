"use client";
import { useState } from "react";
import { admins } from "../data/admin";

export default function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = () => {
    const admin = admins.find(
      a => a.username === username && a.password === password
    );

    if (admin) {
      localStorage.setItem("isAdmin", "true");
      setMessage("Đăng nhập thành công!");
      onLogin();
    } else {
      setMessage("Sai tên đăng nhập hoặc mật khẩu.");
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto mt-10 border rounded">
      <h2 className="text-xl font-bold mb-4">Admin Login</h2>
      <input
        type="text"
        placeholder="Username"
        className="border p-2 mb-2 w-full"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2 mb-2 w-full"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white p-2 w-full rounded"
        onClick={handleLogin}
      >
        Login
      </button>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}
