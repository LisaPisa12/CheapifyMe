import Map from './map';
import { cleanup, render, screen } from '@testing-library/react';

global.google = {
  maps: {
    LatLng: class {},
    Map: class {},
  },
} as any;

const renderComponent = () => render(<Map mapType={'roadmap'} />);

describe('App layout', () => {
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
