import { type RouteConfig, index, prefix, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    ...prefix("users", [
        index("routes/users/users.tsx"),
        route("new", "routes/users/new-user.tsx"),
    ]),
    ...prefix("tournaments", [
        index("routes/tournaments/tournaments.tsx"),
        route("new", "routes/tournaments/new-tournament.tsx"),
    ]),
] satisfies RouteConfig;
