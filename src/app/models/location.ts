export interface Place {
  city: string;
  dist: string;
  country: string;
}

export interface Coordinates {
  lat: number;
  lon: number;
}

export interface Location {
  coords: Coordinates;
  place?: Place;
}
