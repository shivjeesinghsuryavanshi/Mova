import { render, screen } from '@testing-library/react';
import App from './App';

test('renders weather dashboard heading', () => {
  render(<App />);
  expect(
    screen.getByRole('heading', {
      name: /forecast that feels polished and calm/i,
    })
  ).toBeInTheDocument();
});
