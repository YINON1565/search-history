// Style
import { createUseStyles, useTheme } from "react-jss";
import { ThemeModel } from "../../App";

// State
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  historySearchesState,
  isSearchBoxFocusState,
  searchSimilarTermInputIdxState,
  filterByState,
  isSearchLoadingState,
} from "../../states/search-history.state";
import { saveHistoySearch } from "../../states/search-history-operations";

// components
import { TextInput } from "../helpers/text-input.component";
import { ShowOrHide } from "../helpers/show-or-hide.component";
import { IconPng } from "../helpers/icon-png.component";
import rollingSvg from "../../assets/icons/rolling.svg";

// interface
import { IconPngUrlModel } from "../../util/icon-png";

export const FormSearch = () => {
  // React state
  const [termInput, setTermInput] = useState("");
  
  useEffect(() => {
    setFilterBy({ term: termInput });
    termInput && setIsSearchBoxFocus(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [termInput]);
  
  // Recoil state
  const [isLoading, setIsLoading] = useRecoilState(isSearchLoadingState);
  const searchSimilarTermInputIdx = useRecoilValue(searchSimilarTermInputIdxState);
  const [filterBy, setFilterBy] = useRecoilState(filterByState);
  const [historySearches, setHistorySearches] =
    useRecoilState(historySearchesState);
  const setIsSearchBoxFocus = useSetRecoilState(isSearchBoxFocusState);

  // Events
  const onSubmit = (ev: React.SyntheticEvent) => {
    ev.preventDefault();
    if (filterBy.term) {
      setHistorySearches(
        saveHistoySearch(historySearches, searchSimilarTermInputIdx, filterBy.term)
      );
      setTermInput("");
      setIsSearchBoxFocus(false);
      
      // Toggle Loading for Fake Search
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };

  // Style
  const theme: ThemeModel = useTheme();
  const classes = useStyles({ theme });

  // HTML
  return (
    <form onSubmit={onSubmit}>
      <section className={classes["search-input"]}>
        <IconPng name={IconPngUrlModel.Mag} />
        <TextInput onInputChange={setTermInput} term={termInput} />
        <ShowOrHide isShow={!!filterBy.term?.length}>
          <button
            type="button"
            onClick={() => setTermInput("")}
            className="pointer"
          >
            <IconPng name={IconPngUrlModel.Cencel} />
          </button>
        </ShowOrHide>
      </section>
      <button
        onClick={(ev) => ev.stopPropagation()}
        className={classes["submit-button"]}
      >
        <ShowOrHide isShow={isLoading} else="search">
          <img src={rollingSvg} alt="search.." />
        </ShowOrHide>
      </button>
    </form>
  );
};

const useStyles = createUseStyles((theme: ThemeModel) => ({
  "search-input": {
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
  },
  "submit-button": {
    cursor: "pointer",
    height: theme.variables["default-el-height"],
    position: "absolute",
    top: 0,
    left: "calc(100% + 16px)",
    borderRadius: theme.variables.radius,
    width: 102,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 15,
    textTransform: "capitalize",
    backgroundColor: theme.variables.primary,
    color: "#fff",
    transition: "opacity .3s",
    "&:hover": {
      opacity: 0.7,
    },
  },
}));
