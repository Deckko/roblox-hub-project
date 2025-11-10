export default function LegacyLoginRedirect() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
			<div className="bg-white rounded-md shadow p-6 text-center space-y-3">
				<p>Trang đăng nhập đã được chuyển sang địa chỉ mới.</p>
				<a href="/app/dang-nhap" className="text-red-600 font-semibold hover:underline">
					Đi tới Đăng nhập
				</a>
			</div>
		</div>
	);
}
