import { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { setFilteredPlaces } from '../../redux/actions';
import { motion } from 'framer-motion';
import styles from './Filter.module.css';

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
    <div className={styles.filter_container}>
      <div className="all">
        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.95 }}>
          <input
            type="radio"
            name="filter"
            id="all"
            value={'all'}
            onChange={handleClick}
            className={styles.hidde_button}
          />
          <label htmlFor="all">All Offers</label>
        </motion.div>
      </div>

      <div className="food">
        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.95 }}>
          <input
            type="radio"
            name="filter"
            id="food"
            value={'food'}
            onChange={handleClick}
            className={styles.hidde_button}
          />
          <label htmlFor="food">Food </label>
        </motion.div>
      </div>

      <div className="drink">
        <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.95 }}>
          <input
            type="radio"
            name="filter"
            id="drink"
            value={'drink'}
            onChange={handleClick}
            className={styles.hidde_button}
          />
          <label htmlFor="drink"> Drink</label>
        </motion.div>
      </div>
    </div>
  );
}

export default Filter;
