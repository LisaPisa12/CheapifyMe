import AppLayout from './layout';

import { cleanup, render, screen } from '@testing-library/react';
import { ReactNode } from 'react';

const renderComponent = (children: ReactNode) =>
  render(<AppLayout>{children}</AppLayout>);

describe('App layout', () => {
  afterEach(() => {
    cleanup();
  });

  it('Renders the layout', () => {
    const component = renderComponent(<p>Hello</p>);
    expect(component.baseElement).toMatchSnapshot();
  });

  it('Renders the center div', () => {
    renderComponent(<p>Hello</p>);
    expect(screen.queryByTestId('center-div')).toBeTruthy();
  });

  it('Renders the main', () => {
    renderComponent(<p>Hello</p>);
    expect(screen.queryByTestId('main')).toBeTruthy();
  });

  it('Renders children elements', async () => {
    renderComponent(<p>LisaPisa</p>);
    expect(screen.queryByText(/LisaPisa/i)).toBeTruthy();
  });
});
