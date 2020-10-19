import { coords, place } from '../types/redux';

export function setScriptLoaded(loaded: boolean) {
  return {
    type: 'SET_SCRIPT_LOADED',
    payload: loaded
  };
}

export function setCoordinates(coords: coords) {
  return {
    type: 'SET_COORDINATES',
    payload: coords
  };
}

export function setShowFloat(showFloat: boolean) {
  return {
    type: 'SET_SHOW_FLOAT',
    payload: showFloat
  };
}

export function setPlaces(places: place[]) {
  return {
    type: 'SET_PLACES',
    payload: places
  };
}
export function setNewOffer(place: place) {
  return {
    type: 'SET_NEW_OFFER',
    payload: place
  };
}

export function setSelectedId(id: string) {
  return {
    type: 'SET_SELECTED_ID',
    payload: id
  };
}
// export function fetchPlaces(coords: coords) {
//   return function (dispatch: () => {}) {
//     const result = fetch(`someURL`, {
//       headers: {
//         Accept: 'application/json'
//       },
//       body: JSON.stringify(coords)
//     })
//       .then((r) => r.json())
//       .then((response: place[]) => {
//         dispatch(setPlaces(response));
//       });
//     console.log(result);
//   };
// }
