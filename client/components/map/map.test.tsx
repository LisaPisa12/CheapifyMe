import Map from './map';
import { initialize } from '@googlemaps/jest-mocks';
import { cleanup, render, screen } from '@testing-library/react';

const renderComponent = () => render(<Map mapType={'roadmap'} />);

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
