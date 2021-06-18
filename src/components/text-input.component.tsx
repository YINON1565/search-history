import { createUseStyles, useTheme } from "react-jss";
import { ThemeModel } from "../App";

export const TextInput = ({ onInputChange, term }: TextInputType) => {
  const theme: ThemeModel = useTheme();
  const classes = useStyles({ theme });
  return (
    <input
      className={classes["custon-input"]}
      type="text"
      autoComplete="off"
      value={term}
      onChange={(ev) => onInputChange(ev.target.value)}
    />
  );
};

const useStyles = createUseStyles((theme: ThemeModel) => ({
  "custon-input": {
    height: theme.variables["default-el-height"],
    width: "100%",
    border: "none",
    outline: "none",
    color: "#12263F",
    caretColor: "#212121",
    fontSize: 15,
  },
}));

interface TextInputType {
  onInputChange: (term: string) => void;
  term: string;
}
