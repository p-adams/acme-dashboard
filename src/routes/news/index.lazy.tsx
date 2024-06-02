import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { newsRequest } from "../../api";
import NewsFeedList from "../../components/NewsFeed/NewsFeedList";

// TODO: support news/:id
export const Route = createLazyFileRoute("/news/")({
  component: () => <NewsPage />,
});

function NewsPage() {
  const newsData = useQuery<{
    status: string;
    totalResults: number;
    articles: Maybe<NewsArticle[]>;
  }>({
    queryKey: ["news"],
    queryFn: async () => {
      return await newsRequest(
        "everything?q=Nasa&from=2024-05-01&sortBy=publishedAt&"
      ).then((res) => res.json());
    },
  });

  return (
    <div>
      {" "}
      <NewsFeedList articles={newsData.data?.articles} />
    </div>
  );
}
