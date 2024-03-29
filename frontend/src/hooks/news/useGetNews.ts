import { NewsResponse } from "@/types/news";
import { useQuery } from "react-query";

const useNewsFunctions = () => {
	const { isLoading, error, data } = useQuery(
		"news",
		() =>
			fetch("http://localhost:8080/api/v1/news/").then(
				(res) => res.json() as Promise<NewsResponse>,
			),
		{
			refetchOnWindowFocus: false,
		},
	);

	return { isLoading, error, data };
};

export default useNewsFunctions;
