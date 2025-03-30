import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { EditWeek } from '../EditWeek';
import { useAppStore, useEditWeekStore } from '../../services/state.zus';
import { create } from 'zustand';

console.log('%c [  ]-7', 'font-size:13px; background:pink; color:#bf2c9f;', jest);
// Mock zustand stores
jest.mock('../../services/state.zus', () => ({
  useAppStore: jest.fn(),
  useEditWeekStore: jest.fn(),
}));

describe('EditWeek', () => {
  const mockSetEvent = jest.fn();
  const mockSetEditWeek = jest.fn();
  const mockWeek = {
    start: {
      format: jest.fn().mockReturnValue('2023/10/26'),
      getTime: jest.fn().mockReturnValue(1698336000000),
    },
    end: {
      format: jest.fn().mockReturnValue('2023/11/02'),
      getTime: jest.fn().mockReturnValue(1699027200000),
    },
    events: [],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useAppStore as jest.Mock).mockReturnValue({
      setEvent: mockSetEvent,
    });
    (useEditWeekStore as jest.Mock).mockReturnValue({
      editWeek: null,
      setEditWeek: mockSetEditWeek,
    });
  });

  it('should not render when editWeek is null', () => {
    render(<EditWeek />);
    const dialog = screen.queryByRole('dialog');
    expect(dialog).not.toBeInTheDocument();
  });

  it('should render when editWeek is set', () => {
    (useEditWeekStore as jest.Mock).mockReturnValue({
      editWeek: mockWeek,
      setEditWeek: mockSetEditWeek,
    });
    render(<EditWeek />);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
  });

  it('should render textarea with correct value', () => {
    const mockWeekWithEvent = {
      ...mockWeek,
      events: [{ note: 'Test Note' }],
    }(useEditWeekStore as jest.Mock).mockReturnValue({
      editWeek: mockWeekWithEvent,
      setEditWeek: mockSetEditWeek,
    });
    render(<EditWeek />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveValue('Test Note');
  });
  it('should update note state when textarea value changes', () => {
    (useEditWeekStore as jest.Mock).mockReturnValue({
      editWeek: mockWeek,
      setEditWeek: mockSetEditWeek,
    });
    render(<EditWeek />);
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'New Note' } });
    expect(textarea).toHaveValue('New Note');
  });
  it('should call setEvent with correct data when textarea blurs', () => {
    (useEditWeekStore as jest.Mock).mockReturnValue({
      editWeek: mockWeek,
      setEditWeek: mockSetEditWeek,
    });
    render(<EditWeek />);
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'New Note' } });
    fireEvent.blur(textarea);

    expect(mockSetEditWeek).toHaveBeenCalledWith(null);
    expect(mockSetEvent).toHaveBeenCalledWith({
      start: mockWeek.start,
      end: mockWeek.end,
      note: 'New Note',
    });
  });
  it('should call setEditWeek(null) on escape key press', () => {
    (useEditWeekStore as jest.Mock).mockReturnValue({
      editWeek: mockWeek,
      setEditWeek: mockSetEditWeek,
    });
    render(<EditWeek />);
    fireEvent.keyDown(document.body, { key: 'Escape', code: 'Escape' });
    expect(mockSetEditWeek).toHaveBeenCalledWith(null);
  });
  it('should not call setEvent when textarea blurs with empty value', () => {
    (useEditWeekStore as jest.Mock).mockReturnValue({
      editWeek: mockWeek,
      setEditWeek: mockSetEditWeek,
    });
    render(<EditWeek />);
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: '' } });
    fireEvent.blur(textarea);
    expect(mockSetEditWeek).toHaveBeenCalledWith(null);
    expect(mockSetEvent).not.toHaveBeenCalled();
  });
});
