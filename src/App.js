import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';

import WeatherPage from './containers/WeatherPage';

store.subscribe(() => {
  console.log("store --> " );
})

function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <WeatherPage></WeatherPage>
    </div>
    </Provider>
  );
}

export default App;
