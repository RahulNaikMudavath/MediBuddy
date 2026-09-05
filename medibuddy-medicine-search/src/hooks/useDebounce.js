import { useEffect, useState } from "react";

function useDebounce(value, delay = 400) {
  const [result, setResult] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setResult(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return result;
}

export default useDebounce;