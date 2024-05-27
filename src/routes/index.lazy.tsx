import { createLazyFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import Apod from "../components/Apod";
import { request } from "../api";
import { useState } from "react";

export const Route = createLazyFileRoute("/")({
  component: App,
});

function App() {
  const [coords, setCoords] = useState<{ lat: number; long: any }>({
    lat: 0,
    long: 0,
  });
  const { data, isLoading, isError } = useQuery<Maybe<Apod>>({
    queryKey: ["apod"],
    queryFn: async () => await request("planetary/apod"),
  });
  return (
    <section>
      <h1>Cosmic Dashboard</h1>
      <div>
        <div>
          <h3>Landsat Imagery Viewer</h3>
          <button>Get Coordinates</button>
          <p className="Text--info">Requires access to your location</p>
          <p>Don't want browser to access your location? Enter manually:</p>
          <label>
            Latitude
            <input
              value={coords.lat}
              onChange={(e) =>
                setCoords(($coords) => ({
                  ...$coords,
                  lat: Number(e.target.value),
                }))
              }
            />
          </label>
          <label>
            Longitude
            <input
              value={coords.long}
              onChange={(e) =>
                setCoords(($coords) => ({
                  ...$coords,
                  long: Number(e.target.value),
                }))
              }
            />
          </label>
        </div>
        <aside>
          <Apod data={data} isLoading={isLoading} isError={isError} />
        </aside>
      </div>
    </section>
  );
}

export default App;
