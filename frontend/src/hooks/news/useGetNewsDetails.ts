import { NewsDetailsResponse } from "@/types/news";
import { useQuery } from "react-query";

const useGetNewsDetails = (slug: string) => {
  const { isLoading, error, data } = useQuery(`news-details-${slug}`, () =>
    fetch(`http://localhost:8080/api/v1/news/${slug}`).then(
      (res) => res.json() as Promise<NewsDetailsResponse>
    )
  );

  return { isLoading, error, data };
};

export default useGetNewsDetails;
