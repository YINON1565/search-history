import { atom, selector } from 'recoil';

// ******* function Helpers *********
const saveItem = (arr: string[], index: number, newItem : string) => {
  return index === -1 ? _addItem(arr, newItem) : _jumpItemTopList(arr, index, newItem);
}

const removeItem = (arr: string[], index : number) => {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

const _addItem = (arr : string[], newItem : any) => {
  return [_cleanStr(newItem), ...arr];
}

const _jumpItemTopList = (arr : string[], index : number, newItem : any) => {
  return [newItem, ...arr.slice(0, index), ...arr.slice(index + 1)];
}

const _isSame = (str_1 : string, str_2 : string) => {
  return str_1 === _cleanStr(str_2)
}

const _cleanStr = (str : string) => {
  return str.toLowerCase().trim()
}

const _filterByTerm = (allSearches : string[], termInput : string) => {
  // Todo: Improving performance by stopping filtering after total items
  return allSearches.filter(search => search.includes(termInput))
}
// ******* End => function Helpers *********


// ******* Atoms *********
const isSearchBoxFocusState = atom<boolean>({
  key: 'isSearchBoxState',
  default: false,
});

const termInputState = atom<string>({
  key: 'termInputState',
  default: '',
});

const searchSuggestionsState = atom<string[]>({
  key: 'searchSuggestions',
  default: [] // "Lorem ipsum dolor sit amet dicta minima possimus magni voluptas!".split(" ").map(str => _cleanStr(str))
});

const historySearchesState = atom<string[]>({
  key: 'historySearchesState',
  default: [],
});
// ******* End => Atoms *********


// ******* Selectors *********
const termInputAsRegexState = selector({
  key: 'termInputAsRegexState',
  get: ({ get }) => {
    const termInput = get(termInputState);
    return new RegExp(termInput, 'i')
  }
});

const sameSearchIdxState = selector({
  key: 'isTermInputExistState',
  get: ({ get }) => {
    const termInput = get(termInputState);
    return termInput ? get(historySearchesState).findIndex(historySearch => _isSame(historySearch, termInput)) : -1;
  }
});

const allSearchesState = selector({
  key: 'allSearchesState',
  get: ({ get }) => {
    const historySearches = get(historySearchesState)
    return [...historySearches, ...(get(searchSuggestionsState).filter(searchSuggestion => !historySearches.some(historySearch => historySearch === searchSuggestion)))];
  }
});

const allSearchesfilteredState = selector({
  key: 'allSearchesfilteredState',
  get: ({ get }) => {
    const termInput = get(termInputState);
    const allSearches = JSON.parse(JSON.stringify(get(allSearchesState)));
    const allSearchesFiltered = termInput ? _filterByTerm(allSearches, termInput) : allSearches;
    return allSearchesFiltered.splice(0, 10)
  }
});

const isTermInputState = selector({
  key: 'isTermInputState',
  get: ({ get }) => {
    return get(termInputState).length;
  }
});
// ******* End => Selectors *********

// interface Search {
//   id : string,
//   txt: string,
//   counter : number,
//   lastAt : number
// }


export {
  // helpers
  saveItem,
  removeItem,
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
  isTermInputState
}