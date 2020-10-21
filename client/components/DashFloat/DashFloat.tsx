import styles from './DashFloat.module.css';

import { useSelector } from 'react-redux';
import { RootState } from '../../types/redux';

import calculateDistance from '../../helpers/calcDistance';

import { WatchedElement } from './element';

function DashFloat() {
  const places = useSelector((state: RootState) => state.places);
  const thisId = useSelector((state: RootState) => state.selectedId);
  const userCoords = useSelector((state: RootState) => state.userCoords);

  const createGrid = () => {
    const root = document.documentElement;
    root.style.setProperty('--total', Math.floor(places.length).toString());
  };

  createGrid();

  const selectCorrectDiv = () => {
    if (window && document) document?.getElementById('focus')?.focus();
  };

  setTimeout(() => {
    selectCorrectDiv();
  }, 0);

  return (
    <div className={styles.float_container} data-testid="float_container">
      {places.map((element, index) => (
        <WatchedElement place={element} key={element.id} index={index}>
          <div
            className={styles.container}
            tabIndex={index === thisId ? 0 : 10}
            id={index === thisId ? 'focus' : ''}
          >
            <div className={styles.restaurant_data}>
              <h2>{element.name}</h2>
              {element.address ? <p>{element.address}</p> : ''}
              <p>
                {calculateDistance(
                  userCoords.latitude,
                  userCoords.longitude,
                  element.location?.coordinates[0],
                  element.location?.coordinates[1]
                )}{' '}
                km far away
              </p>
              <p>{element.offers.length} offers</p>
            </div>
            <div className={styles.restaurant_offers}>
              {element.offers.map((offer) => (
                <div className={styles.offers_data} key={offer.id}>
                  <p>{offer.description}</p>
                  <p>{offer.offerType}</p>
                  <p className={styles.dates}>
                    Offers ends on {offer.end ? offer.end : ''}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </WatchedElement>
      ))}
      <div className={styles.empty}></div>
    </div>
  );
}

export default DashFloat;
