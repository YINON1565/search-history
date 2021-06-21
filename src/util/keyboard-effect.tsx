import { AtomEffect } from "recoil";

export const keyupHandlingEffect: <T>() => AtomEffect<T> =
  () =>
  ({ onSet, resetSelf }) => {
    onSet((isSearchBoxFocus) => {
      isSearchBoxFocus
        ? window.addEventListener("keyup", (ev: KeyboardEvent) => _keyupHandling(ev, resetSelf))
        : window.removeEventListener("keyup", (ev: KeyboardEvent) => _keyupHandling(ev, resetSelf));
    });
  };

const _keyupHandling = (ev: KeyboardEvent, resetSelf: () => void) => {
  if (ev.key === "Escape") {
    resetSelf();
  }
};
