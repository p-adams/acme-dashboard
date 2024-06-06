interface NewsFeedListItemProps {
  article: NewsArticle;
  onItemClick?: (item: NewsArticle) => void;
}

export default function NewsFeedListItem(props: NewsFeedListItemProps) {
  return (
    <div onClick={() => props.onItemClick?.(props.article)}>
      <a href={props.article.url} target="_blank">
        {props.article.title}
      </a>
    </div>
  );
}
