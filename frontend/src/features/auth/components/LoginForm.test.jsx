import { MemoryRouter } from 'react-router-dom';
import { describe } from "vitest";
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../../app/store';
import LoginForm from './LoginForm';
import { http, HttpResponse } from "msw";
import { setupServer } from 'msw/node';

const server = setupServer(
  http.post("/api/v1/login", () => {
    return HttpResponse.json({
      token: "admin_token",
      username: "admin"
    });
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('LoginForm', () => {
  it('отправляет имя юзера и пароль и сохраняет вернувшийся токен', async () => {
    render(<Provider store={store}><MemoryRouter><LoginForm /></MemoryRouter></Provider>);

    await userEvent.type(screen.getByPlaceholderText(/ваш ник/i), 'admin');
    await userEvent.type(screen.getByPlaceholderText(/пароль/i), 'admin');
    await userEvent.click(screen.getByRole('button', { name: /войти/i }));

    await waitFor(() => {
      expect(localStorage.getItem('token')).toBe('admin_token');
    });
  });

  it('handles login error from local server', async () => {
    render(<Provider store={store}><MemoryRouter><LoginForm /></MemoryRouter></Provider>);

    await userEvent.type(screen.getByPlaceholderText(/ваш ник/i), 'wrong');
    await userEvent.type(screen.getByPlaceholderText(/пароль/i), 'wrong123');
    await userEvent.click(screen.getByRole('button', { name: /войти/i }));

    await waitFor(() => {
      expect(screen.getByText(/Unauthorized/i)).toBeInTheDocument();
    });
  });
});
