import { publicRqClient } from "@/shared/api/instance";
import { ROUTES } from "@/shared/model/routes";
import { useNavigate } from "react-router-dom";
import { useSession } from "@/shared/model/session";

export function useRegister() {
  const navigate = useNavigate();

  const { login } = useSession();

  const registerMutation = publicRqClient.useMutation(
    "post",
    "/auth/register",
    {
      onSuccess: (data) => {
        login(data.accessToken);
        navigate(ROUTES.LOGIN);
      },
    },
  );

  const register = (data: { email: string; password: string }) => {
    registerMutation.mutate({ body: data });
  };

  const errorMessage = registerMutation.isError
    ? registerMutation.error?.message
    : undefined;

  return {
    register,
    isPending: registerMutation.isPending,
    errorMessage,
  };
}
