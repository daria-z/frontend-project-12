import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Chat() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  return (
    <h1>Chat</h1>
  )
};

export default Chat
