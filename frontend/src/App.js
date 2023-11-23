
import { useState } from 'react';

import './App.css';

import AppRoutes from './routes/index.js';

function App() {
  // State to track login status
  const [showHeader, setShowHeader] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  return (
    <div className="App">
      {/* Pass isLoggedIn as a prop to AppRoutes */}
      <AppRoutes showHeader={showHeader} setShowHeader={setShowHeader} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    </div>
  );
}

export default App;