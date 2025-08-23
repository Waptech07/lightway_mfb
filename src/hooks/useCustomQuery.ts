import { useMutation, useQueryClient } from "@tanstack/react-query";
import Axios from "@/lib/Axios";
import type { AxiosResponse } from "axios";

export const useCustomMutationFlex = <
  ResponseType,
  RequestType = unknown
>({
  url,
  key,
  method = "POST",
  onSuccess,
  onError,
  invalidateQueries,
}: {
  url: string;
  key: string;
  method?: "POST" | "PUT" | "PATCH" | "DELETE";
  onSuccess?: (data: ResponseType) => void;
  onError?: (error: unknown) => void;
  invalidateQueries?: string[];
}) => {
  const queryClient = useQueryClient();

  return useMutation<ResponseType, unknown, RequestType>({
    mutationKey: [key],
    mutationFn: async (data: RequestType) => {
      let response: AxiosResponse<ResponseType>;
      switch (method) {
        case "POST":
          response = await Axios.post(url, data);
          break;
        case "PUT":
          response = await Axios.put(url, data);
          break;
        case "PATCH":
          response = await Axios.patch(url, data);
          break;
        case "DELETE":
          response = await Axios.delete(url, { data });
          break;
        default:
          throw new Error(`Unsupported method: ${method}`);
      }
      return response.data;
    },
    retry: false,
    onSuccess: (data) => {
      if (invalidateQueries) {
        invalidateQueries.forEach((queryKey) =>
          queryClient.invalidateQueries({ queryKey: [queryKey] })
        );
      }
      onSuccess?.(data);
    },
    onError,
  });
};
