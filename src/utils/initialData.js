export const initialUsers = [
  {
    id: 1,
    username: "David",
    email: "david@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    username: "John",
    email: "john@example.com",
    role: "Editor",
    status: "Active",
  },
  {
    id: 3,
    username: "Emiley",
    email: "emiley@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 4,
    username: "Jack",
    email: "jack@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 5,
    username: "Jake",
    email: "jake@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 6,
    username: "Tim",
    email: "tim@example.com",
    role: "Editor",
    status: "Active",
  },
];

export const initialRoles = [
  {
    id: 1,
    name: "Admin",
    permissions: ["read", "write", "delete", "manage_users", "manage_roles"],
  },
  {
    id: 2,
    name: "Editor",
    permissions: ["read", "write"],
  },
];
