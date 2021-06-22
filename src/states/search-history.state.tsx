import { atom, selector } from "recoil";
import { cleanStr, isSame } from "../util/helpers";
import { localStorageEffect } from "../util/storage-effect";
import { keyupHandlingEffect } from "../util/keyboard-effect";
import { filterSearches } from "./search-history-operations";

// ******* Configurations *********
const HISTORY_SEARCHES_STOREAGE_KEY = "history-searches";

// ******* Atoms *********
const isSearchBoxFocusState = atom<boolean>({
  key: "isSearchBoxFocusState",
  default: false,
  effects_UNSTABLE: [keyupHandlingEffect()],
});

const filterByState = atom<FilterByModel>({
  key: "termInputState",
  default: {term: ''},
});

const searchSuggestionsState = atom<string[]>({
  key: "searchSuggestions",
  default: [], // "Lorem ipsum dolor sit amet dicta minima possimus magni voluptas!".split(" ").map(str => _cleanStr(str))
});

const historySearchesState = atom<string[]>({
  key: "historySearchesState",
  default: [],
  effects_UNSTABLE: [localStorageEffect<string[]>(HISTORY_SEARCHES_STOREAGE_KEY)],
});
// ******* End => Atoms *********

// ******* Selectors *********
const searchSimilarTermInputIdxState = selector({
  key: "searchSimilarTermInputIdxState",
  get: ({ get }) => {
    const filterBy = get(filterByState);
    return filterBy.term
      ? get(historySearchesState).findIndex((historySearch) =>
          isSame(historySearch, filterBy.term)
        )
      : -1;
  },
});

const allSearchesState = selector({
  key: "allSearchesState",
  get: ({ get }) => {
    const historySearches = get(historySearchesState);
    return historySearches;
    // **** Exclude from comment, if you want support for suggested searches ****
    // Todo: Need to improve performance
    // return [...historySearches, ...(get(searchSuggestionsState).filter(searchSuggestion => !historySearches.some(historySearch => historySearch === searchSuggestion)))];
  },
});

const allSearchesfilteredState = selector({
  key: "allSearchesfilteredState",
  get: ({ get }) => {
    const termInput = cleanStr(get(filterByState).term);
    const allSearches = JSON.parse(JSON.stringify(get(allSearchesState)));
    const allSearchesFiltered = termInput
      ? filterSearches(allSearches, termInput)
      : allSearches;
    return allSearchesFiltered.splice(0, 10);
  },
});

// ******* End => Selectors *********

// ----- Infrastructure for using suggested keywords ----
// interface SuggestionSearch {
//   _id: string;
//   txt: string;
// }
// interface HistorySearch extends SuggestionSearch {
  //   isFromHistory: boolean;
  //   counter: number;
  //   lastAt: number; // at timestamp
// }

export {
  // atoms
  isSearchBoxFocusState,
  filterByState,
  searchSuggestionsState,
  historySearchesState,
  // selectors
  searchSimilarTermInputIdxState,
  allSearchesState,
  allSearchesfilteredState,
};

// Types
export interface FilterByModel {
  term: string
}
