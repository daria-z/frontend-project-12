import { MemoryRouter } from 'react-router-dom';
import { describe } from "vitest";
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import LoginForm from './LoginForm';

// test('responds with the user', async () => {
//   const response = await fetch('https://api.example.com/user')

//   await expect(response.json()).resolves.toEqual({
//     id: 'abc-123',
//     firstName: 'John',
//     lastName: 'Maverick',
//   })
// })

describe('LoginForm', () => {

  it('sends login request to local server and receives token', async () => {
    render(<MemoryRouter><LoginForm /></MemoryRouter>);

    await userEvent.type(screen.getByPlaceholderText(/ваш ник/i), 'admin');
    await userEvent.type(screen.getByPlaceholderText(/пароль/i), 'admin');
    await userEvent.click(screen.getByRole('button', { name: /войти/i }));

    await waitFor(() => {
      expect(localStorage.getItem('token')).toBe('admin_token');
    });
  });

  it('handles login error from local server', async () => {
    render(<MemoryRouter><LoginForm /></MemoryRouter>);

    await userEvent.type(screen.getByPlaceholderText(/ваш ник/i), 'wrong');
    await userEvent.type(screen.getByPlaceholderText(/пароль/i), 'wrong123');
    await userEvent.click(screen.getByRole('button', { name: /войти/i }));

    await waitFor(() => {
      expect(screen.getByText(/Unauthorized/i)).toBeInTheDocument();
    });
  });
});
