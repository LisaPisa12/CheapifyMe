import { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFilteredPlaces } from '../../redux/actions';

function Filter() {
  const dispatch = useDispatch();
  let previusVal = '';

  const handleClick = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log(e.target.value);
    if (previusVal === 'food' || previusVal === 'drink') {
      dispatch(setFilteredPlaces('all'));
      dispatch(setFilteredPlaces(e.target.value));
    } else {
      dispatch(setFilteredPlaces(e.target.value));
    }
    previusVal = e.target.value;
  };
  return (
    <div>
      <div className="all">
        <input
          type="radio"
          name="filter"
          id="all"
          value={'all'}
          onChange={handleClick}
        />
        <label htmlFor="all">All Offers</label>
      </div>
      <div className="food">
        <input
          type="radio"
          name="filter"
          id="food"
          value={'food'}
          onChange={handleClick}
        />
        <label htmlFor="food">Food </label>
      </div>
      <div className="drink">
        <input
          type="radio"
          name="filter"
          id="drink"
          value={'drink'}
          onChange={handleClick}
        />
        <label htmlFor="drink"> Drink</label>
      </div>
    </div>
  );
}

export default Filter;
