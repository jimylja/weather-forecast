import { Location } from '../../models/location';

export interface State {
  location: Location;
}

export const initialLocationState: State = {location: {coords: {lon: 0, lat: 0}}};
