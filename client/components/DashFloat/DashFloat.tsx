import styles from './DashFloat.module.css';

import { useSelector } from 'react-redux';
import { RootState } from '../../types/redux';

import { WatchedElement } from './element';

function DashFloat() {
  const places = useSelector((state: RootState) => state.places);
  const thisId = useSelector((state: RootState) => state.selectedId);

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
            </div>
            <div className={styles.restaurant_offers}>
              {element.offers.map((offer) => (
                <div className={styles.blue} key={offer.id}>
                  <p>{offer.description}</p>
                </div>
              ))}
            </div>
          </div>
        </WatchedElement>
      ))}
      <div className={styles.empty}></div>

      {/* <div className={styles.float_info}>
        <img src="floatTest.jpg" alt="" className={styles.float_img} />
        <div className={styles.float_text}>
          <div className={styles.float_offer}>
            {place?.offers.map((el, key) => (
              <div key={key} className={styles.offer}>
                <h3>
                  <img
                    src="testOfferIcon.svg"
                    alt=""
                    className={styles.offer_icon}
                  />{' '}
                  {el.description}
                </h3>
              </div>
            ))}
          </div>
          <h5>{place?.name}</h5>
        </div>
      </div> */}
    </div>
  );
}

export default DashFloat;
