import { FlightServices } from './service';

export const ACTIONS = {
  GET_FLIGHT_DATA: 'GET_FLIGHT_DATA'
}

export const getFlightDataAction = () => dispatch => {
  return FlightServices.getFlightData()
      .then(data => dispatch({type: ACTIONS.GET_FLIGHT_DATA, data: data}))
      .catch(() => console.log('ошибка'));
};
