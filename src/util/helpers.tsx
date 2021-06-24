// ******* function Helpers *********
const isSame = (str_1: string, str_2: string) => {
  return str_1 === cleanStr(str_2);
};

const cleanStr = (str: string) => {
  return str.toLowerCase().trim();
};

const boldAutocomplatePipe = (search: string, term: string): JSX.Element => {
  const cleanTerm = cleanStr(term);
  const startIdx = search.indexOf(cleanTerm);
  return (
    <>
      <b>{search.substring(0, startIdx)}</b>
      <span>{cleanTerm}</span>
      <b>{search.substring(startIdx + cleanTerm.length)}</b>
    </>
  );
};

export { cleanStr, isSame, boldAutocomplatePipe };
