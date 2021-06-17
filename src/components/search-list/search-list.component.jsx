import "./search-list.component.scss";

import React from "react";
import { SearchPreview } from "../search-preview/search-preview.component";

export const SearchList = ({ historySearches }) => {
  return (
    <ul className="search-list">
      {historySearches.map((historySearch, index) => {
        return <SearchPreview key={index} historySearch={historySearch} historySearchIndex={index} />;
      })}
    </ul>
  );
};
