// ******* function Helpers *********
const saveItem = (arr: string[], index: number, newItem: string) => {
  return index === -1
    ? _addItem(arr, newItem)
    : _jumpItemTopList(arr, index, newItem);
};

const removeItem = (arr: string[], index: number) => {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
};

const _addItem = (arr: string[], newItem: any) => {
  return [cleanStr(newItem), ...arr];
};

const _jumpItemTopList = (arr: string[], index: number, newItem: any) => {
  return [newItem, ...arr.slice(0, index), ...arr.slice(index + 1)];
};

const isSame = (str_1: string, str_2: string) => {
  return str_1 === cleanStr(str_2);
};

const cleanStr = (str: string) => {
  return str.toLowerCase().trim();
};

const filterByTerm = (allSearches: string[], termInput: string) => {
  // Todo: Improving performance by stopping filtering after total items
  return allSearches.filter((search) => search.includes(termInput));
};
// ******* End => function Helpers *********

export {
  // helpers
  cleanStr,
  saveItem,
  removeItem,
  filterByTerm,
  isSame
};
