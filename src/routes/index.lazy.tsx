import { createLazyFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import Apod from "../components/Apod";
import { newsRequest, request } from "../api";
import { useEffect, useMemo, useState } from "react";
import "./index.css";
import locations from "../locations.json";

export const Route = createLazyFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  // COMPONENT FIELDS
  const [coords, setCoords] = useState<{
    lat: Maybe<number>;
    long: Maybe<number>;
  }>({
    lat: locations[0].latitude,
    long: locations[0].longitude,
  });
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [geolocationIsSupported, setGeolocationIsSupported] = useState(false);
  const hasCoords = useMemo<boolean>(() => {
    return coords.lat !== null && coords.long !== null;
  }, [coords]);

  useEffect(() => {
    mutation.mutate();
  }, [coords]);

  // QUERIES/MUTATIONS

  const { data, isLoading, isError } = useQuery<Maybe<Apod>>({
    queryKey: ["apod"],
    queryFn: async () =>
      await request("planetary/apod?").then((res) => res.json()),
  });

  const newsData = useQuery<{
    status: string;
    totalResults: number;
    articles: Maybe<NewsArticle[]>;
  }>({
    queryKey: ["news"],
    queryFn: async () => {
      return await newsRequest(
        "everything?q=Nasa&from=2024-04-30&sortBy=publishedAt&"
      ).then((res) => res.json());
    },
  });

  const mutation = useMutation({
    mutationFn: async () => {
      const data = await request(
        `planetary/earth/imagery?lon=${coords.long}&lat=${coords.lat}&date=2018-01-01&dim=0.15&`
      ).then((res) => res.blob());
      setImageUrl(URL.createObjectURL(data));
    },
  });

  // UTILITIES

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
        {/* TODO: implement layout */}

        <div>
          <div className="News--home-feed">
            {newsData.data?.articles?.map((i) => (
              <div key={i.url}>{i.title}</div>
            ))}
          </div>
          <h3>Landsat Imagery Viewer</h3>
          <h4>Preview Imagery of 7 Wonders of the Ancient World</h4>
          <ul>
            {locations.map((location) => (
              <li
                key={location.name}
                className={`${location.latitude === coords.lat && location.longitude === coords.long ? "active" : ""}`}
                onClick={() =>
                  setCoords((coords) => ({
                    ...coords,
                    lat: location.latitude,
                    long: location.longitude,
                  }))
                }
              >
                {location.name}
              </li>
            ))}
          </ul>

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

          <div>
            {hasCoords && (
              <button onClick={() => mutation.mutate()}>Get Imagery</button>
            )}
            <div className="Media--container">
              {/** TODO: display alternative UI in case of loading/pending/error, etc. */}
              {imageUrl && <img src={imageUrl} alt="Imagery" />}
            </div>
          </div>
        </div>
        <aside className="Home--aside">
          <Apod data={data} isLoading={isLoading} isError={isError} />
        </aside>
      </div>
    </section>
  );
}

export default HomePage;
