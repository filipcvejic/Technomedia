import { useState } from "react";

const useLoading = () => {
  const [isLoading, setIsLoading] = useState(false);

  const setLoading = (loading) => {
    setIsLoading(loading);
  };

  return { isLoading, setLoading };
};

export default useLoading;
