"use client";

import { useState } from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

async function loginAction(formData: FormData) {
	"use server";
	const bcrypt = await import("bcryptjs");
	const prisma = (await import("../../../lib/prisma")).default;
	const { cookies } = await import("next/headers");

	const username = String(formData.get("username") || "").trim();
	const password = String(formData.get("password") || "");

	if (!username || !password) {
		return { success: false, message: "Vui lòng nhập đầy đủ thông tin." };
	}

	const user = await prisma.user.findUnique({ where: { username } });
	if (!user) {
		return { success: false, message: "Sai tài khoản hoặc mật khẩu." };
	}
	const ok = await bcrypt.compare(password, user.password);
	if (!ok) {
		return { success: false, message: "Sai tài khoản hoặc mật khẩu." };
	}

	// Placeholder session/cookie. For production, integrate a proper auth solution like NextAuth.js.
	const cookieStore = await cookies();
	cookieStore.set("session_user", user.username, { httpOnly: true, sameSite: "lax", path: "/" });

	return { success: true, message: "Đăng nhập thành công." };
}

function SubmitButton({ children }: { children: React.ReactNode }) {
	const { pending } = useFormStatus();
	return (
		<button
			type="submit"
			disabled={pending}
			className="w-full py-3 rounded-md bg-red-600 text-white font-semibold hover:bg-red-700 disabled:opacity-50"
		>
			{pending ? "Đang xử lý..." : children}
		</button>
	);
}

export default function LoginPage() {
	const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
			<div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
				<h1 className="text-2xl font-extrabold text-center mb-1">Đăng nhập</h1>
				<p className="text-center text-gray-500 mb-6">Chào mừng bạn quay trở lại</p>
				<form
					action={async (formData) => {
						const res = await loginAction(formData);
						setResult(res);
						if (res.success && typeof window !== "undefined") {
							window.location.href = "/app";
						}
					}}
					className="space-y-4"
				>
					<div className="space-y-2">
						<label className="block text-sm font-medium">Tên đăng nhập</label>
						<input
							name="username"
							autoComplete="username"
							required
							className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
							placeholder="ten_dang_nhap"
						/>
					</div>
					<div className="space-y-2">
						<label className="block text-sm font-medium">Mật khẩu</label>
						<input
							type="password"
							name="password"
							autoComplete="current-password"
							required
							className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
							placeholder="••••••••"
						/>
					</div>
					<SubmitButton>Đăng nhập</SubmitButton>
				</form>
				{result && (
					<div
						className={`mt-4 text-sm rounded-md px-3 py-2 ${
							result.success ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
						}`}
					>
						{result.message}
					</div>
				)}
				<p className="text-center text-sm mt-6">
					Chưa có tài khoản?{" "}
					<a href="/app/dang-ky" className="text-red-600 font-semibold hover:underline">
						Đăng ký
					</a>
				</p>
			</div>
		</div>
	);
}


