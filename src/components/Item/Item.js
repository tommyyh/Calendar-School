// Item.js

import React from 'react';
import style from './item.module.css';

const Item = ({ date, item }) => {
  const { kod, title, duration } = item;

  // Convert specific dates to day indices (1-based)
  const [startYear, startMonth, startDay] = duration[0].split('-').map(Number);
  const [, , endDay] = duration[1].split('-').map(Number);

  const coveredDays = [];

  for (let i = startDay; i <= endDay; i++) {
    coveredDays.push(new Date(startYear, startMonth - 1, i).getDate());
  }

  return (
    <ul className={style.item}>
      <li>{kod}</li>
      <li>{title}</li>
      {date.days.map((day, index) => (
        <li
          key={index}
          className={coveredDays.includes(day.date) ? style.coveredDay : ''}
        ></li>
      ))}
    </ul>
  );
};

export default Item;
