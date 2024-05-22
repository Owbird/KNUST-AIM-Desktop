import { ResultsSelectionResponse } from "@/types/user";
import { useQuery } from "react-query";

const useGetResultsSelection = () => {
  const { isLoading, error, data } = useQuery(
    "results-selection",
    () =>
      fetch("http://localhost:8080/api/v1/user/results/selection", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "Application/JSON"
        }
      }).then((res) => res.json() as Promise<ResultsSelectionResponse>),
    {
      refetchOnWindowFocus: false
    }
  );

  return { isLoading, error, data };
};

export default useGetResultsSelection;
