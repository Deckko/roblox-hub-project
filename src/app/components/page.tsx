"use client";
import { useState } from "react";
import AdminLogin from "../components/AdminLogin";
import AdminPanel from "../components/AdminPanel";

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("isAdmin") === "true"
  );

  return loggedIn ? (
    <AdminPanel />
  ) : (
    <AdminLogin onLogin={() => setLoggedIn(true)} />
  );
}
