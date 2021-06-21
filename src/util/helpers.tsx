const SPLITTER = "#%%#@#";

// ******* function Helpers *********
const isSame = (str_1: string, str_2: string) => {
  return str_1 === cleanStr(str_2);
};

const cleanStr = (str: string) => {
  return str.toLowerCase().trim();
};

const boldAutocomplatePipe = (search: string, term: string): JSX.Element[] => {
  const cleanTerm = cleanStr(term);
  return search
    .replace(cleanTerm, SPLITTER + cleanTerm + SPLITTER)
    .split(SPLITTER)
    .map((partSearch, i) => {
      return partSearch === cleanTerm ? (
        <span key={i}>{cleanTerm}</span>
      ) : (
        <b key={i}>{partSearch}</b>
      );
    });
};

export {
  cleanStr,
  isSame,
  boldAutocomplatePipe
};
