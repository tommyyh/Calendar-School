import React from 'react';
import style from './selection.module.css';

const Selection = ({ date, setDate, months, setInsertOpen }) => {
  // Previous month
  const prevMonth = () => {
    if (date.month <= 1) {
      setDate({ ...date, month: 12, year: date.year - 1 });
    } else {
      setDate({ ...date, month: date.month - 1 });
    }
  };

  // Next month
  const nextMonth = () => {
    if (date.month >= 12) {
      setDate({ ...date, month: 1, year: date.year + 1 });
    } else {
      setDate({ ...date, month: date.month + 1 });
    }
  };

  // Previous year
  const prevYear = () => {
    if (date.year <= 0) return;

    setDate({ ...date, year: date.year - 1 });
  };

  // Next year
  const nextYear = () => {
    setDate({ ...date, year: date.year + 1 });
  };

  return (
    <div className={style.dateSelection}>
      <div>
        <button onClick={prevYear}>{'<<'}</button>
        <button onClick={prevMonth}>{'<'}</button>
      </div>

      <div className={style.center}>
        <h5>
          {months[date.month]} {date.year}
        </h5>
      </div>

      <div>
        <button onClick={nextMonth}>{'>'}</button>
        <button onClick={nextYear}>{'>>'}</button>
      </div>

      <button id={style.insert} onClick={() => setInsertOpen(true)}>
        Vlozit zakazku
      </button>
    </div>
  );
};

export default Selection;
