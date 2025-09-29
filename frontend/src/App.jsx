import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';


import Header from './components/Header/Header.jsx';
import Chat from './pages/Chat.jsx';
import Login from './pages/Login.jsx';
import NotFound from './pages/NotFound.jsx';


function App() {
  const token = localStorage.getItem('token')

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={token ? <Navigate to="/channels" replace /> : <Login />}
        />
        <Route
          path="/channels"
          element={token ? <Chat /> : <Navigate to="/login" replace />}
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
