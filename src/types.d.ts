interface Apod {
  date: string;
  explanation: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
}

interface NewsArticle {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  source: {
    id: string | null;
    name: string;
  };
  title: string;
  url: string;
  urlToImage: string;
}

type Maybe<T> = T | null | undefined;
