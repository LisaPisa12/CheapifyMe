import Input from './';

import { cleanup, render, screen } from '@testing-library/react';

const renderComponent = () => render(<Input></Input>);

describe('App layout', () => {
  afterEach(() => {
    cleanup();
  });

  it('Renders the location textbox', () => {
    renderComponent();
    expect(screen.queryByTestId('location-textbox')).toBeTruthy();
  });
});
