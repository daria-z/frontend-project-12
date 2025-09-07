import { Routes, Route } from 'react-router-dom';
import Chat from './pages/Chat.jsx';
import Login from './pages/Login.jsx';
import NotFound from './pages/NotFound.jsx';
import { Provider } from 'react-redux'
import { store } from './app/store.js';

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Provider>
  )
}

export default App
