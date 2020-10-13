import { coords, place } from '../../types/redux';

export function setCoordinates(coords: coords) {
  return {
    type: 'SET_COORDINATES',
    payload: coords
  };
}

export function setLoading(isLoading: boolean) {
  return {
    type: 'SET_LOADING',
    payload: isLoading
  };
}

export function setPlaces(places: place[]) {
  return {
    type: 'SET_PLACES',
    payload: places
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
