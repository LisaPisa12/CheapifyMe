import { state } from '../types/redux';
import { createStore, applyMiddleware } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';

const initialState: state = {
  showFloat: false,
  selectedId: -1,
  scriptLoaded: false,
  serviceAPI: undefined,
  mapCoords: {
    latitude: 41.404278,
    longitude: 2.175098,
  },
  places: [],
  filteredPlaces: [],
  userCoords: {
    latitude: 0,
    longitude: 0,
  },
};

const reducer = createReducer(initialState, {
  SET_SCRIPT_LOADED: (state, action) => {
    state.scriptLoaded = action.payload;
  },
  SET_MAP_COORDINATES: (state, action) => {
    state.mapCoords = action.payload;
  },
  SET_USER_COORDINATES: (state, action) => {
    state.userCoords = action.payload;
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
    state.filteredPlaces = action.payload;
  },
  SET_NEW_PLACE: (state, action) => {
    state.newPlace = action.payload;
  },
  SET_NEW_OFFER: (state, action) => {
    const place = state.places.find((el) => el.id === action.payload.id);
    if (place) place.offers = action.payload.offers;
    else state.places.push(action.payload);
    state.filteredPlaces = state.places;
  },

  SET_IF_INSIDE_RADIUS: (state, action) => {
    const place = state.places.find((el) => el.id === action.payload.id);
    if (place && !action.payload.voted)
      place.isInsideRadius = action.payload.isInsideRadius;
  },

  SET_VOTED_OFFER: (state, action) => {
    const place = state.places.find((el) => el.id === action.payload.id);
    if (place) place.offers = action.payload.offers;
  },

  SET_FILTERED_PLACES: (state, action) => {
    if (action.payload === 'all') {
      state.filteredPlaces = state.places;
    } else {
      state.filteredPlaces.forEach(
        (el) =>
          (el.offers = el.offers?.filter(
            (el) => el.consumableType.toLowerCase() === action.payload
          ))
      );
    }
  },
});

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(ReduxThunk))
);
