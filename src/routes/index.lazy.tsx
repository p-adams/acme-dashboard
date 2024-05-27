import { createLazyFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import Apod from "../components/Apod";
import { request } from "../api";

export const Route = createLazyFileRoute("/")({
  component: App,
});

function App() {
  const { data, isLoading, isError } = useQuery<Maybe<Apod>>({
    queryKey: ["apod"],
    queryFn: async () => await request("planetary/apod"),
  });
  return (
    <section>
      <h1>Cosmic Dashboard</h1>
      <div>
        <div>main</div>
        <aside>
          <Apod data={data} isLoading={isLoading} isError={isError} />
        </aside>
      </div>
    </section>
  );
}

export default App;
