import { state } from '../types/redux';
import { createStore, applyMiddleware } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';

const initialState: state = {
  showFloat: false,
  selectedId: '',
  scriptLoaded: false,
  serviceAPI: undefined,
  coords: {
    latitude: 41.384723,
    longitude: 2.199172
  },
  places: []
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
  SET_SERVICE_API: (state, action) => {
    state.serviceAPI = action.payload;
  },
  SET_PLACES: (state, action) => {
    state.places = action.payload;
  },
  SET_NEW_PLACE: (state, action) => {
    state.newPlace = action.payload;
  },
  SET_NEW_OFFER: (state, action) => {
    let place = state.places.find((el) => el.id === action.payload.id);
    if (place) place = action.payload;
    else state.places.push(action.payload);
  }
});

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(ReduxThunk))
);
