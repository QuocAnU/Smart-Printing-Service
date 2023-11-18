import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ListPage from './pages/Admin/ListPage/ListPage';
import HomePage from './pages/User/HomePage/HomePage';
import Dashboard from './pages/Admin/Dashboard/Dashboard';
import { Navbar } from './components/Header/Header';
// import Forms from './components/AddBooks/Addbooks';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/adminlist/*' element={<ListPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path='/form' element={Forms} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;