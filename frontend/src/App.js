
import { useState, useEffect } from 'react';

import './App.css';

import AppRoutes from './routes/index.js';


import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './components/Store/reducer.js';

const store = createStore(reducer);


function App() {
  // State to track login status
  // const [showHeader, setShowHeader] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      // console.log('Checking login status', isLoggedIn);
      const storedLoggedIn = await localStorage.getItem('isLoggedIn') === 'true';
      // const storeShowHeader = await localStorage.getItem('showHeader') === 'false';
      // setShowHeader(storeShowHeader);
      setIsLoggedIn(storedLoggedIn);
    };

    checkLoginStatus();
  }, []);



  return (
    <div className="App">
      <Provider store={store}>
        {/* Pass isLoggedIn as a prop to AppRoutes */}

        {/* <AppRoutes showHeader={showHeader} setShowHeader={setShowHeader} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /> */}
        <AppRoutes isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </Provider>
    </div>
  );
}

export default App;