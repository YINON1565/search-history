import { RecoilRoot } from "recoil";
import { SearchBox } from "./components/search-box.component";
import { ThemeProvider } from "react-jss";
import { variables, VariablesModel } from "./styles/setup/variables.jss";

const theme: ThemeModel = {
  variables,
};

export interface ThemeModel {
  variables: VariablesModel;
}

function App() {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <SearchBox />
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
