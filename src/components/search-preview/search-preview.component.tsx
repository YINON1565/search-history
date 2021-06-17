import "./search-preview.component.scss";

import React from "react";

// Todo: requset src img once from service
import historyIcon from "../../assets/icons/history.png";
import trashIcon from "../../assets/icons/trash.png";
import {
  historySearchesState,
  isSearchBoxFocusState,
  saveItem,
  removeItem,
  termInputState,
} from "../../states/search-box.state";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

export const SearchPreview = ({ historySearch, historySearchIndex } : {historySearch: string, historySearchIndex : number}) => {
  const [historySearches, setHistorySearches] =
    useRecoilState(historySearchesState);

  const termInput = useRecoilValue(termInputState);

  const setIsSearchBoxFocus = useSetRecoilState(isSearchBoxFocusState);

  const onRemoveHistorySearch = (ev : React.SyntheticEvent) => {
    ev.stopPropagation();
    setHistorySearches(removeItem(historySearches, historySearchIndex));
  };

  const onSelectSearch = (ev : React.SyntheticEvent) => {
    ev.stopPropagation();
    setHistorySearches(
      saveItem(historySearches, historySearchIndex, historySearch)
    );
    setIsSearchBoxFocus(false);
  };

  const splitter = "#%%#@#";

  return (
    <li className="search-preview" onClick={onSelectSearch}>
      <section className="flex a-center">
        {/* Todo: if is searchSuggestions show mag icon */}
        <img className="png-icon" src={historyIcon} alt="History" />
        <span>
          {termInput
            ? historySearch
                .replace(termInput, splitter + termInput + splitter)
                .split(splitter)
                .map((letter, i) => {
                  return letter === termInput ? (
                    <span key={i}>{termInput}</span>
                  ) : (
                    <b key={i}>{letter}</b>
                  );
                })
            : historySearch}
        </span>
      </section>
      {/* Todo: show trash img only if is historySerches but not if is searchSuggestions */}
      <button className="pointer" onClick={onRemoveHistorySearch}>
        <img className="png-icon" src={trashIcon} alt="trash" />
      </button>
    </li>
  );
};
