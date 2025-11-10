"use client";

import { useState } from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

async function registerAction(formData: FormData) {
	"use server";
	const bcrypt = await import("bcryptjs");
	const prisma = (await import("../../../lib/prisma")).default;
	const username = String(formData.get("username") || "").trim();
	const password = String(formData.get("password") || "");

	if (!username || !password) {
		return { success: false, message: "Vui lòng nhập đầy đủ thông tin." };
	}

	const existing = await prisma.user.findUnique({ where: { username } });
	if (existing) {
		return { success: false, message: "Tên đăng nhập đã tồn tại." };
	}

	const hashed = await bcrypt.hash(password, 10);
	await prisma.user.create({
		data: { username, password: hashed, balance: 0 },
	});

	return { success: true, message: "Đăng ký thành công. Hãy đăng nhập." };
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

export default function RegisterPage() {
	const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
			<div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
				<h1 className="text-2xl font-extrabold text-center mb-1">Tạo tài khoản</h1>
				<p className="text-center text-gray-500 mb-6">Đăng ký nhanh chóng để bắt đầu mua sắm</p>
				<form
					action={async (formData) => {
						const res = await registerAction(formData);
						setResult(res);
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
							placeholder="nhap_ten_cua_ban"
						/>
					</div>
					<div className="space-y-2">
						<label className="block text-sm font-medium">Mật khẩu</label>
						<input
							type="password"
							name="password"
							autoComplete="new-password"
							required
							className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
							placeholder="••••••••"
						/>
					</div>
					<SubmitButton>Đăng ký</SubmitButton>
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
					Đã có tài khoản?{" "}
					<a href="/app/dang-nhap" className="text-red-600 font-semibold hover:underline">
						Đăng nhập
					</a>
				</p>
			</div>
		</div>
	);
}


