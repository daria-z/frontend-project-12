import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';
import NotFound from './pages/NotFound.jsx';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
  )
}

export default App
