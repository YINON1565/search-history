
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { SearchList } from "./search-list.component";
import { FormSearch } from "./form-search.component";
import {
  allSearchesfilteredState,
  isSearchBoxFocusState,
} from "../states/search-box.state";
import { createUseStyles, useTheme } from "react-jss";
import { ThemeModel } from "../App";

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

  // Style
  const theme: ThemeModel = useTheme();
  const classes = useStyles({ theme });

  // HTML
  return (
    <>
      <section
        onClick={() => toggleFocus(false)}
        className={classes["search-box-container"]}
      >
        <section
          className={`${isSearchBoxFocus ? "focus" : ""} ${classes["search-box"]}`}
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

const useStyles = createUseStyles((theme: ThemeModel) => ({
  "search-box-container": {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    paddingBlockStart: 285,
    backgroundColor: theme.variables.background,
  },
  "search-box": {
    backgroundColor: "#fff",
    position: "relative",
    width: 605,
    height: "fit-content",
    borderRadius: theme.variables.radius,
    "&.focus": {
      boxShadow: "0 4px 24px #12263f0f",
    },
  },
}));
