/* global google */
export type coords = {
  latitude: number;
  longitude: number;
};

export type offer = {
  id: string;
  consumableType: string;
  offerType: string;
  start: string;
  end?: string;
  repeat: boolean;
  repeatEvery?: string;
  description: string;
  score: number;
  available: boolean;
  voted?: boolean;
};
export type location = {
  type: string;
  coordinates: [number, number];
};

export type place = {
  id: string;
  name?: string;
  location?: location;
  address?: string;
  image?: string;
  isInsideRadius?: boolean;
  offers?: offer[];
};

export interface RootState {
  showFloat: boolean;
  scriptLoaded: boolean;
  selectedId: number;
  serviceAPI?: google.maps.places.PlacesService;
  newPlace?: {
    name: string;
    location: {
      latitude: number;
      longitude: number;
    };
  };
  mapCoords: coords;
  userCoords: coords;
  places: place[];
  filteredPlaces: place[];
}

export interface state {
  showFloat: boolean;
  scriptLoaded: boolean;
  selectedId: number;
  serviceAPI?: google.maps.places.PlacesService;
  newPlace?: {
    name: string;
    location: {
      latitude: number;
      longitude: number;
    };
  };
  mapCoords: coords;
  userCoords: coords;
  places: place[];
  filteredPlaces: place[];
}
