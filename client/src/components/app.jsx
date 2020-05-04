/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import path from 'path';
import Calendar from './Calendar.jsx';

const serverURL = 'http://localhost:3000';
const testId = '2';
const reservationURL = path.join(serverURL, 'reservations', testId);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dates_closed: [],
      restaurant_name: '',
      timeslots: [],
    };
  }

  getScheduleData(e) {
    e.preventDefault();
    $.ajax({
      url: reservationURL,
      success: (data) => {
        this.displayData(data);
      },
      error: () => {
        console.log('Could not retrieve schedule data');
      },
      dataType: 'json',
    });
  }

  displayData(scheduleData) {
    this.setState({
      dates_closed: scheduleData.dates_closed,
      restaurant_name: scheduleData.restaurantName,
      timeslots: scheduleData.timeslots,
    });
  }

  render() {
    return (
      <div>Testing
        <br></br>
        <button onClick={this.getScheduleData.bind(this)}>Get Data</button>
        <p>Restaurant: {this.state.restaurant_name}</p>
        <p>Time Slots: {JSON.stringify(this.state.timeslots)}</p>
        <p>Days Closed: {JSON.stringify(this.state.dates_closed)}</p>
        <Calendar />
      </div>
    );
  }
}

// eslint-disable-next-line no-undef
ReactDOM.render(<App />, document.getElementById('app'));
