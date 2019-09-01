import { Location } from '../../models/location';

export interface State {
  location: Location;
}

export const initialLocationState: State = {location: null};
