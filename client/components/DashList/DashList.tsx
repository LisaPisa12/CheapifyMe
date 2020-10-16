import styles from './DashList.module.css';

import { useSelector } from 'react-redux';
import { RootState, place } from '../../types/redux';

function DashList() {
  const places = useSelector((state: RootState) => state.places);
  let counter = 0;
  function getOffer(places: place[]) {
    if (places.length > 0) {
      places.forEach((el) => (counter += el.offers.length));
    }
  }
  getOffer(places);
  return (
    <div className={styles.list_container}>
      <h3 className={styles.text}>
        there are {counter} cheapify offers nearby
      </h3>
    </div>
  );
}
export default DashList;
