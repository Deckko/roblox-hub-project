export interface User {
  username: string;
  balance: number;
  banned: boolean;
  ip?: string;
}

export let users: User[] = [
  { username: "user1", balance: 5000, banned: false },
  { username: "user2", balance: 2000, banned: false }
];

// Hàm cập nhật người dùng
export const updateUser = (username: string, data: Partial<User>) => {
  const user = users.find(u => u.username === username);
  if (user) Object.assign(user, data);
};
