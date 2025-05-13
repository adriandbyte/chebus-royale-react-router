import { useLoaderData } from "react-router";

const users = [
  {
    id: "1",
    username: "user1",
    password: "password1",
    email: "user1@example.com",
    gameTag: "UserOne#1111",
    isSuperAdmin: false,
    createdAt: new Date("2025-01-10T10:00:00Z"),
    updatedAt: new Date("2025-04-20T14:00:00Z"),
  },
  {
    id: "2",
    username: "adminUser",
    password: "adminPassword",
    email: "admin@example.com",
    gameTag: "AdminBoss#0001",
    isSuperAdmin: true,
    createdAt: new Date("2024-11-01T08:30:00Z"),
    updatedAt: new Date("2025-04-22T11:15:00Z"),
  },
  {
    id: "3",
    username: "gamerPro",
    password: "proGamerPassword",
    email: "pro.gamer@example.com",
    gameTag: "ProGamer#1337",
    isSuperAdmin: false,
    createdAt: new Date("2025-03-15T16:20:00Z"),
    updatedAt: new Date("2025-04-23T09:00:00Z"),
  },
];

export function loader() {
  return users;
}

export function UsersPage() {
  const users = useLoaderData<typeof loader>();
  console.log(users);
  return <div>You are in users page</div>;
}

export default UsersPage;
