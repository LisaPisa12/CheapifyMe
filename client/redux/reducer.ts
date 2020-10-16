import { state } from '../types/redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';

const initialState: state = {
  showFloat: false,
  selectedId: '',
  scriptLoaded: false,
  coords: {
    latitude: 41.384723,
    longitude: 2.199172
  },
  places: []
};
function reducer(
  state = initialState,
  action: { type: string; payload?: any }
) {
  switch (action.type) {
    case 'SET_SCRIPT_LOADED':
      return { ...state, scriptLoaded: action.payload };
    case 'SET_COORDINATES':
      return { ...state, coords: action.payload };

    case 'SET_SHOW_FLOAT':
      return { ...state, showFloat: action.payload };

    case 'SET_SELECTED_ID':
      return { ...state, selectedId: action.payload };

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
