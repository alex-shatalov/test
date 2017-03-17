import React           from 'react';
import ReactDOM        from 'react-dom';
import { Provider }    from 'react-redux';
import { createStore } from 'redux'
import FlightSelect    from '_components/FlightSelect';
import store           from '_app/store';

ReactDOM.render(
		<Provider store={store}>
			<FlightSelect/>
		</Provider>,
		document.getElementById('main-сontent')
);