import Map from './map';
import { initialize } from '@googlemaps/jest-mocks';
import { Provider } from 'react-redux';
import { store } from '../../redux/reducer';
import { cleanup, render, screen } from '@testing-library/react';

const renderComponent = () =>
  render(
    <Provider store={store}>
      <Map
        mapType={'roadmap'}
        coords={{ latitude: 41.394723, longitude: 2.19122 }}
      />
    </Provider>
  );

describe('App layout', () => {
  beforeEach(() => {
    initialize();
  });
  afterEach(() => {
    cleanup();
  });

  it('Renders the map div', () => {
    renderComponent();
    expect(screen.queryByTestId('map_div')).toBeTruthy();
  });

  it('Renders the container div', () => {
    renderComponent();
    expect(screen.queryByTestId('map_container')).toBeTruthy();
  });
});
