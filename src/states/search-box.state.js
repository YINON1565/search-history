import { atom, selector } from 'recoil';


// ******* function Helpers *********
const addItem = (arr, index, newItem) => {
  return index === -1 ? [newItem, ...arr] : _jumpItemTopList(arr, index, newItem);
}

const _jumpItemTopList = (arr, index, newItem) => {
  return [_cleanStr(newItem), ...arr.slice(0, index), ...arr.slice(index + 1)];
}

const removeItem = (arr, index) => {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

const _isSame = (str_1, str_2) => {
  return str_1 === _cleanStr(str_2)
}

const _cleanStr = (str) => {
  return str.toLowerCase().trim()
}

const _filter = (allSearches, termInput) => {
  // const regex = new RegExp(termInput, 'gi');
  return allSearches.filter(search => search.includes(termInput))
    // .map(search => {
    //   return search.replace(termInput, <span class="no-bold">termInput</span>)
    //   let match = regex.exec(search);
    //   let startIndex = match ? match.index : null
    //   // ?
    //   // console.log();
    //   // return search
    //   console.log(match, 'match');
    //   console.log(startIndex, 'startIndex');
    //   if (startIndex) {
    //     let endIndex = startIndex + termInput.length
    //     return search.split('').map((searchLetter, i) => {
    //       return  (i >= startIndex && i < endIndex)
    //         ? `<bold>${searchLetter}</bold>`
    //         : `<span>${searchLetter}</span>`
    //     }).join('')
    //   } else {
    //     return search
    //   }
    // })
}

export const isSearchBoxFocusState = atom({
  key: 'isSearchBoxState',
  default: false,
});

export const termInputState = atom({
  key: 'termInputState',
  default: '',
});

export const searchSuggestionsState = atom({
  key: 'searchSuggestions',
  default: []
  // default: "Lorem ipsum dolor sit amet dicta minima possimus magni voluptas!".split(
  //   " "
  // ).map(str => _cleanStr(str))
});


export const historySearchesState = atom({
  key: 'historySearchesState',
  default: [],
});

export const termInputAsRegexState = selector({
  key: 'termInputAsRegexState',
  get: ({ get }) => {
    const termInput = get(termInputState);
    return new RegExp(termInput, 'i')
    // return termInput ? get(historySearchesState).findIndex(historySearch => _isSame(historySearch, termInput)) : -1;
  }
});

export const sameSearchIdxState = selector({
  key: 'isTermInputExistState',
  get: ({ get }) => {
    const termInput = get(termInputState);
    return termInput ? get(historySearchesState).findIndex(historySearch => _isSame(historySearch, termInput)) : -1;
  }
});

export const allSearchesState = selector({
  key: 'allSearchesState',
  get: ({ get }) => {
    const historySearches = get(historySearchesState)
    return [...historySearches, ...(get(searchSuggestionsState).filter(searchSuggestion => !historySearches.some(historySearch => historySearch === searchSuggestion)))];
  }
});

export const allSearchesfilteredState = selector({
  key: 'allSearchesfilteredState',
  get: ({ get }) => {
    const termInput = get(termInputState);
    const allSearches = JSON.parse(JSON.stringify(get(allSearchesState)));
    const allSearchesFiltered = termInput ? _filter(allSearches, termInput) : allSearches;
    return allSearchesFiltered.splice(0, 10)
  }
});

export const isTermInputState = selector({
  key: 'isTermInputState',
  get: ({ get }) => {
    return get(termInputState).length;
  }
});


export {
  addItem,
  removeItem
}

// export const todoListState = atom({
//   key: 'todoListState',
//   default: [],
// });

// export const todoListFilterState = atom({
//   key: 'todoListFilterState',
//   default: 'Show All',
// });

// export const filteredTodoListState = selector({
//   key: 'filteredTodoListState',
//   get: ({get}) => {
//     const filter = get(todoListFilterState);
//     const list = get(todoListState);

//     switch (filter) {
//       case 'Show Completed':
//         return list.filter(item => item.isComplete);
//       case 'Show Uncompleted':
//         return list.filter(item => !item.isComplete);
//       default:
//         return list;
//     }
//   },
// });

// export const todoListStatsState = selector({
//   key: 'todoListStatsState',
//   get: ({get}) => {
//     const todoList = get(todoListState);
//     const totalNum = todoList.length;
//     const totalCompletedNum = todoList.filter(item => item.isComplete).length;
//     const totalUncompletedNum = totalNum - totalCompletedNum;
//     const percentCompleted =
//       totalNum === 0 ? 0 : (totalCompletedNum / totalNum) * 100;

//     return {
//       totalNum,
//       totalCompletedNum,
//       totalUncompletedNum,
//       percentCompleted,
//     };
//   },
// });
