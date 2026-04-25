import { rqClient } from "@/shared/api/instance";
import { ROUTES } from "@/shared/model/routes";
import { useQueryClient } from "@tanstack/react-query";
import { href, useNavigate } from "react-router-dom";

type CreateBoardParams = {
  onSuccessAction: () => void;
};

export function useCreateBoard({ onSuccessAction }: CreateBoardParams) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const createBoardMutation = rqClient.useMutation("post", "/boards", {
    onSuccess: (data) => {
      onSuccessAction();
      navigate(href(ROUTES.BOARD, { boardId: data.id }));
      //   formRef.current?.reset();
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["get", "/boards"] });
    },
  });

  return {
    createBoard: (name: string) =>
      createBoardMutation.mutate({
        body: { name },
      } as never),
    isPending: createBoardMutation.isPending,
  };
}
