import AppLayout from '.';
import { Provider } from 'react-redux';
import { store } from '../../redux/reducer';
import { cleanup, render, screen } from '@testing-library/react';
import { ReactNode } from 'react';

const renderComponent = (children: ReactNode) =>
  render(
    <Provider store={store}>
      <AppLayout>{children}</AppLayout>
    </Provider>
  );

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
