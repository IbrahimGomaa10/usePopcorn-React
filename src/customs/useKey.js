import { useEffect } from "react";

export function useKey(key, action) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key.toLowerCase() === key.toLowerCase()) {
        action();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown); // use clean up to remove event and didn't render this event in all pages only when movie details open and remove when the component unmount
    };
  }, [key, action]);
}
