import { createLazyFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { request } from "../api";
import { useEffect } from "react";
import "./index.css";

export const Route = createLazyFileRoute("/")({
  component: HomePage,
});
// TODO: improve slow loading times
function HomePage() {
  useEffect(() => {
    mutation.mutate();
  }, []);

  // QUERIES/MUTATIONS

  const query = useQuery({
    queryKey: [""],
    queryFn: async () => await request("").then((res) => res.json()),
  });

  const mutation = useMutation({
    mutationFn: async () => {
      const data = await request(``).then((res) => res.blob());
    },
  });

  return (
    <section className="Home">
      {/* TODO: implement layout */}
      <h1>Acme Dashboard</h1>
      <div className="Home--content">
        <aside className="Home--aside"></aside>
      </div>
    </section>
  );
}

export default HomePage;
