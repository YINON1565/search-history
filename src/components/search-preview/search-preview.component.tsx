import "./search-preview.component.scss";

import React from "react";

import {
  historySearchesState,
  isSearchBoxFocusState,
  saveItem,
  removeItem,
  termInputState,
} from "../../states/search-box.state";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { IconPngUrlModel } from "../../services/icon-png.service";
import { IconPng } from "../icon-png.component";

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

  // HTML
  return (
    <li className="search-preview" onClick={onSelectSearch}>
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
