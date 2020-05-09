/* eslint-disable no-undef */
/* eslint-disable import/extensions */
/* eslint-disable no-console */
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
// import path from 'path';
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
      setPartySize: this.setPartySize.bind(this),
    };

    this.day = new Date().getDate();
    this.year = new Date().getYear() + 1900;
    this.month = new Date().getMonth();
    this.todaysId = calendarHelpers.createId(this.year, this.month, this.day);
    this.state = {
      dates_closed: [],
      restaurant_name: '',
      timeslots: [[1100], [1100], [1100], [1100], [1100], [1100], [1100]],
      todaysDate: new Date(), // .getDate() for number
      selectedDateId: this.todaysId,
      selectedWeekdayIndex: new Date().getDay(),
      latestMonthAllowed: calendarHelpers.getLatestMonth(this.month),
      selectedMonthNumber: this.month,
      selectedMonthName: calendarHelpers.monthNumToName(this.month),
      selectedYear: new Date().getYear() + 1900,
      longDate: calendarHelpers.parseId(this.todaysId),
      rowsOfSelectedMonth: calendarHelpers.allWeekRows(this.year, this.month),
      displayCalendar: false,
      partySize: 2,
    };
  }

  componentDidMount() {
    document.body.addEventListener('click', this.hideCalendar.bind(this));
    this.getScheduleData();
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.hideCalendar.bind(this));
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

  getScheduleData() {
    $.ajax({
      url: 'http://localhost:3000/reservations/2',
      success: (data) => {
        this.setData(data);
      },
      error: () => {
        console.log('Could not retrieve schedule data');
      },
      dataType: 'json',
    });
  }

  setData(scheduleData) {
    this.setState({
      dates_closed: scheduleData.dates_closed,
      restaurant_name: scheduleData.restaurantName,
      timeslots: scheduleData.timeslots,
    });
  }

  setPartySize(e) {
    this.setState({
      partySize: e.target.value,
    });
  }

  isPast(id) {
    return parseFloat(id) < this.todaysId;
  }

  isToday(id) {
    return parseFloat(id) === this.todaysId;
  }

  delayedClose() {
    setTimeout(() => {
      this.setState({
        displayCalendar: false,
      });
    }, 200);
  }

  selectDate(e) {
    const dateId = parseFloat(e.target.id);
    this.setState({
      selectedDateId: dateId,
      longDate: calendarHelpers.parseId(dateId),
      selectedWeekdayIndex: calendarHelpers.dayFromId(dateId),
    }, this.delayedClose);
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
      <div className='calendar-container'>
        <ReservationBox state={this.state} calendarMethods={this.calendarMethods}/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

// assign unique numerical values as ids to each table cell - done
// check if each cell's value is less than the value of the current date
// if so, add a class unselectable to those cells

// this class should make it unclickable, greyed out, and have no hover effect

// disable next or previous month clicker if the next or previous month isn't in the surrounding mos

// after completion of render, get the element where id is equal to the identifier for today's date

// research how to have a table cell as selected value, apply a 'selected' class to that (as state)
