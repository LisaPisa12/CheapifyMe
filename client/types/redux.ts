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
};
export type location = {
  type: string;
  coordinates: [number, number];
};

export type place = {
  id: string;
  name: string;
  location: location;
  image: string;
  offers: offer[];
};

export interface RootState {
  showFloat: boolean;
  coords: coords;
  places: place[];
}

export interface state {
  showFloat: boolean;
  coords: coords;
  places: place[];
}