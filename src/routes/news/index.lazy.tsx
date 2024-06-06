import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { format } from "date-fns";
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
        `everything?q=Nasa&from=${format(new Date(), "yyyy-MM-dd")}&language=en&sortBy=publishedAt&`
      ).then((res) => res.json());
    },
  });

  return (
    <section className="News--page">
      <h3>Today's News</h3>
      <NewsFeedList articles={newsData.data?.articles} />
    </section>
  );
}
