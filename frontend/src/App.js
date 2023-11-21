
import { useState } from 'react';

import './App.css';

import AppRoutes from './routes/index.js';

function App() {
  // State to track login status
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <div className="App">
      {/* Pass isLoggedIn as a prop to AppRoutes */}
      <AppRoutes isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    </div>
  );
}

export default App;