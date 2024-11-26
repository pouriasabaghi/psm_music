import { Input } from "@/ui/input";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import SearchList from "./SearchList";
import { useSearch } from "./useSearch";
import { useEffect, useRef, useState } from "react";

function SearchContent() {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");

  const { songs, isLoading } = useSearch(keyword);

  const debounce = useRef(null);
  const searchInput = useRef(null);

  function handleSearch(e) {
    const keywordValue = e.target.value.trim();

    if (!keywordValue) setKeyword("");

    if (debounce.current) clearTimeout(debounce.current);

    // set a new timeout to update the keyword after the debounce delay
    if (keywordValue.length <= 2) return;

    debounce.current = setTimeout(() => {
      setKeyword(keywordValue);
    }, 500);
  }

  useEffect(() => {
    searchInput.current.focus();
  }, []);

  if (isLoading)
    return (
      <div className="fixed left-0 top-0 z-50 flex h-full w-full flex-col gap-y-4 bg-dark px-3 pb-3 pt-4">
        <div className="flex gap-x-4">
          <MdArrowBack onClick={() => navigate("/")} color="white" size={30} />

          <Input
            ref={searchInput}
            defaultValue={keyword}
            onChange={handleSearch}
            type="search"
            placeholder="Search"
          />
        </div>
        <div>Loading...</div>
      </div>
    );

  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full flex-col gap-y-4 bg-dark px-3 pb-3 pt-5">
      <div className="flex gap-x-4">
        <MdArrowBack onClick={() => navigate("/")} color="white" size={30} />

        <Input
          ref={searchInput}
          onChange={handleSearch}
          type="search"
          placeholder="Search"
        />
      </div>
      {songs && (
        <>
          <div className="mb-3 flex flex-col gap-y-3">
            <h6 className="text-lg font-bold">Your songs:</h6>
            <SearchList songs={songs?.user_songs} />
          </div>

          <div className="flex flex-col gap-y-3">
            <h6 className="text-lg font-bold">Global:</h6>
            <SearchList songs={songs?.global_songs} />
          </div>
        </>
      )}
    </div>
  );
}

export default SearchContent;
