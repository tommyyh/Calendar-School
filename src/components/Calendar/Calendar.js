import React, { useState, useEffect } from 'react';
import Selection from '../Selection/Selection';
import Header from '../Header/Header';
import Items from '../Items/Items';
import Insert from '../Insert/Insert';
import DateInsert from '../DateInsert/DateInsert';

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

  const [insertOpen, setInsertOpen] = useState(false);
  const [dateInsertOpen, setDateInsertOpen] = useState(false);
  const [dateInsertKod, setDateInsertKod] = useState('');
  const [date, setDate] = useState({
    year: currentYear,
    month: currentMonthDigit,
    days: [],
  });
  const [items, setItems] = useState([
    {
      kod: '1',
      title:
        'FJEIF EFJEIJ EFIEJFI EJFIE FEJIJF EI JFIEJF IEF JIEF IEFJEIFJHIEW HFGEUIHGEOJ FEIOJFEIEFO',
      duration: ['2024-06-10', '2024-06-15'],
      status: '',
      parentKod: '',
    },
    {
      kod: '2',
      title: 'Another item with specific duration',
      duration: ['2024-06-01', '2024-06-15'],
      status: '',
      parentKod: '',
    },
    {
      kod: '1-1',
      title: 'GJIEIGJE',
      duration: ['2024-06-03', '2024-06-06'],
      status: '',
      parentKod: '1',
    },
    {
      kod: '1-2',
      title: 'gwegweg',
      duration: ['2024-06-09', '2024-06-20'],
      status: '',
      parentKod: '1',
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
      {dateInsertOpen && (
        <DateInsert
          setDateInsertOpen={setDateInsertOpen}
          setItems={setItems}
          items={items}
          dateInsertKod={dateInsertKod}
        />
      )}
      <Selection
        date={date}
        setDate={setDate}
        months={months}
        setInsertOpen={setInsertOpen}
      />
      <Header date={date} months={months} />
      <Items
        date={date}
        items={items}
        setDateInsertKod={setDateInsertKod}
        setDateInsertOpen={setDateInsertOpen}
        setItems={setItems}
      />
    </div>
  );
};

export default Calendar;
