interface NewsFeedListItemProps {
  article: NewsArticle;
}

export default function NewsFeedListItem(props: NewsFeedListItemProps) {
  return <div>{props.article.title}</div>;
}
