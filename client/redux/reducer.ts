import { state } from '../types/redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';

const initialState: state = {
  showFloat: false,
  coords: {
    latitude: 41.395039,
    longitude: 12.19796
  },
  places: []
};
function reducer(
  state = initialState,
  action: { type: string; payload?: any }
) {
  switch (action.type) {
    case 'SET_COORDINATES':
      return { ...state, coords: action.payload };

    case 'SET_SHOW_FLOAT':
      return { ...state, showFloat: action.payload };

    case 'SET_PLACES':
      return { ...state, places: action.payload };

    default:
      return state;
  }
}
export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(ReduxThunk))
);
