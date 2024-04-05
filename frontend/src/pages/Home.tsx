import NewsItem from "@/components/home/NewsItem";
import Loading from "@/components/Loading";
import useGetNews from "@/hooks/news/useGetNews";
import { Grid, GridItem } from "@chakra-ui/react";

const Home = () => {
  const { isLoading, data, error } = useGetNews();

  if (isLoading) return <Loading />;

  if (error) return <h1>Couldn't load</h1>;

  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={2}>
      {data?.news.map((news) => (
        <GridItem key={news.slug}>
          <NewsItem news={news} />
        </GridItem>
      ))}
    </Grid>
  );
};
export default Home;
