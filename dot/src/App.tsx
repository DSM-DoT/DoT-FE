import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import { Text } from './pages/Text';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/scan' element={<Text />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
