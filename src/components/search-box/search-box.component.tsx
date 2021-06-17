import "./search-box.component.scss";

import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { TextInput } from "../text-input/text-input.component";
import { SearchList } from "../search-list/search-list.component";

import {
  allSearchesfilteredState,
  historySearchesState,
  isSearchBoxFocusState,
  sameSearchIdxState,
  isTermInputState,
  termInputState,
  saveItem,
} from "../../states/search-box.state";
import magIcon from "../../assets/icons/mag-dark.png";
import cencelIcon from "../../assets/icons/cencel.png";

export const SearchBox = () => {
  const isTermInput = useRecoilValue(isTermInputState);
  const sameSearchIdx = useRecoilValue(sameSearchIdxState);
  const [termInput, setTermInput] = useRecoilState(termInputState);
  const onCleanBtnClick = () => {
    setTermInput("");
  };

  const allSearchesfiltered = useRecoilValue(allSearchesfilteredState);
  const [historySearches, setHistorySearches] =
    useRecoilState(historySearchesState);
  // **** search box focusing ****
  const [isSearchBoxFocus, setIsSearchBoxFocus] = useRecoilState(
    isSearchBoxFocusState
  );

  const toggleFocus = (isSearchBox : boolean, ev? : React.MouseEvent<HTMLElement>) => {
    ev && ev.stopPropagation();
    setIsSearchBoxFocus(isSearchBox);
  };

  const onSubmit = (ev : React.SyntheticEvent) => {
    ev.preventDefault();
    if (termInput) {
      setHistorySearches(
        saveItem(historySearches, sameSearchIdx, termInput)
      );
      setTermInput("");
      setIsSearchBoxFocus(false);
    }
  };
  // *****************************

  return (
    <>
      <section
        onClick={() => toggleFocus(false)}
        className="search-box-container"
      >
        <section
          className={`${isSearchBoxFocus ? "focus" : ""} search-box`}
          onClick={(ev : React.MouseEvent<HTMLElement>) => toggleFocus(true, ev)}
        >
          <form onSubmit={onSubmit}>
            <section className="controller-area">
              <img className="png-icon" src={magIcon} alt="Mag" />
              <TextInput />
              {isTermInput ? (
                <button
                  type="button"
                  onClick={onCleanBtnClick}
                  className="pointer"
                >
                  <img className="png-icon" src={cencelIcon} alt="Clean" />
                </button>
              ) : (
                ""
              )}
            </section>
            <button className="submit-button pointer">search</button>
          </form>
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
