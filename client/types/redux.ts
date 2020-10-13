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
  isLoading: boolean;
  coords: coords;
  places: place[];
}

export interface state {
  isLoading: boolean;
  coords: coords;
  places: place[];
}
