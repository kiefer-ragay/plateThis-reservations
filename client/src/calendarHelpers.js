const calendarHelpers = {};

calendarHelpers.getSurroundingMonths = () => {
  const monthObj = {};
  const currentDate = new Date();
  const currentYear = currentDate.getYear();
  const currentMonth = currentDate.getMonth();
  for (let i = currentMonth; i <= currentMonth + 3; i += 1) {
    if (i > 11) {
      monthObj[calendarHelpers.monthName(i - 11)] = (32
        - new Date(currentYear + 1, i - 11, 32).getDate());
    } else {
      monthObj[calendarHelpers.monthName(i)] = (32 - new Date(currentYear, i, 32).getDate());
    }
  }
  return monthObj;
};

calendarHelpers.monthName = (monthNumber) => {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return monthNames[monthNumber];
};

export default calendarHelpers;
