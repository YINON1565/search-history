import { cleanStr } from "./util.hook";

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

export {
  saveItem,
  removeItem,
};
