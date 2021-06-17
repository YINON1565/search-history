import "./search-box.component.scss";

import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { SearchList } from "../search-list/search-list.component";
import { FormSearch } from "../form-search/form-search.component";
import {
  allSearchesfilteredState,
  isSearchBoxFocusState,
} from "../../states/search-box.state";

export const SearchBox = () => {

  // Recoil state
  const allSearchesfiltered = useRecoilValue(allSearchesfilteredState);
  const [isSearchBoxFocus, setIsSearchBoxFocus] = useRecoilState(
    isSearchBoxFocusState
  );

  // Events
  const toggleFocus = (
    isSearchBox: boolean,
    ev?: React.MouseEvent<HTMLElement>
  ) => {
    ev && ev.stopPropagation();
    setIsSearchBoxFocus(isSearchBox);
  };

  // HTML
  return (
    <>
      <section
        onClick={() => toggleFocus(false)}
        className="search-box-container"
      >
        <section
          className={`${isSearchBoxFocus ? "focus" : ""} search-box`}
          onClick={(ev: React.MouseEvent<HTMLElement>) => toggleFocus(true, ev)}
        >
          <FormSearch />
          {isSearchBoxFocus && allSearchesfiltered?.length ? (
            <SearchList historySearches={allSearchesfiltered} />
          ) : (
            ""
          )}
        </section>
      </section>
    </>
  );
};
