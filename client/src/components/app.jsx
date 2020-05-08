/* eslint-disable import/extensions */
/* eslint-disable no-console */

import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
// import path from 'path';
import CalendarWrapper from './CalendarWrapper.jsx';
import CalendarDate from './CalendarDate.jsx';
import calendarHelpers from '../calendarHelpers.js';
import WeekdayRow from './WeekdayRow.jsx';
import CalendarRow from './CalendarRow.jsx';
import MonthSelector from './MonthSelector.jsx';
import NextMonthButton from './NextMonthButton.jsx';
import PreviousMonthButton from './PreviousMonthButton.jsx';
import CalendarTable from './CalendarTable.jsx';
import ReservationBox from './ReservationBox.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
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
      selectedYear: new Date().getYear() + 1900,
      rowsOfSelectedMonth: calendarHelpers.allWeekRows(new Date().getYear()
        + 1900, new Date().getMonth()),
      displayCalendar: true,
    };
  }

  getNextMonth() {
    let selectedMonth = this.state.selectedMonthNumber + 1;
    let { selectedYear } = this.state;
    if (selectedMonth === 12) {
      selectedMonth = 0;
      selectedYear += 1;
    }
    this.setState({
      selectedMonthNumber: selectedMonth,
      selectedYear,
      rowsOfSelectedMonth: calendarHelpers.allWeekRows(selectedYear, selectedMonth),
    });
  }

  getPreviousMonth() {
    let selectedMonth = this.state.selectedMonthNumber - 1;
    let { selectedYear } = this.state;
    if (selectedMonth === -1) {
      selectedMonth = 11;
      selectedYear -= 1;
    }
    this.setState({
      selectedMonthNumber: selectedMonth,
      selectedYear,
      rowsOfSelectedMonth: calendarHelpers.allWeekRows(selectedYear, selectedMonth),
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
        <ReservationBox/>
        <button onClick={this.showCalendar.bind(this)}>Show Calendar</button>
        <button onClick={this.hideCalendar.bind(this)}>Hide Calendar</button>
        <CalendarWrapper displayed={this.state.displayCalendar}>
        <MonthSelector>
          <PreviousMonthButton onClick={this.getPreviousMonth.bind(this)}
          disabled={this.month === this.state.selectedMonthNumber}/>
          {calendarHelpers.monthNumToName(this.state.selectedMonthNumber)} {this.state.selectedYear}
          <NextMonthButton onClick={this.getNextMonth.bind(this)
          } disabled={this.state.selectedMonthNumber === this.state.latestMonthAllowed}/>
        </MonthSelector>
          <CalendarTable.Wrapper>
            <CalendarTable.Table>
              <tbody>
              <WeekdayRow>{calendarHelpers.weekdays.map((day) => <td>{day}</td>)}
                </WeekdayRow>
              {this.state.rowsOfSelectedMonth.map((row) => <CalendarRow>
                {row.map((item) => <CalendarDate
                onClick={this.selectDate.bind(this)}
                id={calendarHelpers.createId(item.yr, item.mo, item.day)}
                past={this.isPast(calendarHelpers.createId(item.yr, item.mo, item.day))}
                isToday={this.isToday(calendarHelpers.createId(item.yr, item.mo, item.day))}
                selected={calendarHelpers.createId(item.yr, item.mo,
                  item.day) === this.state.selectedDate}>
                  {item.day}
                </CalendarDate>)}
              </CalendarRow>)}
              </tbody>
            </CalendarTable.Table>
          </CalendarTable.Wrapper>
        </CalendarWrapper>
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
