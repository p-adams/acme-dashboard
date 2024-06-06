import { createFileRoute } from "@tanstack/react-router";
import { request } from "../../../api";

export const Route = createFileRoute("/news/$postId/")({
  loader: async ({ params: { postId } }) =>
    request(``).then((res) => res.json()),
  component: () => NewsDetailsPage,
});

function NewsDetailsPage() {
  const post = Route.useLoaderData();
  return <div>title: {post.title}</div>;
}
