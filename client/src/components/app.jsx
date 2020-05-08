/* eslint-disable import/extensions */
/* eslint-disable no-console */

import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
// import path from 'path';
import Calendar from './Calendar.jsx';
import calendarHelpers from '../calendarHelpers.js';
import ReservationBox from './ReservationBox.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.calendarMethods = {
      getNextMonth: this.getNextMonth.bind(this),
      getPreviousMonth: this.getPreviousMonth.bind(this),
      isPast: this.isPast.bind(this),
      isToday: this.isToday.bind(this),
      selectDate: this.selectDate.bind(this),
      showCalendar: this.showCalendar.bind(this),
      hideCalendar: this.hideCalendar.bind(this),
    };

    this.day = new Date().getDate();
    this.year = new Date().getYear() + 1900;
    this.month = new Date().getMonth();
    this.todaysId = calendarHelpers.createId(this.year, this.month, this.day);
    this.state = {
      dates_closed: [],
      restaurant_name: '',
      timeslots: [],
      todaysDate: new Date(), // .getDate() for number
      selectedDate: this.todaysId,
      latestMonthAllowed: calendarHelpers.getLatestMonth(this.month),
      selectedMonthNumber: new Date().getMonth(),
      selectedMonthName: calendarHelpers.monthNumToName(this.month),
      selectedYear: new Date().getYear() + 1900,
      rowsOfSelectedMonth: calendarHelpers.allWeekRows(this.year, this.month),
      displayCalendar: true,
    };
  }

  getNextMonth() {
    let selectedMonthNumber = this.state.selectedMonthNumber + 1;
    let { selectedYear } = this.state;
    if (selectedMonthNumber === 12) {
      selectedMonthNumber = 0;
      selectedYear += 1;
    }
    this.setState({
      selectedMonthNumber,
      selectedMonthName: calendarHelpers.monthNumToName(selectedMonthNumber),
      selectedYear,
      rowsOfSelectedMonth: calendarHelpers.allWeekRows(selectedYear, selectedMonthNumber),
    });
  }

  getPreviousMonth() {
    let selectedMonthNumber = this.state.selectedMonthNumber - 1;
    let { selectedYear } = this.state;
    if (selectedMonthNumber === -1) {
      selectedMonthNumber = 11;
      selectedYear -= 1;
    }
    this.setState({
      selectedMonthNumber,
      selectedMonthName: calendarHelpers.monthNumToName(selectedMonthNumber),
      selectedYear,
      rowsOfSelectedMonth: calendarHelpers.allWeekRows(selectedYear, selectedMonthNumber),
    });
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

  isPast(id) {
    return parseFloat(id) < this.todaysId;
  }

  isToday(id) {
    return parseFloat(id) === this.todaysId;
  }

  selectDate(e) {
    this.setState({
      selectedDate: parseFloat(e.target.id),
    });
  }

  showCalendar() {
    this.setState({
      displayCalendar: true,
    });
  }

  hideCalendar() {
    this.setState({
      displayCalendar: false,
    });
  }

  render() {
    return (
      <div className='calendar-container'>Testing
        <br></br>
        <button onClick={this.getScheduleData.bind(this)}>Get Data</button>
        <p>Restaurant: {this.state.restaurant_name}</p>
        <p>Time Slots: {JSON.stringify(this.state.timeslots)}</p>
        <p>Days Closed: {JSON.stringify(this.state.dates_closed)}</p>
        <br></br>
        <ReservationBox/>
        <button onClick={this.showCalendar.bind(this)}>Show Calendar</button>
        <button onClick={this.hideCalendar.bind(this)}>Hide Calendar</button>
        <Calendar state={this.state} calendarMethods={this.calendarMethods}/>
      </div>
    );
  }
}

// eslint-disable-next-line no-undef
ReactDOM.render(<App />, document.getElementById('app'));

// assign unique numerical values as ids to each table cell - done
// check if each cell's value is less than the value of the current date
// if so, add a class unselectable to those cells

// this class should make it unclickable, greyed out, and have no hover effect

// disable next or previous month clicker if the next or previous month isn't in the surrounding mos

// after completion of render, get the element where id is equal to the identifier for today's date

// research how to have a table cell as selected value, apply a 'selected' class to that (as state)
