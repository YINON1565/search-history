// ******* function Helpers *********
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

export {
  cleanStr,
  filterByTerm,
  isSame
};
