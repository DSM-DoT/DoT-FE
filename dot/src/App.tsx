import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import { Start } from './pages/Start';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Start />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
