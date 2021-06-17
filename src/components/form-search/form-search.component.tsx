import "./form-search.component.scss";

import { TextInput } from "../text-input/text-input.component";

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  historySearchesState,
  isSearchBoxFocusState,
  sameSearchIdxState,
  saveItem,
  termInputState,
} from "../../states/search-box.state";
import { IconPngUrlModel } from "../../services/icon-png.service";
import { IconPng } from "../icon-png.component";
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

  // HTML
  return (
    <form onSubmit={onSubmit}>
      <section className="controller-area">
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
      <button className="submit-button pointer">search</button>
    </form>
  );
};
