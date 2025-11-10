"use client";
import { useState } from "react";

function AdminPanel() {
  const [email, setEmail] = useState("");
  const [ip, setIp] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [message, setMessage] = useState("");

  async function post(path: string, body: any) {
    const res = await fetch(`/api/admin/${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return { ok: res.ok, data };
  }

  const banAccount = async () => {
    const { ok, data } = await post("ban-account", { email, reason: "Banned by admin" });
    setMessage(ok ? "Banned: " + JSON.stringify(data.user?.email) : "Error: " + JSON.stringify(data));
  };

  const unbanAccount = async () => {
    const { ok, data } = await post("unban-account", { email });
    setMessage(ok ? "Unbanned: " + JSON.stringify(data.user?.email) : "Error: " + JSON.stringify(data));
  };

  const banIp = async () => {
    const { ok } = await post("ban-ip", { ip, reason: "IP blocked" });
    setMessage(ok ? "IP banned: " + ip : "Error");
  };

  const unbanIp = async () => {
    const { ok } = await post("unban-ip", { ip });
    setMessage(ok ? "IP unbanned: " + ip : "Error");
  };

  const adjustBalance = async () => {
    if (amount === "") return setMessage("Enter amount");
    const n = Number(amount);
    const { ok, data } = await post("adjust-balance", { email, amount: n, reason: "Admin adjust" });
    setMessage(ok ? `New balance: ${data.updated.balance}` : "Error: " + JSON.stringify(data));
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

      <div className="bg-white p-4 rounded shadow mb-4">
        <h2 className="font-semibold mb-2">Account actions</h2>
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="user email" className="border p-2 mr-2" />
        <button onClick={banAccount} className="bg-red-500 text-white px-3 py-1 rounded mr-2">Ban account</button>
        <button onClick={unbanAccount} className="bg-green-500 text-white px-3 py-1 rounded">Unban account</button>
      </div>

      <div className="bg-white p-4 rounded shadow mb-4">
        <h2 className="font-semibold mb-2">IP actions</h2>
        <input value={ip} onChange={e => setIp(e.target.value)} placeholder="IP to ban" className="border p-2 mr-2" />
        <button onClick={banIp} className="bg-red-500 text-white px-3 py-1 rounded mr-2">Ban IP</button>
        <button onClick={unbanIp} className="bg-green-500 text-white px-3 py-1 rounded">Unban IP</button>
      </div>

      <div className="bg-white p-4 rounded shadow mb-4">
        <h2 className="font-semibold mb-2">Adjust balance</h2>
        <input value={amount as any} onChange={e => setAmount(e.target.value === "" ? "" : Number(e.target.value))} placeholder="amount (use negative to subtract)" className="border p-2 mr-2" />
        <button onClick={adjustBalance} className="bg-blue-600 text-white px-3 py-1 rounded">Adjust</button>
      </div>

      {message && <div className="mt-4 p-3 bg-gray-100 rounded">{message}</div>}
    </div>
  );
}

export default AdminPanel;