import React from 'react';
import style from './insert.module.css';

const Insert = ({ setInsertOpen, setItems, items }) => {
  return (
    <div className={style.insert}>
      <button onClick={() => setInsertOpen(false)} className={style.close}>
        Zavrit
      </button>

      <form>
        <div>
          <input
            type="text"
            name="kod"
            id={style.kod}
            placeholder="Kod"
            onChange={(e) => setItems([...items, { kod: e.target.value }])}
          />
        </div>

        <div>
          <input
            type="text"
            name="item"
            id={style.item}
            placeholder="Nazev polozky"
          />
        </div>

        <button className={style.add}>Pridat polozku</button>
      </form>
    </div>
  );
};

export default Insert;
