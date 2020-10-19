import styles from './DashList.module.css';

import ListItem from '../ListItem';
import { useSelector } from 'react-redux';
import { RootState, place } from '../../types/redux';
import { useState } from 'react';

function DashList() {
  const places = useSelector((state: RootState) => state.places);
  const [showList, setShowList] = useState(false);
  let counter = 0;
  function getOffer(places: place[]) {
    if (places.length > 0) {
      places.forEach((el) => (counter += el.offers.length));
    }
  }
  getOffer(places);
  return (
    <>
      {showList ? (
        <div className={styles.show_list_container}>
          <div
            className={styles.close}
            onClick={() => {
              setShowList(false);
            }}
          >
            <h3 className={styles.text}>
              there are {counter} cheapify offers nearby
            </h3>
          </div>
          {places.map((el) => (
            <ListItem place={el} key={el.id} />
          ))}
        </div>
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
    </>
  );
}
export default DashList;
