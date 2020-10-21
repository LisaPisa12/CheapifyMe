import { coords, place } from '../types/redux';

export function setScriptLoaded(loaded: boolean) {
  return {
    type: 'SET_SCRIPT_LOADED',
    payload: loaded,
  };
}

export function setMapCoordinates(coords: coords) {
  return {
    type: 'SET_MAP_COORDINATES',
    payload: coords,
  };
}

export function setIfInsideRadius(place: place) {
  return {
    type: 'SET_IF_INSIDE_RADIUS',
    payload: place,
  };
}

export function setUserCoordinates(coords: coords) {
  return {
    type: 'SET_USER_COORDINATES',
    payload: coords,
  };
}

export function setShowFloat(showFloat: boolean) {
  return {
    type: 'SET_SHOW_FLOAT',
    payload: showFloat,
  };
}

export function setPlaces(places: place[]) {
  return {
    type: 'SET_PLACES',
    payload: places,
  };
}
export function setServiceAPI(service: any) {
  return {
    type: 'SET_SERVICE_API',
    payload: service,
  };
}
export function setNewPlace(newPlace: any) {
  return {
    type: 'SET_NEW_PLACE',
    payload: newPlace,
  };
}
export function setNewOffer(place: place) {
  return {
    type: 'SET_NEW_OFFER',
    payload: place,
  };
}

export function setSelectedId(id: number) {
  return {
    type: 'SET_SELECTED_ID',
    payload: id,
  };
}

export function setFilteredPlaces(type: string) {
  return {
    type: 'SET_FILTERED_PLACES',
    payload: type,
  };
}
