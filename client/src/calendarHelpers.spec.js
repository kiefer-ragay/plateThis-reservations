/* eslint-disable import/extensions */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

// use jest --updateSnapshot --'testNamePattern' to re-record snapshot of particular test

import { shallow } from 'enzyme';
import React from 'react';
import calendarHelpers from './calendarHelpers.js';

describe('Calendar Helpers First Day of Month', () => {
  it('should return the correct weekday of the first day of each month', () => {
    const firstDayOfMay2020 = calendarHelpers.firstDayOfMonth(2020, 4);
    const firstDayOfAugust2010 = calendarHelpers.firstDayOfMonth(2010, 7);
    expect(firstDayOfMay2020).toBe('Fr');
    expect(firstDayOfAugust2010).toBe('Su');
  });
});

describe('Calendar Helpers blankDaysBefore', () => {
  it('should return the correct days of the prior month that come within the same week as the first day of current month', () => {
    const blankDaysBeforeMay = calendarHelpers.blankDaysBefore(2020, 4);
    expect(blankDaysBeforeMay).toStrictEqual([26, 27, 28, 29, 30]);
  });
});

describe('Calendar Helpers firstWeekRow', () => {
  it('should return an array of the correct dates for the first week of the month', () => {
    const firstRowOfMay2020 = calendarHelpers.firstWeekRow(2020, 4);
    expect(firstRowOfMay2020).toStrictEqual([26, 27, 28, 29, 30, 1, 2]);
  });
});

describe('Calendar Helpers lastWeekRow', () => {
  it('should return an array of the correct dates for the last week of the month', () => {
    const lastRowOfMay2020 = calendarHelpers.lastWeekRow(2020, 4);
    expect(firstRowOfMay2020).toStrictEqual([31, 1, 2, 3, 4, 5, 6]);
  });
});

describe('Calendar Helpers midWeekRows', () => {
  it('should return an array of the correct dates for the middle weeks of the month', () => {
    const allRowsOfMay2020 = calendarHelpers.allWeekRows(2020, 4);
    expect(allRowsOfMay2020).toStrictEqual([[26, 27, 28, 29, 30, 1, 2],
      [3, 4, 5, 6, 7, 8, 9], [10, 11, 12, 13, 14, 15, 16],
      [17, 18, 19, 20, 21, 22, 23], [24, 25, 26, 27, 28, 29, 30],
      [31, 1, 2, 3, 4, 5, 6]]);
  });
});
