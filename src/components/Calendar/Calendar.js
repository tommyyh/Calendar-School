import React, { useState, useEffect } from 'react';
import style from './calendar.module.css';
import Selection from '../Selection/Selection';
import Header from '../Header/Header';
import Items from '../Items/Items';
import Insert from '../Insert/Insert';

const months = {
  1: 'leden',
  2: 'únor',
  3: 'březen',
  4: 'duben',
  5: 'květen',
  6: 'červen',
  7: 'červenec',
  8: 'srpen',
  9: 'září',
  10: 'říjen',
  11: 'listopad',
  12: 'prosince',
};

const getLastDayOfMonth = (year, month) => {
  return new Date(year, month, 0).getDate();
};

const getDayName = (year, month, day) => {
  const dayIndex = new Date(year, month - 1, day).getDay();
  const daysOfWeek = ['Ne', 'Po', 'Út', 'St', 'Čt', 'Pá', 'So'];
  return daysOfWeek[dayIndex];
};

const Calendar = () => {
  const currentDate = new Date();
  const currentMonthDigit = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const [insertOpen, setInsertOpen] = useState(true);
  const [date, setDate] = useState({
    year: currentYear,
    month: currentMonthDigit,
    days: [],
  });
  const [items, setItems] = useState([
    {
      kod: 'S30-1',
      title: 'Tomas je kokot a ma krivy pero',
      duration: ['2024-05-10', '2024-05-15'],
    },
    {
      kod: 'S30-2',
      title: 'Another item with specific duration',
      duration: ['2024-05-20', '2024-05-22'],
    },
  ]);

  useEffect(() => {
    const lastDayOfMonth = getLastDayOfMonth(date.year, date.month);
    const daysArray = [];

    for (let i = 1; i <= lastDayOfMonth; i++) {
      const dayName = getDayName(date.year, date.month, i);
      daysArray.push({ date: i, dayName });
    }

    setDate({ ...date, days: daysArray });
  }, [date.year, date.month]);

  return (
    <div>
      {insertOpen && (
        <Insert
          setInsertOpen={setInsertOpen}
          setItems={setItems}
          items={items}
        />
      )}
      <Selection
        date={date}
        setDate={setDate}
        months={months}
        setInsertOpen={setInsertOpen}
      />
      <Header date={date} months={months} />
      <Items date={date} items={items} />
    </div>
  );
};

export default Calendar;
