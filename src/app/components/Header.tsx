"use client";

import Link from "next/link";
import { useCart } from "./CartContext";

export default function Header() {
	const { cart, total } = useCart();

	return (
		<header className="bg-gray-900 text-white px-4 py-3">
			<div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
				<Link href="/app" className="text-2xl font-extrabold">
					Roblox Shop
				</Link>
				<nav className="flex items-center gap-4 text-sm">
					<Link href="/app" className="hover:text-red-400">
						Trang chủ
					</Link>
					<Link href="/app/nap-the" className="hover:text-red-400">
						Nạp thẻ
					</Link>
					<Link href="/app/gio-hang" className="hover:text-red-400">
						Giỏ hàng
					</Link>
					<Link href="/app/lien-he" className="hover:text-red-400">
						Liên hệ
					</Link>
					<Link href="/app/dang-nhap" className="text-red-400 font-semibold hover:text-red-300">
						Đăng nhập
					</Link>
					<Link href="/app/dang-ky" className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-md font-semibold">
						Đăng ký
					</Link>
				</nav>
				<div className="text-sm">
					<span>Giỏ: {cart.length} sp</span> | <span>Tổng: {total} Robux</span>
				</div>
			</div>
		</header>
	);
}
