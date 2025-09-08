import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { useSelector } from 'react-redux'


import Header from './components/Header/Header.jsx';
import Chat from './pages/Chat.jsx';
import Login from './pages/Login.jsx';
import NotFound from './pages/NotFound.jsx';


function App() {
  const isAuthenticated = useSelector((state) => !!state.auth.token)

  return (
    <BrowserRouter>
      <>
        <Header isAuthenticated={isAuthenticated} />
        <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </>

    </BrowserRouter>
  )
}

export default App
