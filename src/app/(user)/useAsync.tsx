import { useState } from "react";
export interface ConfigOptions<Data = any> {
    onComplete?: (data: Data) => void;
    onError?: (errorMessage: string, error: any) => void;
    defaultData?: Data
}

export interface useAsyncResult<Data = any> {
    data: Data | null;
    error: string;
    loading: boolean;
    request: (...args: any[]) => Promise<any>;
}
export function useAsync<Data = any>(asyncFunc: Function, options?: ConfigOptions<Data>): useAsyncResult<Data> {
    const [data, setData] = useState<Data | null>(options?.defaultData || null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const request = async (...args: any[]) => {
        setLoading(true);
        let d;
        try {
            const result = await asyncFunc(...args);
            d = result ? result.data ? result.data : result : undefined;
            setData(d);
            if (options) {
                if (options.onComplete) {
                    options.onComplete(d);
                }

            }
        } catch (err: any) {
            const getErrorMessage = () => {
                if (err) {
                    if (err.response && err.response.data)
                        return err.response.data.message;
                    return err.message;
                }
                return "Unexpected Error!"
            }
            const errorMessage = getErrorMessage();
            setError(errorMessage);
            if (options) {
                if (options.onError) {
                    options.onError(errorMessage, err);
                }
            }
        } finally {
            setLoading(false);
            return d;
        }

    };

    return {
        data,
        error,
        loading,
        request
    };
};