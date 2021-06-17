import { atom, selector } from 'recoil';

// ******* function Helpers *********
const saveItem = (arr, index, newItem) => {
  return index === -1 ? _addItem(arr, newItem) : _jumpItemTopList(arr, index, newItem);
}

const removeItem = (arr, index) => {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

const _addItem = (arr, newItem) => {
  return [newItem, ...arr];
}

const _jumpItemTopList = (arr, index, newItem) => {
  return [_cleanStr(newItem), ...arr.slice(0, index), ...arr.slice(index + 1)];
}

const _isSame = (str_1, str_2) => {
  return str_1 === _cleanStr(str_2)
}

const _cleanStr = (str) => {
  return str.toLowerCase().trim()
}

const _filterByTerm = (allSearches, termInput) => {
  // Todo: Improving performance by stopping filtering after total items
  return allSearches.filter(search => search.includes(termInput))
}
// ******* End => function Helpers *********


// ******* Atoms *********
const isSearchBoxFocusState = atom({
  key: 'isSearchBoxState',
  default: false,
});

const termInputState = atom({
  key: 'termInputState',
  default: '',
});

const searchSuggestionsState = atom({
  key: 'searchSuggestions',
  default: [] // "Lorem ipsum dolor sit amet dicta minima possimus magni voluptas!".split(" ").map(str => _cleanStr(str))
});

const historySearchesState = atom({
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