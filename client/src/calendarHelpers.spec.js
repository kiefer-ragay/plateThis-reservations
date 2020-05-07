/* eslint-disable import/extensions */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

// use jest --updateSnapshot --'testNamePattern' to re-record snapshot of particular test

import { shallow } from 'enzyme';
import React from 'react';
import calendarHelpers from './calendarHelpers.js';
import testData from './calendarTestData.js';

describe('Calendar Helpers First Day of Month', () => {
  it('should return the correct weekday of the first day of each month', () => {
    const firstDayOfMay2020 = calendarHelpers.firstDayOfMonth(2020, 4);
    const firstDayOfAugust2010 = calendarHelpers.firstDayOfMonth(2010, 7);
    expect(firstDayOfMay2020).toBe('Fr');
    expect(firstDayOfAugust2010).toBe('Su');
  });
});

describe('Calendar Helpers Last Day Index of Month', () => {
  it('should return the correct weekday of the first day of each month', () => {
    const lastDayIndexOfMay2020 = calendarHelpers.lastDayIndexOfMonth(2020, 4);
    const lastDayIndexOfAugust2010 = calendarHelpers.lastDayIndexOfMonth(2010, 7);
    expect(lastDayIndexOfMay2020).toBe(0);
    expect(lastDayIndexOfAugust2010).toBe(2);
  });
});

describe('Calendar Helpers blankDaysBefore', () => {
  it('should return the correct days of the prior month that come within the same week as the first day of current month', () => {
    const blankDaysBeforeMay = calendarHelpers.blankDaysBefore(2020, 4);
    const blankDaysBeforeJanuary = calendarHelpers.blankDaysBefore(2020, 0);
    expect(blankDaysBeforeMay).toStrictEqual(testData.blanksMay);
    expect(blankDaysBeforeJanuary).toStrictEqual(testData.blanksJanuary);
  });
});

describe('Calendar Helpers firstWeekRow', () => {
  it('should return an array of the correct dates for the first week of the month', () => {
    const firstRowOfMay2020 = calendarHelpers.firstWeekRow(2020, 4);
    const firstRowOfJanuary2020 = calendarHelpers.firstWeekRow(2020, 0);
    expect(firstRowOfMay2020).toStrictEqual(testData.firstMay);
    expect(firstRowOfJanuary2020).toStrictEqual(testData.firstJanuary);
  });
});

describe('Calendar Helpers lastWeekRow', () => {
  it('should return an array of the correct dates for the last week of the month', () => {
    const lastRowOfMay2020 = calendarHelpers.lastWeekRow(2020, 4);
    const lastRowOfDecember2019 = calendarHelpers.lastWeekRow(2019, 11);
    expect(lastRowOfMay2020).toStrictEqual(testData.lastMay);
    expect(lastRowOfDecember2019).toStrictEqual(testData.lastDecember);
  });
});

describe('Calendar Helpers allWeekRows', () => {
  it('should return an array of the correct dates for all of the month', () => {
    const allRowsOfMay2020 = calendarHelpers.allWeekRows(2020, 4);
    const allRowsOfJanuary2020 = calendarHelpers.allWeekRows(2020, 0);
    const allRowsOfDecember2019 = calendarHelpers.allWeekRows(2019, 11);
    expect(allRowsOfMay2020).toStrictEqual(testData.allMay);
    expect(allRowsOfJanuary2020).toStrictEqual(testData.allJanuary);
    expect(allRowsOfDecember2019).toStrictEqual(testData.allDecember);
  });
});
