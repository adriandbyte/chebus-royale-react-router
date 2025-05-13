import { createColumnHelper } from "@tanstack/react-table";

import type { User } from "~/types/user.type";
const columnHelper = createColumnHelper<User>();

export const userColumns = [
    columnHelper.accessor("id", {
        header: "ID",
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("username", {
        header: "Username",
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("password", {
        header: "Password",
        cell: (info) =>
            info.getValue().replaceAll(/./g, "*").length > 0 ? "********" : "",
    }),
    columnHelper.accessor("email", {
        header: "Email",
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("gameTag", {
        header: "Game Tag",
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("isSuperAdmin", {
        header: "Is Super Admin",
        cell: (info) => String(info.getValue()),
    }),
    columnHelper.accessor("createdAt", {
        header: "Created At",
        cell: (info) => info.getValue().toLocaleString(),
    }),
    columnHelper.accessor("updatedAt", {
        header: "Updated At",
        cell: (info) => info.getValue().toLocaleString(),
    }),
];