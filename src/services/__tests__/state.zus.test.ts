import { useAppStore } from '../state.zus';
import {describe, it, expect, beforeEach} from 'bun:test';

describe('yearsSinceBirth', () => {
  beforeEach(() => {
    const {setBirthday} = useAppStore.setState({
      birthday: new Date('1972-08-07')
    });
  });

  it('should calculate the correct years since birth for a given date', () => {
    const {yearsSinceBirth} = useAppStore.getState();
    const testDate = new Date('2022-08-07'); // 50 years after the birthday
    const years = yearsSinceBirth(testDate);
    expect(years).toBe(50);
  });

  it('should return 0 years if the date is the same as the birthday', () => {
    const store = useAppStore.getState();
    const testDate = new Date('1972-08-07');
    const years = store.yearsSinceBirth(testDate);
    expect(years).toBe(0);
  });

  it('should calculate the correct years for a date before the birthday', () => {
    const store = useAppStore.getState();
    const testDate = new Date('1970-08-07'); // 2 years before the birthday
    const years = store.yearsSinceBirth(testDate);
    expect(years).toBe(-2);
  });
});