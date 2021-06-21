import { cleanStr } from "../util/helpers";

const saveHistoySearch = (historySearches: string[], index: number, newItem: string) => {
  return index === -1
    ? _addHistoySearch(historySearches, newItem)
    : _jumpHistoySearchToTopList(historySearches, index, newItem);
};

const removeHistoySearch = (historySearches: string[], index: number) => {
  return [...historySearches.slice(0, index), ...historySearches.slice(index + 1)];
};

const _addHistoySearch = (historySearches: string[], newItem: any) => {
  return [cleanStr(newItem), ...historySearches];
};

const _jumpHistoySearchToTopList = (historySearches: string[], index: number, newItem: any) => {
  return [newItem, ...historySearches.slice(0, index), ...historySearches.slice(index + 1)];
};

const filterSearches = (allSearches: string[], termInput: string) => {
  // Todo: Improving performance by stopping filtering after total items
  return allSearches.filter((search) => search.includes(termInput));
};

export {
  saveHistoySearch,
  removeHistoySearch,
  filterSearches
};
