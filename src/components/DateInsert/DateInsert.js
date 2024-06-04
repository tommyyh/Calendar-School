import React, { useEffect, useState } from 'react';
import style from './dateInsert.module.css';

const DateInsert = ({ setDateInsertOpen, setItems, items, dateInsertKod }) => {
  const originItemIndex = items.findIndex((x) => x.kod === dateInsertKod);
  const originItem = items.find((x) => x.kod === dateInsertKod);
  const [data, setData] = useState({
    start: originItem.duration[0],
    end: originItem.duration[1],
    status: 'new',
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (originItemIndex !== -1) {
      const updatedItems = [...items];
      const updatedItem = {
        ...updatedItems[originItemIndex],
        status: data.status,
        duration: [data.start, data.end],
      };

      updatedItems[originItemIndex] = updatedItem;
      setItems(updatedItems);
    }

    setDateInsertOpen(false);
  };

  return (
    <div className={style.insert}>
      <button onClick={() => setDateInsertOpen(false)} className={style.close}>
        Zavrit
      </button>

      <h2>Datum a stav</h2>

      <form onSubmit={onSubmit}>
        <div>
          <label
            htmlFor={style.start}
            style={{ fontSize: '1.4rem', margin: '0 1.5rem 0 0' }}
          >
            Start
          </label>
          <input
            type="date"
            name="start"
            id={style.start}
            placeholder="Start"
            required
            onChange={(e) => setData({ ...data, start: e.target.value })}
            value={data.start}
          />
        </div>

        <div>
          <label
            htmlFor={style.end}
            style={{ fontSize: '1.4rem', margin: '0 1.5rem 0 0' }}
          >
            End
          </label>
          <input
            type="date"
            name="end"
            id={style.end}
            placeholder="end"
            required
            onChange={(e) => setData({ ...data, end: e.target.value })}
            min={data.start}
            value={data.end}
          />
        </div>

        <div>
          <select
            name="status"
            id={style.status}
            onChange={(e) => setData({ ...data, status: e.target.value })}
          >
            <option value="new">Nova</option>
            <option value="pending">V priprave</option>
            <option value="finished">Hotova</option>
          </select>
        </div>

        <button className={style.add}>Ulozit</button>
      </form>
    </div>
  );
};

export default DateInsert;
