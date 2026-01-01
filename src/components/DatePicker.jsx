import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const DatePicker = ({ selectedDate, onDateChange }) => {
  const handlePrevDay = () => {
    const date = new Date(selectedDate);
    date.setDate(date.getDate() - 1);
    onDateChange(date.toISOString().split('T')[0]);
  };

  const handleNextDay = () => {
    const date = new Date(selectedDate);
    date.setDate(date.getDate() + 1);
    onDateChange(date.toISOString().split('T')[0]);
  };

  const handleTodayClick = () => {
    onDateChange(new Date().toISOString().split('T')[0]);
  };

  const isToday = selectedDate === new Date().toISOString().split('T')[0];

  return (
    <div className="flex items-center justify-center gap-4 bg-white rounded-lg p-4 border border-slate-200">
      <button
        onClick={handlePrevDay}
        className="p-2 hover:bg-slate-100 rounded-lg transition"
        aria-label="Previous day"
      >
        <ChevronLeft size={20} className="text-slate-600" />
      </button>

      <input
        type="date"
        value={selectedDate}
        onChange={(e) => onDateChange(e.target.value)}
        className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400"
      />

      <button
        onClick={handleNextDay}
        className="p-2 hover:bg-slate-100 rounded-lg transition"
        aria-label="Next day"
      >
        <ChevronRight size={20} className="text-slate-600" />
      </button>

      <button
        onClick={handleTodayClick}
        className={`px-4 py-2 rounded-lg transition font-medium ${
          isToday
            ? 'bg-slate-800 text-white'
            : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
        }`}
      >
        Today
      </button>
    </div>
  );
};

export default DatePicker;

