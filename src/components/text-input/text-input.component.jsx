import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  isSearchBoxFocusState,
  termInputState,
} from "../../states/search-box.state";
import "./text-input.component.scss";

export const TextInput = () => {
  const [termInput, setTermInput] = useRecoilState(termInputState);
  const setisSearchBoxFocus = useSetRecoilState(isSearchBoxFocusState);

  const onInputChange = (ev) => {
    const { value } = ev.target;
    setTermInput(value);
    value && setisSearchBoxFocus(true);
  };

  return (
    <>
      {/* Todo: Add "custon caret" in height and width as in design  */}
      <input
        type="text"
        autoComplete="off"
        value={termInput}
        onChange={onInputChange}
      />
    </>
  );
};
