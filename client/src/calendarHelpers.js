const calendarHelpers = {};

calendarHelpers.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

calendarHelpers.weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

calendarHelpers.getSurroundingMonths = () => {
  const monthObj = {};
  const currentDate = new Date();
  const currentYear = currentDate.getYear();
  const currentMonth = currentDate.getMonth();
  for (let i = currentMonth - 1; i <= currentMonth + 3; i += 1) {
    if (i > 11) {
      monthObj[calendarHelpers.monthNumToName(i - 11)] = (32
        - new Date(currentYear + 1, i - 11, 32).getDate());
    } else if (i === -1) {
      monthObj[calendarHelpers.monthNumToName(11)] = (32
        - new Date(currentYear - 1, 11, 32).getDate());
    } else {
      monthObj[calendarHelpers.monthNumToName(i)] = (32 - new Date(currentYear, i, 32).getDate());
    }
  }
  return monthObj;
};

calendarHelpers.firstDayOfMonth = (year, monthNumber) => (
  calendarHelpers.weekdays[new Date(year, monthNumber, 1).getDay()]
);

calendarHelpers.lastDayOfMonth = (year, monthNumber) => (
  32 - new Date(year, monthNumber, 32).getDate()
);

calendarHelpers.monthNameToNum = (monthName) => (
  calendarHelpers.months.indexOf(monthName)
);

calendarHelpers.monthNumToName = (monthNumber) => (
  calendarHelpers.months[monthNumber]
);

calendarHelpers.blankDaysBefore = (year, monthNumber) => {
  const blanksArray = [];
  const numOfBlanks = new Date(year, monthNumber, 1).getDay();
  let previousMonthNumber = monthNumber - 1;
  let previousMonthsYear = year;
  if (monthNumber === 0) {
    previousMonthNumber = 11;
    previousMonthsYear -= 1;
  }
  const lastDayOfPreviousMonth = calendarHelpers
    .lastDayOfMonth(previousMonthsYear, previousMonthNumber);

  for (let i = lastDayOfPreviousMonth - (numOfBlanks - 1); i <= lastDayOfPreviousMonth; i += 1) {
    blanksArray.push(i);
  }
  return blanksArray;

   //should return an array of the day numbers of prior month before the first day of current month
};

calendarHelpers.firstWeekRow = (year, monthNumber) => {
  const firstWeek = calendarHelpers.blankDaysBefore(year, monthNumber);
  const currentMonthsDaysInRow = 7 - firstWeek.length;
  for (let i = 1; i <= currentMonthsDaysInRow; i += 1) {
    firstWeek.push(i);
  }
  return firstWeek;
};

export default calendarHelpers;
