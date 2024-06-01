import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/news/")({
  component: () => <div>Hello /news/!</div>,
});
