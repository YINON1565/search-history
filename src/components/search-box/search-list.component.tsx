import { SearchPreview } from "./search-preview.component";

// Style
import { ThemeModel } from "../../App";
import { createUseStyles, useTheme } from "react-jss";

export const SearchList = ({
  historySearches,
}: {
  historySearches: string[];
}) => {
  // Style
  const theme: ThemeModel = useTheme();
  const classes = useStyles({ theme });

  return (
    <ul className={classes["search-list"]}>
      {historySearches.map((historySearch, index) => {
        return (
          <SearchPreview
            key={index}
            historySearch={historySearch}
            historySearchIndex={index}
          />
        );
      })}
    </ul>
  );
};

const useStyles = createUseStyles((theme: ThemeModel) => ({
  "search-list": {
    borderBlockStart: `1px solid ${theme.variables["grey-2"]}`,
    animation: "fade 0.5s, collaps 0.2s",
    maxHeight: theme.variables["search-list"],
    padding: "16px 0",
  },
}));
