"use client";
import { useState } from "react";
import { users, updateUser } from "../data/users";

export default function AdminPanel() {
  const [message, setMessage] = useState("");

  const isAdmin = localStorage.getItem("isAdmin") === "true";
  if (!isAdmin) return <p>Bạn không có quyền truy cập trang này.</p>;

  const banAccount = (username: string) => {
    updateUser(username, { banned: true });
    setMessage(`Đã ban tài khoản ${username}`);
  };

  const unbanAccount = (username: string) => {
    updateUser(username, { banned: false });
    setMessage(`Đã gỡ ban tài khoản ${username}`);
  };

  const addMoney = (username: string, amount: number) => {
    const user = users.find(u => u.username === username);
    if (user) {
      updateUser(username, { balance: user.balance + amount });
      setMessage(`Đã cộng ${amount} cho ${username}`);
    }
  };

  const subtractMoney = (username: string, amount: number) => {
    const user = users.find(u => u.username === username);
    if (user) {
      updateUser(username, { balance: user.balance - amount });
      setMessage(`Đã trừ ${amount} cho ${username}`);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto mt-10 border rounded">
      <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
      <p className="mb-4">{message}</p>

      {users.map(user => (
        <div key={user.username} className="flex items-center mb-2 justify-between">
          <span>
            {user.username} - Balance: {user.balance} - Banned: {user.banned ? "Yes" : "No"}
          </span>
          <div className="flex gap-2">
            <button
              className="bg-red-500 text-white px-2 rounded"
              onClick={() => banAccount(user.username)}
            >
              Ban
            </button>
            <button
              className="bg-green-500 text-white px-2 rounded"
              onClick={() => unbanAccount(user.username)}
            >
              Unban
            </button>
            <button
              className="bg-blue-500 text-white px-2 rounded"
              onClick={() => addMoney(user.username, 1000)}
            >
              +Money
            </button>
            <button
              className="bg-yellow-500 text-white px-2 rounded"
              onClick={() => subtractMoney(user.username, 500)}
            >
              -Money
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
