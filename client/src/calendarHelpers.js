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

calendarHelpers.lastDayIndexOfMonth = (year, monthNumber) => (
  new Date(year, monthNumber, calendarHelpers.lastDateOfMonth(year, monthNumber)).getDay()
);

calendarHelpers.lastDateOfMonth = (year, monthNumber) => (
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
    .lastDateOfMonth(previousMonthsYear, previousMonthNumber);

  for (let i = lastDayOfPreviousMonth - (numOfBlanks - 1); i <= lastDayOfPreviousMonth; i += 1) {
    blanksArray.push(i);
  }
  return blanksArray;

  // should return an array of the day numbers of prior month before the first day of current month
};

calendarHelpers.firstWeekRow = (year, monthNumber) => {
  const firstWeek = calendarHelpers.blankDaysBefore(year, monthNumber);
  const currentMonthsDaysInRow = 7 - firstWeek.length;
  for (let i = 1; i <= currentMonthsDaysInRow; i += 1) {
    firstWeek.push(i);
  }
  return firstWeek;
};

calendarHelpers.lastWeekRow = (year, monthNumber) => {
  const lastDate = calendarHelpers.lastDateOfMonth(year, monthNumber);
  const lastDayIndex = calendarHelpers.lastDayIndexOfMonth(year, monthNumber);
  const lastWeek = [];

  for (let i = lastDate - lastDayIndex; i <= lastDate; i += 1) {
    lastWeek.push(i);
  }

  let j = 1;
  while (lastWeek.length < 7) {
    lastWeek.push(j);
    j += 1;
  }
  return lastWeek;

  // get last day of month
  // see which day of the week that is
  // starting from the date of last day minus the index of the weekday,
  // push in to a week array all days up to the last day
  // then fill in the rest of the week starting from 1 until the length of     array is 7 is 7
};

calendarHelpers.allWeekRows = (year, monthNumber) => {
  const firstWeek = calendarHelpers.firstWeekRow(year, monthNumber);
  const lastWeek = calendarHelpers.lastWeekRow(year, monthNumber);
  const allWeeks = [];
  allWeeks.push(firstWeek);
  let currentWeek = [];
  let dayCounter = 0;
  for (let i = firstWeek[6] + 1; i < lastWeek[0]; i += 1) {
    currentWeek.push(i);
    dayCounter += 1;
    if (dayCounter === 7) {
      allWeeks.push(currentWeek);
      currentWeek = [];
      dayCounter = 0;
    }
  }
  allWeeks.push(lastWeek);
  return allWeeks;
};

export default calendarHelpers;
