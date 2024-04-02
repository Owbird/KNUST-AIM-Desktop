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

export interface NewsDetails {
  content: {
    type: string;
    value: string;
  }[];
  date: string;
  featured_image: string;
  source: string;
  tile: string;
  read_time: number;
}

export interface NewsDetailsResponse {
  message: string;
  news: NewsDetails;
}
