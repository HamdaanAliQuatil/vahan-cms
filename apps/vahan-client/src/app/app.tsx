// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';

import { Route, Routes, Link } from 'react-router-dom';
import SearchBox from './components/search-box'
import TabComponent from './components/tab-box';

export function App() {
  return (
    <div>
      {/* START: routes */}
      {/* These routes and navigation have been generated for you */}
      {/* Feel free to move and update them to fit your needs */}
      <br />
      <hr />
      <br />
      <SearchBox />
      <br />
      <hr />
      <br />

      <TabComponent />
    </div>
  );
}

export default App;
