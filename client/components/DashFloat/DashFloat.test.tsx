import DashFloat from './DashFloat';
import { cleanup, render, screen } from '@testing-library/react';

const renderComponent = () => render(<DashFloat />);

describe.only('Dashboard Floating element', () => {
  afterEach(() => {
    cleanup();
  });
  it('Renders the float container', () => {
    const component = renderComponent();
    expect(screen.queryByTestId('float_container')).toBeTruthy();
  });
});
