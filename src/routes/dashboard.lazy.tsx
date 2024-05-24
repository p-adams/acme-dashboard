import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard")({
  component: () => <div>Dashboard</div>,
});
