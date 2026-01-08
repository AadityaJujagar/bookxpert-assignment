// 9

import { useEffect, useState } from "react";

export const useDebounce = (value, delay) => {
  const [debouncedVal, setDebouncedVal] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedVal(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedVal;
};
