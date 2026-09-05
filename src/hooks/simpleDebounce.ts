import { useCallback, useEffect, useRef } from "react";

// export function useSimpleDebounce(callback: () => void, delay: number) {
//   const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

//   const debouncedFn = useCallback(() => {
//     if (timeout.current) clearTimeout(timeout.current);
//     timeout.current = setTimeout(() => {
//       callback();
//     }, delay);
//   }, [callback, delay]);

//   useEffect(() => {
//     return () => {
//       if (timeout.current) clearTimeout(timeout.current);
//     };
//   }, []);

//   return debouncedFn;
// }

export const useSimpleDebounce = (callback: () => void, delay: number) => {
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const debouncedFn = useCallback(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    timeout.current = setTimeout(() => {
      callbackRef.current();
    }, delay);
  }, [delay]);

  useEffect(() => {
    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, []);

  return debouncedFn;
};
