import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import { Scan } from './pages/Scan';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/scan' element={<Scan />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
