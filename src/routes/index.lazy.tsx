import { createLazyFileRoute } from "@tanstack/react-router";
import "./App.css";
import { useQuery } from "@tanstack/react-query";
import AppLoader from "../components/AppLoader";

export const Route = createLazyFileRoute("/")({
  component: App,
});

function App() {
  const { data, isLoading, isError } = useQuery({
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
          NASA picture of the day
          <div>
            {isLoading ? (
              <AppLoader />
            ) : isError ? (
              <span className="Info--error">Please Try Again</span>
            ) : (
              data && (
                <div className="APOD--container">
                  <h3>
                    {data.media_type === "video" ? "Video" : "Image"} of The Day
                  </h3>
                  <h3>
                    {data.title} - <span>{data.date}</span>
                  </h3>
                  <div className="Media--container">
                    {data.media_type === "video" ? (
                      <iframe
                        width="560"
                        height="315"
                        src={data.url}
                        frameBorder="0"
                        allowFullScreen
                      ></iframe>
                    ) : (
                      <img src={data.url} alt="Picture of the Day" />
                    )}
                  </div>
                  <p className="explanation">{data.explanation}</p>
                </div>
              )
            )}
          </div>
        </aside>
      </div>
    </section>
  );
}

export default App;
