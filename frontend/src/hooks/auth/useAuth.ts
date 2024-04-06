import { SignInFormData } from "@/types/forms";
import { UserAuthResponse, UserDataResponse } from "@/types/user";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { useMutation } from "react-query";

const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);

  const signIn = useMutation({
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
      const userDataRes = await fetch("http://localhost:8080/api/v1/user/", {
        headers: {
          Authorization: `Bearer ${data.token}`
        }
      });

      const userData = (await userDataRes.json()) as UserDataResponse;

      setIsLoading(false);
      enqueueSnackbar(`Welcome, ${userData.user_data.personal.surname}`, {
        variant: "success"
      });
    },

    mutationFn: (formData: SignInFormData) => {
      setIsLoading(true);
      return new Promise<UserAuthResponse>((resolve, reject) => {
        try {
          fetch("http://localhost:8080/api/v1/auth/login", {
            method: "POST",
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

  return { signIn, isLoading };
};

export default useAuth;
