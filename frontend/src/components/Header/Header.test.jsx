import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Header from './Header';

describe('Header', () => {
  it('renders login button when not authenticated', () => {
    render(
      <MemoryRouter>
        <Header isAuthenticated={false} />
      </MemoryRouter>
    );
    expect(screen.getByText('Войти')).toBeInTheDocument();
  });

  it('renders logout button when authenticated', () => {
    render(
      <MemoryRouter>
        <Header isAuthenticated={true} />
      </MemoryRouter>
    );
    expect(screen.getByText('Выйти')).toBeInTheDocument();
  });
});
