import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import { Start } from './pages/Start';
import { Scan } from './pages/Scan';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/scan' element={<Scan />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
