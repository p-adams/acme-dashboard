import { createLazyFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
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
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [geolocationIsSupported, setGeolocationIsSupported] = useState(false);
  const { data, isLoading, isError } = useQuery<Maybe<Apod>>({
    queryKey: ["apod"],
    queryFn: async () =>
      await request("planetary/apod?").then((res) => res.json()),
  });

  const mutation = useMutation({
    mutationFn: async () => {
      const data = await request(
        `planetary/earth/imagery?lon=${coords.long}&lat=${coords.lat}&date=2018-01-01&dim=0.15&`
      ).then((res) => res.blob());
      setImageUrl(URL.createObjectURL(data));
    },
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
              <button onClick={() => mutation.mutate()}>Get Imagery</button>
              <div className="Media--container">
                {imageUrl && <img src={imageUrl} alt="Imagery" />}
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
