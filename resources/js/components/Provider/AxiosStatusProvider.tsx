import axios, { AxiosError } from 'axios';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

// Create a context
interface AxiosStatusContextType {
  loading: boolean;
  errors: AxiosError[];
}

const AxiosStatusContext = createContext<AxiosStatusContextType>({ loading: false, errors: [] });

export const AxiosStatusProvider = ({ children }: { children: ReactNode }) => {
  const [activeRequests, setActiveRequests] = useState<number>(0);
  const [errors, setErrors] = useState<AxiosError[]>([]);

  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use((config) => {
      setActiveRequests((prev) => prev + 1);
      return config;
    });

    const responseInterceptor = axios.interceptors.response.use(
      (response) => {
        setActiveRequests((prev) => Math.max(prev - 1, 0));
        return response;
      },
      (error) => {
        setActiveRequests((prev) => Math.max(prev - 1, 0));
        setErrors((prev) => [...prev, error]);
        return Promise.reject(error);
      },
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  const loading = activeRequests > 0;

  return <AxiosStatusContext.Provider value={{ loading, errors }}>{children}</AxiosStatusContext.Provider>;
};

// Custom hook for using the Axios status
export const useAxiosStatus = (): AxiosStatusContextType => {
  return useContext(AxiosStatusContext);
};
