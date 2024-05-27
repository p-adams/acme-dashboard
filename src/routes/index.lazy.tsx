import { createLazyFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import Apod from "../components/Apod";
import { request } from "../api";
import { useMemo, useState } from "react";
import "./index.css";

export const Route = createLazyFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const [coords, setCoords] = useState<{
    lat: Maybe<number>;
    long: Maybe<number>;
  }>({
    lat: null,
    long: null,
  });
  const [geolocationIsSupported, setGeolocationIsSupported] = useState(false);
  const { data, isLoading, isError } = useQuery<Maybe<Apod>>({
    queryKey: ["apod"],
    queryFn: async () => await request("planetary/apod"),
  });

  const hasCoords = useMemo<boolean>(() => {
    return coords.lat !== null && coords.long !== null;
  }, [coords]);

  function getLocation() {
    if (navigator.geolocation) {
      setGeolocationIsSupported(true);
      navigator.geolocation.getCurrentPosition((position) =>
        setCoords(() => ({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        }))
      );
      return;
    }
  }
  return (
    <section className="Home">
      <h1>Cosmic Dashboard</h1>
      <div className="Home--content">
        <div>
          <h3>Landsat Imagery Viewer</h3>
          {!geolocationIsSupported && (
            <p className="Text--info warn">
              Geolocation is not supported by this browser. Click below to
              enable.
            </p>
          )}
          <button onClick={() => getLocation()}>Get Coordinates</button>

          {geolocationIsSupported && !hasCoords && (
            <p className="Text--info notify">
              Requires access to your location
            </p>
          )}
          <form className="Form column">
            <p>Enter manually:</p>
            <label>
              Latitude
              <input
                value={coords.lat ? String(coords.lat) : ""}
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
                value={coords.long ? String(coords.long) : ""}
                onChange={(e) =>
                  setCoords(($coords) => ({
                    ...$coords,
                    long: Number(e.target.value),
                  }))
                }
              />
            </label>
          </form>
          {hasCoords && (
            <div>
              <button>Get Imagery</button>
              <div className="Media--container">
                <img />
              </div>
            </div>
          )}
        </div>
        <aside className="Home--aside">
          <Apod data={data} isLoading={isLoading} isError={isError} />
        </aside>
      </div>
    </section>
  );
}

export default HomePage;
