import { useMutation, useQuery, useQueryClient, type UseQueryOptions } from "@tanstack/react-query";
import Axios from "@/lib/Axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";
//  ---------- Query Hook ----------

interface QueryOptions<ResponseType> {
    url: string; key: string; config?: AxiosRequestConfig;
    enabled?: boolean; staleTime?: number; onSuccess?: (data: ResponseType) => void;
    onError?: (error: unknown) => void;
}

const useCustomQuery = <ResponseType>(
    options: QueryOptions<ResponseType>
) => {
    const { url, key, config, enabled = true, staleTime = 0, onSuccess, onError, } = options;

    return useQuery<ResponseType, unknown, ResponseType, [string, any?]>({
        queryKey: [key, config?.params], queryFn: async (): Promise<ResponseType> => {
            const response: AxiosResponse<ResponseType> = await Axios.get(url, config);
            return response.data;
        },
        enabled, staleTime, retry: false, onSuccess,
        onError,
    } as UseQueryOptions<ResponseType, unknown, ResponseType, [string, any?]>);
};

const useCustomMutation = <
    ResponseType, RequestType = unknown>({ url, key, method = "POST", onSuccess, onError, invalidateQueries, }: {
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
export { useCustomMutation, useCustomQuery }
