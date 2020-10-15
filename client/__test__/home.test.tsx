import Home from '../pages';

import { store } from '../redux/reducer';
import { Provider } from 'react-redux';
import { cleanup, render, screen } from '@testing-library/react';

const renderComponent = () =>
  render(
    <Provider store={store}>
      <Home></Home>
    </Provider>
  );

describe('App layout', () => {
  afterEach(() => {
    cleanup();
  });

  it('Renders the layout', () => {
    const component = renderComponent();
    expect(component.baseElement).toMatchSnapshot();
  });

  it('Renders the section', () => {
    renderComponent();
    expect(screen.queryByTestId('section')).toBeTruthy();
  });

  it('Renders the childs', () => {
    renderComponent();
    expect(screen.queryAllByTestId('child')).toBeTruthy();
  });

  it('Renders the logo', () => {
    renderComponent();
    expect(screen.queryByTestId('img')).toBeTruthy();
  });

  it('Renders the location textbox', () => {
    renderComponent();
    expect(screen.queryByTestId('location-textbox')).toBeTruthy();
  });

  it('Renders the button with the location icon', () => {
    renderComponent();
    expect(screen.queryByTestId('location-button')).toBeTruthy();
  });

  it('Renders the the map image', () => {
    renderComponent();
    expect(screen.queryByTestId('map-img')).toBeTruthy();
  });
});
