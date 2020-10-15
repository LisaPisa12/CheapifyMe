import * as actions from './actions';

describe('actions', () => {
  let coord: { latitude: 0; longitude: 0 };
  it('should create an action to set the coordinates', () => {
    const expectedAction = {
      type: 'SET_COORDINATES',
      payload: coord
    };
    expect(actions.setCoordinates(coord)).toEqual(expectedAction);
  });

  it('should create an action to set places', () => {
    const place = [
      {
        id: '12',
        coords: coord,
        offers: [
          {
            id: 'test',
            type: 'drinks',
            start: 'now',
            end: 'end of times',
            active: true
          }
        ]
      }
    ];
    const expectedAction = {
      type: 'SET_PLACES',
      payload: place
    };
    expect(actions.setPlaces(place)).toEqual(expectedAction);
  });
});
