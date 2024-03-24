export interface NewsItem {
  title: string;
  description: string;
  date: string;
  category: string;
  slug: string;
  featured_image: string;
}

export interface NewsResponse {
  message: string;
  news: NewsItem[];
}
