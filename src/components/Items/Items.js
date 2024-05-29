import React from 'react';
import style from './items.module.css';
import Item from '../Item/Item';

const Items = ({ date, items }) => {
  return (
    <div className={style.items}>
      {items.map((item) => (
        <Item date={date} item={item} />
      ))}
    </div>
  );
};

export default Items;
