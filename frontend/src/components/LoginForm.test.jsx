import { render, screen } from '@testing-library/react';
import LoginForm from './LoginForm.jsx';

describe('LoginForm', () => {
  it('рендерит поле ввода для имени', () => {
    render(<LoginForm />);
    const nameInput = screen.getByPlaceholderText('Ваш ник');
    expect(nameInput).toBeInTheDocument();
  });

  it('рендерит поле ввода для пароля', () => {
    render(<LoginForm />);
    const emailInput = screen.getByPlaceholderText('Пароль');
    expect(emailInput).toBeInTheDocument();
  });

  it('рендерит кнопку отправки формы', () => {
    render(<LoginForm />);
    const submitButton = screen.getByRole('button', { name: /войти/i });
    expect(submitButton).toBeInTheDocument();
  });

  it('рендерит метку для поля имени', () => {
    render(<LoginForm />);
    const nameLabel = screen.getByLabelText('Ваш ник');
    expect(nameLabel).toBeInTheDocument();
  });

  it('рендерит метку для поля email', () => {
    render(<LoginForm />);
    const emailLabel = screen.getByLabelText('Пароль');
    expect(emailLabel).toBeInTheDocument();
  });
});
