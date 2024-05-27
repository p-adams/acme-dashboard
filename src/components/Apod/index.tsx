import AppLoader from "../AppLoader";

interface ApodProps {
  data: Maybe<Apod>;
  isLoading: boolean;
  isError: boolean;
}

export default function Apod(props: ApodProps) {
  const { data, isError, isLoading } = props;
  return (
    <div className="Apod--container">
      NASA picture of the day
      <div>
        {isLoading ? (
          <AppLoader />
        ) : isError ? (
          <span className="Text--info-warn">Please Try Again</span>
        ) : (
          data && (
            <div className="Apod--media-container">
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
    </div>
  );
}
