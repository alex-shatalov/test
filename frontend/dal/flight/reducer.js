import {ACTIONS} from './actions';

const FlightReducer = (state = {
	flightData: null
}, action) => {
	switch (action.type) {
		case ACTIONS.GET_FLIGHT_DATA:
			return {
				...state,
				flightData: action.data
			};
		default:
			return {
				...state
			}
	}
};

export default FlightReducer;
