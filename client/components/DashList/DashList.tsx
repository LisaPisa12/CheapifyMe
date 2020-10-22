import styles from './DashList.module.css';

import ListItem from '../ListItem';
import { useSelector } from 'react-redux';
import { RootState, place } from '../../types/redux';
import { useState } from 'react';

import Filter from '../Filter';
import { motion } from 'framer-motion';

const easing = [0.6, -0.05, 0.01, 0.99];

const fadeInUp = {
  initial: {
    y: 100,
    opacity: 0
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing
    }
  }
};

const showAnimation = {
  initial: {
    y: 500
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing
    }
  },
  exit: {
    y: 0,
    transition: {
      duration: 0.6,
      ease: easing
    }
  }
};

function DashList() {
  const places = useSelector((state: RootState) => state.filteredPlaces);
  const [showList, setShowList] = useState(false);
  let counter = 0;
  function getOffer(places: place[]) {
    if (places.length > 0) {
      places.forEach((el) => {
        if (el.offers) counter += el.offers.length;
      });
    }
  }
  getOffer(places);
  return (
    <motion.div variants={fadeInUp} className={styles.fixingScroll}>
      {showList ? (
        <motion.div
          exit="exit"
          variants={showAnimation}
          className={styles.show_list_container}
        >
          <div className={styles.close}>
            <h3
              className={styles.text}
              onClick={() => {
                setShowList(false);
              }}
            >
              {counter} offers nearby
            </h3>
            <Filter />
          </div>
          <div className={styles.list_item_container}>
            {places.map((el) => {
              if (el.offers) {
                return el.offers.map((offer) => (
                  <ListItem offer={offer} name={el.name} key={el.id} />
                ));
              }
            })}
          </div>
        </motion.div>
      ) : (
        <div
          className={styles.list_container}
          onClick={() => {
            setShowList(true);
          }}
        >
          <h3 className={styles.text}>
            there are {counter} cheapify offers nearby
          </h3>
        </div>
      )}
    </motion.div>
  );
}
export default DashList;
