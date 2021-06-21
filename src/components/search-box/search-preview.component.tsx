import React from "react";

// Style
import { createUseStyles, useTheme } from "react-jss";
import { ThemeModel } from "../../App";

// State
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  historySearchesState,
  isSearchBoxFocusState,
  filterByState,
} from "../../states/search-history.state";
import { removeHistoySearch, saveHistoySearch } from "../../states/search-history-operations";

// Components
import { IconPngUrlModel } from "../../util/icon-png";
import { IconPng } from "../helpers/icon-png.component";

// Helpers
import { boldAutocomplatePipe } from "../../util/helpers";

export const SearchPreview = ({
  historySearch,
  historySearchIndex,
}: SearchPreviewType) => {
  // Recoil state
  const [historySearches, setHistorySearches] =
    useRecoilState(historySearchesState);
  const filterBy = useRecoilValue(filterByState);
  const setIsSearchBoxFocus = useSetRecoilState(isSearchBoxFocusState);

  // Events
  const onRemoveHistorySearch = (ev: React.SyntheticEvent) => {
    ev.stopPropagation();
    setHistorySearches(removeHistoySearch(historySearches, historySearchIndex));
  };

  const onSelectSearch = (ev: React.SyntheticEvent) => {
    ev.stopPropagation();
    setHistorySearches(
      saveHistoySearch(historySearches, historySearchIndex, historySearch)
    );
    setIsSearchBoxFocus(false);
  };

  // Style
  const theme: ThemeModel = useTheme();
  const classes = useStyles({ theme });

  // HTML
  return (
    <li className={classes["search-preview"]} onClick={onSelectSearch}>
      <section className="flex a-center">
        {/* Todo: if is searchSuggestions show mag icon */}
        <IconPng name={IconPngUrlModel.History} />
        <span>
          {filterBy.term
            ? boldAutocomplatePipe(historySearch, filterBy.term)
            : historySearch}
        </span>
      </section>
      {/* Todo: show trash img only if is historySerches but not if is searchSuggestions */}
      <button className="pointer" onClick={onRemoveHistorySearch}>
        <IconPng name={IconPngUrlModel.Trash} />
      </button>
    </li>
  );
};

const useStyles = createUseStyles((theme: ThemeModel) => ({
  "search-preview": {
    cursor: "pointer",
    color: theme.variables["grey-8"],
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: 31,
    transition: "background-Color .3s",
    "&:hover": {
      backgroundColor: "#00000005",
    },
  },
}));

interface SearchPreviewType {
  historySearch: string;
  historySearchIndex: number;
}
