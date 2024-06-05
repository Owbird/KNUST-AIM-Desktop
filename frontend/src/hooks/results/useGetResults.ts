import { ResultResponse } from "@/types/user";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { useMutation } from "react-query";

const useGetResults = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<ResultResponse>();

  const clearResults = () => setData(undefined)

  const checkResult = useMutation({
    onError: (data: any) => {
      setIsLoading(false);

      if (data.message) {
        enqueueSnackbar(data.message, { variant: "error" });

        return;
      }

      enqueueSnackbar("An error occurred. Please try again", {
        variant: "error"
      });
    },

    onSuccess: async (data) => {
      setIsLoading(false);
      setData(data);
    },

    mutationFn: (formData: { sem: string; year: string }) => {
      setIsLoading(true);
      return new Promise<ResultResponse>((resolve, reject) => {
        try {
          fetch("http://localhost:8080/api/v1/user/results", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "Application/JSON"
            },
            body: JSON.stringify(formData)
          }).then(async (res) => {
            if (res.status === 200) resolve(await res.json());
            else reject(await res.json());
          });
        } catch (e) {
          reject();
        }
      });
    }
  });

  return { isLoading,  data, checkResult, clearResults };
};

export default useGetResults;
