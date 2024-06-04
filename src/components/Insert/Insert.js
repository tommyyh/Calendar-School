import React, { useState } from 'react';
import style from './insert.module.css';

const Insert = ({ setInsertOpen, setItems, items }) => {
  const [data, setData] = useState({
    kod: '',
    title: '',
    parentKod: '',
  });

  const onSubmit = (e) => {
    e.preventDefault();

    const date = new Date();
    const today = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      '0'
    )}-${String(date.getDate()).padStart(2, '0')}`;

    setItems([
      ...items,
      {
        kod: data.kod,
        title: data.title,
        parentKod: data.parentKod,
        duration: [today, today],
        status: 'new',
      },
    ]);
    setInsertOpen(false);
  };

  return (
    <form className={style.insert} onSubmit={onSubmit}>
      <button onClick={() => setInsertOpen(false)} className={style.close}>
        Zavrit
      </button>

      <div>
        <input
          type="text"
          name="kod"
          id={style.kod}
          placeholder="Kod"
          required
          onChange={(e) => setData({ ...data, kod: e.target.value })}
        />
      </div>

      <div>
        <input
          type="text"
          name="title"
          required
          id={style.item}
          placeholder="Nazev polozky"
          onChange={(e) => setData({ ...data, title: e.target.value })}
        />
      </div>

      <div>
        <select
          name="parentKod"
          onChange={(e) => setData({ ...data, parentKod: e.target.value })}
        >
          <option value="">Kod nadrazene polozky</option>
          {items.map(
            (item) =>
              !item.parentKod && (
                <option value={`${item.kod}`}>{item.kod}</option>
              )
          )}
        </select>
      </div>

      <button className={style.add} type="submit">
        Pridat polozku
      </button>
    </form>
  );
};

export default Insert;
