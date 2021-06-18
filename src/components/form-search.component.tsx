import { TextInput } from "./text-input.component";

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  historySearchesState,
  isSearchBoxFocusState,
  sameSearchIdxState,
  saveItem,
  termInputState,
} from "../states/search-box.state";
import { IconPngUrlModel } from "../services/icon-png.service";
import { IconPng } from "./icon-png.component";
import { createUseStyles, useTheme } from "react-jss";
import { ThemeModel } from "../App";
export const FormSearch = () => {
  // Recoil state
  const sameSearchIdx = useRecoilValue(sameSearchIdxState);
  const [termInput, setTermInput] = useRecoilState(termInputState);
  const [historySearches, setHistorySearches] =
    useRecoilState(historySearchesState);
  const setIsSearchBoxFocus = useSetRecoilState(isSearchBoxFocusState);

  // Events
  const onSubmit = (ev: React.SyntheticEvent) => {
    ev.preventDefault();
    if (termInput) {
      setHistorySearches(saveItem(historySearches, sameSearchIdx, termInput));
      setTermInput("");
      setIsSearchBoxFocus(false);
    }
  };

  const onSetTermInput = (value: string) => {
    setTermInput(value);
    value && setIsSearchBoxFocus(true);
  };

  // Style
  const theme: ThemeModel = useTheme();
  const classes = useStyles({ theme });

  // HTML
  return (
    <form onSubmit={onSubmit}>
      <section className={classes["controller-area"]}>
        <IconPng name={IconPngUrlModel.Mag} />
        <TextInput onInputChange={onSetTermInput} term={termInput} />
        {termInput?.length ? (
          <button
            type="button"
            onClick={() => onSetTermInput("")}
            className="pointer"
          >
            <IconPng name={IconPngUrlModel.Cencel} />
          </button>
        ) : (
          ""
        )}
      </section>
      <button className={classes["submit-button"]}>search</button>
    </form>
  );
};

const useStyles = createUseStyles((theme: ThemeModel) => ({
  "controller-area": {
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
  },
  "submit-button": {
    cursor: 'pointer',
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
  },
}));
