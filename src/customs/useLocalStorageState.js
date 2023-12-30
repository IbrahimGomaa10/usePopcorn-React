import { useEffect, useState } from "react";

export function useLocalStorageState(initialState, storageKey) {
  const [value, setValue] = useState(() => {
    return JSON.parse(localStorage.getItem("watchedList")) || initialState;
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(value));
  }, [value, storageKey]);
  return [value, setValue];
}
