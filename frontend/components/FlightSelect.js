'use strict';

import React, {Component, PropTypes} from 'react';
import { connect }                   from 'react-redux';
import { bindActionCreators }        from 'redux';
import * as flightActions            from '_app/dal/flight/actions';
import moment                        from 'moment';
import './style/main.styl';

moment.locale('ru');

@connect(
    state => ({
      flight: state.flight
    }),
    (dispatch) => ({
      ...bindActionCreators(flightActions, dispatch)
    })
)

class FlightSelect extends Component {

  static propTypes = {
    flight: PropTypes.object
  }

  state = {
    selectValue: ''
  }

  componentDidMount() {
    const {getFlightDataAction} = this.props;
    getFlightDataAction();
  }

  _handleChange = (event) => {
    this.setState({selectValue: event.target.value});
  }

  _getUniqValues(arr) {
    let obj = {};

    for (var i = 0; i < arr.length; i++) {
      obj[arr[i]] = true;
    }

    return Object.keys(obj);
  }

  _renderSelect() {
    const {flight: {flightData : {flights}}} = this.props;
    const {selectValue} = this.state;
    const uniqCarriers = this._getUniqValues(flights.map((item) => item.carrier));
    return (
        <select value={selectValue}
                className="select-carrier"
                onChange={this._handleChange}>
          <option value="">Выберите авиакомпанию</option>
          {uniqCarriers.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
    )
  }

  _renderFlightResultes() {
    const {flight: {flightData : {flights}}} = this.props;
    const {selectValue} = this.state;
    const flightPath = flights.filter((item) => item.carrier === selectValue);

    if (!flightPath.length) {
      return null;
    }

    return (
        <div className="flight-schedule">
          {flightPath.map((item) =>
              <div key={item.id} className="flight-schedule-row">
                <div className="flight-schedule-item">
                  <div className="flight-schedule-item__title">Откуда:</div>
                  <div>{item.direction && item.direction.from}</div>
                </div>
                <div className="flight-schedule-item">
                  <div className="flight-schedule-item__title">Куда:</div>
                  <div>{item.direction && item.direction.to}</div>
                </div>
                <div className="flight-schedule-item">
                  <div className="flight-schedule-item__title">Время вылета:</div>
                  <div>{moment(item.departure).format('DD MMMM в H:mm')}</div>
                </div>
                <div className="flight-schedule-item">
                  <div className="flight-schedule-item__title">Время прилета:</div>
                  <div>{moment(item.arrival).format('DD MMMM в H:mm')}</div>
                </div>
                <div className="flight-schedule-item">
                  <div className="flight-schedule-item__title">Название авиакомпании:</div>
                  <div>{item.carrier}</div>
                </div>
              </div>
          )}
        </div>
    )
  }

  render() {
    const {flight: {flightData}} = this.props;

    if (!flightData) {
      return null;
    }

    return (
        <div>
          <div>
            <label> Выберите авиакомпанию
              {this._renderSelect()}
            </label>
          </div>
          <div>
            {this._renderFlightResultes()}
          </div>
        </div>
    )
  }
}

export default FlightSelect;
