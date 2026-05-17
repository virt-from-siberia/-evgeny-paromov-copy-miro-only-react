import { rqClient } from "@/shared/api/instance";
import { useQueryClient } from "@tanstack/react-query";

export function useUpdateFavorite() {
  const queryClient = useQueryClient();
  const updateFavoriteMutation = rqClient.useMutation(
    "put",
    "/boards/{boardId}/favorite",
    {
      onSettled: async () => {
        await queryClient.invalidateQueries(
          rqClient.queryOptions("get", "/boards"),
        );
      },
    },
  );

  const updateFavorite = (boardId: string, isFavorite: boolean) =>
    updateFavoriteMutation.mutate({
      params: { path: { boardId } },
      body: { isFavorite },
    });

  return {
    updateFavorite,
    getIsPending: (boardId: string) =>
      updateFavoriteMutation.isPending &&
      updateFavoriteMutation.variables?.params?.path?.boardId === boardId,
  };
}
