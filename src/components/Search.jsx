import { useRef } from "react";
import { useKey } from "../customs/useKey";

const Search = ({ query, setQuery }) => {
  const inputRef = useRef(null);

  //! Using useKey Custom Hook to reuse the key press
  useKey("Enter", function () {
    if (inputRef.current) {
      // for couldn't clear search input current after give it a value
      if (document.activeElement === inputRef.current) return;
      inputRef.current.focus();
      setQuery("");
    }
  });

  return (
    <div>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={inputRef}
      />
    </div>
  );
};

export default Search;
