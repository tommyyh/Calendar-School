import React, { useState } from 'react';
import style from './item.module.css';

const Item = ({
  date,
  item,
  setDateInsertOpen,
  setDateInsertKod,
  setItems,
}) => {
  const { kod, title, duration } = item;
  const [deleteOpen, setDeleteOpen] = useState(false);

  let coveredDays = [];
  let statusClass = 'new';

  switch (item.status) {
    case 'new':
      statusClass = style.itemNew;
      break;
    case 'pending':
      statusClass = style.itemPending;
      break;
    case 'finished':
      statusClass = style.itemFinished;
      break;
  }

  if (duration && duration.length > 0) {
    const [startYear, startMonth, startDay] = duration[0]
      .split('-')
      .map(Number);
    const [endYear, endMonth, endDay] = duration[1].split('-').map(Number);

    let currentDate = new Date(startYear, startMonth - 1, startDay);

    while (currentDate <= new Date(endYear, endMonth - 1, endDay)) {
      coveredDays.push({
        year: currentDate.getFullYear(),
        month: currentDate.getMonth() + 1,
        day: currentDate.getDate(),
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  const removeItem = () => {
    setItems((currentItems) => currentItems.filter((item) => item.kod !== kod));
  };

  return (
    <ul className={style.item}>
      <li
        onMouseEnter={() => setDeleteOpen(true)}
        onMouseLeave={() => setDeleteOpen(false)}
      >
        {deleteOpen ? (
          <span
            onClick={removeItem}
            style={{ background: 'red', color: '#fff' }}
          >
            Smazat
          </span>
        ) : (
          kod
        )}
      </li>
      <li id={style.kokot}>{title}</li>
      {date.days.map((day, index) => {
        const isCovered = coveredDays.some(
          (coveredDay) =>
            coveredDay.year === date.year &&
            coveredDay.month === date.month &&
            coveredDay.day === day.date
        );

        return (
          <li
            onClick={() => {
              setDateInsertKod(kod);
              setDateInsertOpen(true);
            }}
            key={index}
            className={isCovered ? style.coveredDay : ''}
            id={isCovered ? statusClass : ''}
          ></li>
        );
      })}
    </ul>
  );
};

export default Item;
