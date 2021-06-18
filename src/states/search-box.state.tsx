import { atom, selector } from "recoil";
import { cleanStr, filterByTerm, isSame } from "../services/util.service";

// ******* Atoms *********
const isSearchBoxFocusState = atom<boolean>({
  key: "isSearchBoxFocusState",
  default: false,
});

const termInputState = atom<string>({
  key: "termInputState",
  default: "",
});

const searchSuggestionsState = atom<string[]>({
  key: "searchSuggestions",
  default: [], // "Lorem ipsum dolor sit amet dicta minima possimus magni voluptas!".split(" ").map(str => _cleanStr(str))
});

const historySearchesState = atom<string[]>({
  key: "historySearchesState",
  default: [],
});
// ******* End => Atoms *********

// ******* Selectors *********
const termInputAsRegexState = selector({
  key: "termInputAsRegexState",
  get: ({ get }) => {
    const termInput = get(termInputState);
    return new RegExp(termInput, "i");
  },
});

const sameSearchIdxState = selector({
  key: "isTermInputExistState",
  get: ({ get }) => {
    const termInput = get(termInputState);
    return termInput
      ? get(historySearchesState).findIndex((historySearch) =>
          isSame(historySearch, termInput)
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
    const termInput = cleanStr(get(termInputState));
    const allSearches = JSON.parse(JSON.stringify(get(allSearchesState)));
    const allSearchesFiltered = termInput
      ? filterByTerm(allSearches, termInput)
      : allSearches;
    return allSearchesFiltered.splice(0, 10);
  },
});

// ******* End => Selectors *********

// interface Search {
//   _id : string,
//   term: string,
//   counter : number,
//   lastAt : number
// }

export {
  // atoms
  isSearchBoxFocusState,
  termInputState,
  searchSuggestionsState,
  historySearchesState,
  // selectors
  termInputAsRegexState,
  sameSearchIdxState,
  allSearchesState,
  allSearchesfilteredState,
};
