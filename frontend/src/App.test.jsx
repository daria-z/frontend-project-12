import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { Provider } from 'react-redux';
import store from './app/store';
import App from './App';

describe('App', () => {
  it('renders page by default', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    const heading = screen.getByRole('heading', { name: /Chat/i });
    expect(heading).toBeInTheDocument();
  });

  it('renders Login page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/login']}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    const heading = screen.getByRole('heading', { name: /Войти/i });
    expect(heading).toBeInTheDocument();
  });

  it('renders NotFound page for invalid route', () => {
    render(
      <MemoryRouter initialEntries={['/invalid-route']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/404 page/i)).toBeInTheDocument();
  });
});
