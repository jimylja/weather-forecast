import { LocationActions, LocationActionTypes } from './location.actions';
import { State, initialLocationState} from './location.state';

export function reducer(state = initialLocationState, action: LocationActions): State {
  switch (action.type) {
    case LocationActionTypes.GetLocation:
      return state;
    case LocationActionTypes.LocationRecived:
      return {
        ...state,
        location: action.payload};
    default:
      return state;
  }
}
