import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import { Text } from './pages/Text';
import { Start } from './pages/Start';
import { Scan } from './pages/Scan';
import { Quiz } from './pages/Quiz';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/scan' element={<Scan />} />
        <Route path='/text' element={<Text />} />
        <Route path='/quiz' element={<Quiz />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
