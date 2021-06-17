import './App.scss';

import React from 'react';
import { RecoilRoot } from 'recoil';
import { SearchBox } from './components/search-box/search-box.component';
function App() {
  return (
    <RecoilRoot>
        <SearchBox />
    </RecoilRoot>
  );
}

export default App;
