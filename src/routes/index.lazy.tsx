import { createLazyFileRoute } from "@tanstack/react-router";
import "./App.css";
import { useQuery } from "@tanstack/react-query";
import AppLoader from "../components/AppLoader";
import Apod from "../components/Apod";

export const Route = createLazyFileRoute("/")({
  component: App,
});

function App() {
  const { data, isLoading, isError } = useQuery<Maybe<APOD>>({
    queryKey: ["apod"],
    queryFn: async () =>
      await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${
          import.meta.env.VITE_API_KEY
        }`
      ).then((res) => res.json()),
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
