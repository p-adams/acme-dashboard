import NewsFeedListItem from "../NewsFeedListItem";

interface NewsFeedListProps {
  articles: Maybe<NewsArticle[]>;
}

export default function NewsFeedList(props: NewsFeedListProps) {
  return (
    <div className="News--feed">
      {props.articles?.map((article, index) => (
        <div key={`${article.url}-${index}`}>
          <NewsFeedListItem article={article} />
        </div>
      ))}
    </div>
  );
}
