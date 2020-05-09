import styled from 'styled-components';
import React from 'react';
import MonthSelector from './MonthSelector.jsx';
import CalendarTable from './CalendarTable.jsx';
import calendarHelpers from '../calendarHelpers.js';

const CalendarWrapper = styled.div`
  border: 0;
  display: ${(props) => (props.displayed ? 'inline-block' : 'none')};
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 18px rgba(0, 0, 0, .15);
  min-width: 312px;
  border: 1px solid #ccc;
  position: absolute;
  top: 113px;
  left: 24px;
  z-index: 1;
`;

class CalendarClass extends React.Component {
  constructor(props) {
    super(props);

    this.calendarMethods = {
      getNextMonth: this.getNextMonth.bind(this),
      getPreviousMonth: this.getPreviousMonth.bind(this),
      isPast: this.isPast.bind(this),
      isToday: this.isToday.bind(this),
    };

    this.todaysId = calendarHelpers.createId(new Date().getYear() + 1900, new Date().getMonth(),
      new Date().getDate());
    this.latestMonthAllowed = calendarHelpers.getLatestMonth(new Date().getMonth());
    this.state = {
      selectedMonthNumber: this.month,
      selectedMonthName: calendarHelpers.monthNumToName(this.month),
      selectedYear: new Date().getYear() + 1900,
      latestMonthAllowed: calendarHelpers.getLatestMonth(this.month),
      rowsOfSelectedMonth: calendarHelpers.allWeekRows(this.year, this.month),
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

  isPast(id) {
    return parseFloat(id) < this.todaysId;
  }

  isToday(id) {
    return parseFloat(id) === this.todaysId;
  }

  render() {
    return (
    <CalendarWrapper onClick={this.props.reservationMethods.showCalendar}
    // displayed is passed down through main app state
     displayed={this.props.topState.displayCalendar}>
      <MonthSelector state={this.state} calendarMethods={this.calendarMethods}/>
      <CalendarTable state={this.state} calendarMethods={this.calendarMethods} reservationMethods={this.props.reservationMethods} selectedId={this.props.topState.selectedDateId}/>
   </CalendarWrapper>
    );
  }
}

export default CalendarClass;
