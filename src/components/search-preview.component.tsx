import React from "react";

import {
  historySearchesState,
  isSearchBoxFocusState,
  saveItem,
  removeItem,
  termInputState,
} from "../states/search-box.state";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { IconPngUrlModel } from "../services/icon-png.service";
import { IconPng } from "./icon-png.component";
import { createUseStyles, useTheme } from "react-jss";
import { ThemeModel } from "../App";

export const SearchPreview = ({
  historySearch,
  historySearchIndex,
}: SearchPreviewType) => {
  // Recoil state
  const [historySearches, setHistorySearches] =
    useRecoilState(historySearchesState);
  const termInput = useRecoilValue(termInputState);
  const setIsSearchBoxFocus = useSetRecoilState(isSearchBoxFocusState);

  // Events
  const onRemoveHistorySearch = (ev: React.SyntheticEvent) => {
    ev.stopPropagation();
    setHistorySearches(removeItem(historySearches, historySearchIndex));
  };

  const onSelectSearch = (ev: React.SyntheticEvent) => {
    ev.stopPropagation();
    setHistorySearches(
      saveItem(historySearches, historySearchIndex, historySearch)
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
          {termInput
            ? _boldAutocomplatePipe(historySearch, termInput)
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

// Helpers
const splitter = "#%%#@#";

const _boldAutocomplatePipe = (search: string, term: string): JSX.Element[] => {
  return search
    .replace(term, splitter + term + splitter)
    .split(splitter)
    .map((letter, i) => {
      return letter === term ? (
        <span key={i}>{term}</span>
      ) : (
        <b key={i}>{letter}</b>
      );
    });
};
