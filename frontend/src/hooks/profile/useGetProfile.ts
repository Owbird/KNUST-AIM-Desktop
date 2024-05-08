import { UserDataResponse } from "@/types/user";
import { useQuery } from "react-query";

const useGetProfile = () => {
  const { isLoading, error, data } = useQuery(
    "profile",
    () =>
      fetch("http://localhost:8080/api/v1/user/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "Application/JSON"
        }
      }).then((res) => res.json() as Promise<UserDataResponse>),
    {
      refetchOnWindowFocus: false
    }
  );

  return { isLoading, error, data };
};

export default useGetProfile;
