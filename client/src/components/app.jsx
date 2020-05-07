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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dates_closed: [],
      restaurant_name: '',
      timeslots: [],
      todaysDate: new Date(), // .getDate() for number
      selectedDate: new Date(),
      months: calendarHelpers.getSurroundingMonths(),
      selectedMonthNumber: new Date().getMonth(),
      selectedYear: new Date().getYear() + 1900,
      rowsOfSelectedMonth: calendarHelpers.allWeekRows(new Date().getYear(), new Date().getMonth()),
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

  render() {
    return (
      <div className='calendar-container'>Testing
        <br></br>
        <button onClick={this.getScheduleData.bind(this)}>Get Data</button>
        <p>Restaurant: {this.state.restaurant_name}</p>
        <p>Time Slots: {JSON.stringify(this.state.timeslots)}</p>
        <p>Days Closed: {JSON.stringify(this.state.dates_closed)}</p>
        <CalendarWrapper>
        <MonthSelector>
          <PreviousMonthButton onClick={this.getPreviousMonth.bind(this)}/>
          {calendarHelpers.monthNumToName(this.state.selectedMonthNumber)} {this.state.selectedYear}
          <NextMonthButton onClick={this.getNextMonth.bind(this)}/>
        </MonthSelector>
          <CalendarTable.Wrapper>
            <CalendarTable.Table>
              <tbody>
              <WeekdayRow>{calendarHelpers.weekdays.map((day) => <td>{day}</td>)}
                </WeekdayRow>
              {this.state.rowsOfSelectedMonth.map((row) => <CalendarRow>
                {row.map((dayObj) => <CalendarDate> {dayObj.day}</CalendarDate>)}
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
