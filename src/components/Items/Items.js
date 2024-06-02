import React from 'react';
import style from './items.module.css';
import Item from '../Item/Item';

const Items = ({
  date,
  items,
  setDateInsertKod,
  setDateInsertOpen,
  setItems,
}) => {
  // Filter items based on the current month
  const filteredItems = items.filter((item) => {
    if (!item.duration || item.duration.length === 0) {
      // Include items with no duration or empty duration array
      return true;
    }

    const [start, end] = item.duration;
    const startDate = new Date(start);
    const endDate = new Date(end);

    // Check if any day within the duration falls within the current month
    for (
      let currentDate = startDate;
      currentDate <= endDate;
      currentDate.setDate(currentDate.getDate() + 1)
    ) {
      const itemMonth = currentDate.getMonth() + 1; // Months are 0-indexed
      if (itemMonth === date.month) {
        return true;
      }
    }

    return false;
  });

  return (
    <div className={style.items}>
      {filteredItems.map((item) => (
        <Item
          key={item.kod} // Make sure to provide a unique key for each item
          date={date}
          item={item}
          setDateInsertKod={setDateInsertKod}
          setDateInsertOpen={setDateInsertOpen}
          setItems={setItems}
          items={items}
        />
      ))}
    </div>
  );
};

export default Items;
