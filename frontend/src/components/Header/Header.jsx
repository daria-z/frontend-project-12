import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';


function Header({ isAuthenticated }) {
  return (
    <header>
      <Link to="/">Хекслет Чат</Link>
      <Button variant="primary">{isAuthenticated ? 'Выйти' : 'Войти'}</Button>
    </header>
  );
}

export default Header
