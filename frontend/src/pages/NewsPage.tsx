import { Button } from "@src/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@src/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@src/components/ui/dialog";
import { useEffect, useState } from "react";
import { GetNews, GetNewsDetails } from "@go/news/NewsFunctions";
import { models } from "@go/models";
import Loader from "@src/components/Loader";

export function NewsPage() {
  const [news, setNews] = useState<models.News[]>([]);
  const [selectedNews, setSelectedNews] = useState<models.News | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetNews()
      .then(setNews)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Latest News</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {news.map((item) => (
          <Card key={item.slug} className="flex flex-col">
            <CardHeader>
              <div className="aspect-video w-full bg-muted rounded-t-lg overflow-hidden">
                <img
                  src={item.featured_image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </CardHeader>
            <CardContent className="grid gap-2 flex-grow">
              <CardTitle>{item.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {new Date(item.date).toLocaleDateString()}
              </p>
              <p className="text-sm">{item.description}</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => setSelectedNews(item)}>
                Read More
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <NewsDetailsDialog
        isOpen={selectedNews !== null}
        onClose={() => setSelectedNews(null)}
        article={selectedNews}
      />
    </div>
  );
}

function NewsDetailsDialog({
  isOpen,
  onClose,
  article,
}: {
  isOpen: boolean;
  onClose: () => void;
  article: models.News | null;
}) {
  const [newsDetails, setNewsDetails] = useState<models.NewsDetails | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (article) {
      setLoading(true);
      GetNewsDetails(article.slug)
        .then(setNewsDetails)
        .finally(() => setLoading(false));
    }
  }, [article]);

  if (!article) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] md:max-w-4xl max-h-[90vh] overflow-y-auto">
        {loading ? (
          <Loader />
        ) : (
          newsDetails && (
            <>
              <DialogHeader>
                <div className="aspect-video w-full bg-muted rounded-t-lg overflow-hidden">
                  <img
                    src={newsDetails.featured_image}
                    alt={newsDetails.tile}
                    className="w-full h-full object-cover"
                  />
                </div>
                <DialogTitle className="text-2xl font-bold">
                  {newsDetails.tile}
                </DialogTitle>
                <DialogDescription className="flex items-center space-x-2">
                  <span>{newsDetails.date}</span>
                  <span>&bull;</span>
                  <span>{newsDetails.source}</span>
                  <span>&bull;</span>
                  <span>{newsDetails.read_time} min read</span>
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                {newsDetails.content.map((c, index) => (
                  <p key={index}>{c.value}</p>
                ))}
              </div>
            </>
          )
        )}
      </DialogContent>
    </Dialog>
  );
}
