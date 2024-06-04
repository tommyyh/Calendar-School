import React, { useState } from 'react';
import style from './item.module.css';
import Arrow from '../assets/ntb.svg';
import Smazat from '../assets/mmd.svg';

const Item = ({
  date,
  item,
  setDateInsertOpen,
  setDateInsertKod,
  setItems,
  items,
}) => {
  const { kod, title, duration, status, parentKod } = item;
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [childOpen, setChildOpen] = useState(false);

  let coveredDays = [];
  let statusClass = 'new';

  switch (status) {
    case 'new':
      statusClass = style.itemNew;
      break;
    case 'pending':
      statusClass = style.itemPending;
      break;
    case 'finished':
      statusClass = style.itemFinished;
      break;
    default:
      break;
  }

  // Ukazem jaky dny jsou vybarveny podle duration
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
    setItems((currentItems) => currentItems.filter((i) => i.kod !== kod));
  };

  const itemChildren = items.filter((x) => x.parentKod === kod);
  const itemParent = items.filter((y) => y.kod === parentKod); // Items parent element

  return itemParent[0] ? null : (
    <>
      {/* Nadrazeny item */}
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
        <li id={style.smazat}>
          {/* Sipka dolu na otevereni */}
          {itemChildren[0] && (
            <button onClick={() => setChildOpen(!childOpen)}>
              {childOpen ? (
                <img src={Arrow} alt="fefe" />
              ) : (
                <img
                  src={Arrow}
                  alt="fefe"
                  style={{ transform: 'rotate(180deg)' }}
                />
              )}
            </button>
          )}
          {title}
        </li>
        {/* Dny  */}
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

      {/* Children */}
      {/* Children */}
      {/* Children */}
      {itemChildren[0] &&
        childOpen &&
        itemChildren.map((child) => {
          let childCoveredDays = [];
          let childStatusClass = 'new';

          switch (child.status) {
            case 'new':
              childStatusClass = style.itemNew;
              break;
            case 'pending':
              childStatusClass = style.itemPending;
              break;
            case 'finished':
              childStatusClass = style.itemFinished;
              break;
            default:
              break;
          }

          if (child.duration && child.duration.length > 0) {
            const [childStartYear, childStartMonth, childStartDay] =
              child.duration[0].split('-').map(Number);
            const [childEndYear, childEndMonth, childEndDay] = child.duration[1]
              .split('-')
              .map(Number);

            let childCurrentDate = new Date(
              childStartYear,
              childStartMonth - 1,
              childStartDay
            );

            while (
              childCurrentDate <=
              new Date(childEndYear, childEndMonth - 1, childEndDay)
            ) {
              childCoveredDays.push({
                year: childCurrentDate.getFullYear(),
                month: childCurrentDate.getMonth() + 1,
                day: childCurrentDate.getDate(),
              });
              childCurrentDate.setDate(childCurrentDate.getDate() + 1);
            }
          }

          return (
            <ul className={`${style.item} ${style.childItem}`} key={child.kod}>
              <li id={style.hollow}></li>
              {/* Smazat */}
              <li id={style.smazat}>
                <button
                  onClick={() =>
                    setItems((currentItems) =>
                      currentItems.filter((i) => i.kod !== child.kod)
                    )
                  }
                >
                  <img src={Smazat} alt="fefe" />
                </button>
                <b>({child.kod})</b>: {child.title}
              </li>
              {/* Dny vybarveny a nevybarveny */}
              {date.days.map((day, index) => {
                const isChildCovered = childCoveredDays.some(
                  (coveredDay) =>
                    coveredDay.year === date.year &&
                    coveredDay.month === date.month &&
                    coveredDay.day === day.date
                );

                return (
                  <li
                    onClick={() => {
                      setDateInsertKod(child.kod);
                      setDateInsertOpen(true);
                    }}
                    key={index}
                    className={isChildCovered ? style.coveredDay : ''}
                    id={isChildCovered ? childStatusClass : ''}
                  ></li>
                );
              })}
            </ul>
          );
        })}
    </>
  );
};

export default Item;
