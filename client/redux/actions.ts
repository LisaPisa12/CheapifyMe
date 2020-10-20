import { coords, place } from '../types/redux';

export function setScriptLoaded(loaded: boolean) {
  return {
    type: 'SET_SCRIPT_LOADED',
    payload: loaded,
  };
}

export function setCoordinates(coords: coords) {
  return {
    type: 'SET_COORDINATES',
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
    payload: service
  };
}
export function setNewPlace(newPlace: any) {
  return {
    type: 'SET_NEW_PLACE',
    payload: newPlace
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
