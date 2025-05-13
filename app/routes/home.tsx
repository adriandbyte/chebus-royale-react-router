import Welcome from "~/welcome/welcome";

import type { Route } from "./+types/home";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Chebus Royal" },
    { name: "description", content: "Welcome to Chebus Royal Tournament!" },
  ];
}

export default function Home() {
  return <Welcome />;
}
