import React, { useState } from 'react';
import style from './insert.module.css';

const Insert = ({ setInsertOpen, setItems, items }) => {
  const [data, setData] = useState({
    kod: '',
    title: '',
  });

  const onSubmit = () => {
    const date = new Date();
    const today = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;

    setItems([
      ...items,
      {
        kod: data.kod,
        title: data.title,
        duration: [today, today],
        status: 'new',
      },
    ]);
    setInsertOpen(false);
  };

  return (
    <div className={style.insert}>
      <button onClick={() => setInsertOpen(false)} className={style.close}>
        Zavrit
      </button>

      <div>
        <input
          type="text"
          name="kod"
          id={style.kod}
          placeholder="Kod"
          onChange={(e) => setData({ ...data, kod: e.target.value })}
        />
      </div>

      <div>
        <input
          type="text"
          name="title"
          id={style.item}
          placeholder="Nazev polozky"
          onChange={(e) => setData({ ...data, title: e.target.value })}
        />
      </div>

      <button className={style.add} onClick={onSubmit}>
        Pridat polozku
      </button>
    </div>
  );
};

export default Insert;
