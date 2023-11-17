import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Login from './pages/Login/Login';
import HomePage from './pages/HomePage/Homepage';
import './App.css';
import PrintPrepare from './pages/PrintPreparePage/PrintPrepare';
import ListPrinter from './pages/ChoosePrintPage/ListPrinter';
function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path='/print' element={<PrintPrepare />} />
          <Route path='/listprinter' element={<ListPrinter />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;