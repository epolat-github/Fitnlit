import { useEffect, useRef } from "react";

const useIsInitialRender = () => {
  const isInitialRender = useRef(true);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
    }
  }, []);

  return isInitialRender.current;
};

export default useIsInitialRender;
