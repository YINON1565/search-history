import { RecoilRoot } from "recoil";
import { ThemeProvider } from "react-jss";
import { variables, VariablesModel } from "./styles/setup/variables.jss";
import { SearchBox } from "./components/search-box/search-box.component";

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
