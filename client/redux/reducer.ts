import { state } from '../types/redux';
import { createStore, applyMiddleware } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';

const initialState: state = {
  showFloat: false,
  selectedId: -1,
  scriptLoaded: false,
  coords: {
    latitude: 41.404278,
    longitude: 2.175098,
  },
  places: [],
};

const reducer = createReducer(initialState, {
  SET_SCRIPT_LOADED: (state, action) => {
    state.scriptLoaded = action.payload;
  },
  SET_COORDINATES: (state, action) => {
    state.coords = action.payload;
  },
  SET_SHOW_FLOAT: (state, action) => {
    state.showFloat = action.payload;
  },
  SET_SELECTED_ID: (state, action) => {
    state.selectedId = action.payload;
  },
  SET_PLACES: (state, action) => {
    state.places = action.payload;
  },
  SET_NEW_OFFER: (state, action) => {
    const place = state.places.find((el) => el.id === action.payload.id);
    if (place) place.offers = action.payload.offers;
  },
});

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(ReduxThunk))
);
