export type coords = {
  latitude: number;
  longitude: number;
};

export type offer = {
  id: string;
  type: string;
  start: string;
  end: string;
  active: boolean;
};

export type place = {
  id: string;
  coords: coords;
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
