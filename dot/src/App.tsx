import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
<<<<<<< HEAD
=======
import { Start } from './pages/Start';
>>>>>>> origin/scan
import { Scan } from './pages/Scan';

function App() {
  return (
    <BrowserRouter>
      <Routes>
<<<<<<< HEAD
=======
        <Route path='/' element={<Start />} />
>>>>>>> origin/scan
        <Route path='/scan' element={<Scan />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
