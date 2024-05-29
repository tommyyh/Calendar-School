import React from 'react';
import style from './header.module.css';

const Header = ({ date }) => {
  return (
    <header className={style.header}>
      <ul>
        <li>Kod</li>
        <li>Polozka</li>
        {date.days.map((day, index) => (
          <li key={index}>
            <span>{day.date}</span> {day.dayName}
          </li>
        ))}
      </ul>
    </header>
  );
};

export default Header;
