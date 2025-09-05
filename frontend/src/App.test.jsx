import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('Vite + React', () => {
  it('renders Vite + React text', () => {
    render(<div>Vite + React</div>);
    expect(screen.getByText(/Vite \+ React/i)).toBeInTheDocument();
  });
});
