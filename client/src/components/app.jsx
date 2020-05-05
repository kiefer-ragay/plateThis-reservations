/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import path from 'path';
import CalendarWrapper from './CalendarWrapper.jsx';
import CalendarDate from './CalendarDate.jsx';
import calendarHelpers from '../calendarHelpers.js';
import WeekdayRow from './WeekdayRow.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dates_closed: [],
      restaurant_name: '',
      timeslots: [],
      todaysDate: new Date().getDate(),
      months: calendarHelpers.getSurroundingMonths(),
      selectedMonth: new Date().getMonth(),
    };
  }

  getScheduleData(e) {
    e.preventDefault();
    $.ajax({
      url: 'http://localhost:3000/reservations/2',
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
      <div class='calendar-container'>Testing
        <br></br>
        <button onClick={this.getScheduleData.bind(this)}>Get Data</button>
        <p>Restaurant: {this.state.restaurant_name}</p>
        <p>Time Slots: {JSON.stringify(this.state.timeslots)}</p>
        <p>Days Closed: {JSON.stringify(this.state.dates_closed)}</p>
        <CalendarWrapper>
          <WeekdayRow> {calendarHelpers.weekdays.map((day) => <td>{day}</td>)}</WeekdayRow>
        </CalendarWrapper>
      </div>
    );
  }
}

// eslint-disable-next-line no-undef
ReactDOM.render(<App />, document.getElementById('app'));
