import {useEffect, useState} from 'react';

/**
 *
 * @param {string} value - value looking for
 * @param {string} delay - ms
 * @return {string} same value but the time has been delayed
 */
export default function useDebounce(value: string, delay:number) {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(()=>{
    const handler = setTimeout(()=>{
      setDebounceValue(value);
    }, delay);
    return ()=>{
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debounceValue;
}
