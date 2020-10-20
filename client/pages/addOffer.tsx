import styles from '../styles/addOffer.module.css';

import { useState, ChangeEvent, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { useMutation } from '@apollo/client';
import { setNewOffer, setScriptLoaded } from '../redux/actions';
import { RootState } from '../types/redux';
import { insertOffer } from '../Apollo';

import { loadMapApi } from '../utils/googleMapsUtils';

export default function addOffer() {
  const dispatch = useDispatch();
  const scriptLoad = useSelector((state: RootState) => state.scriptLoaded);
  const thisId = useSelector((state: RootState) => state.selectedId);
  const places = useSelector((state: RootState) => state.places);
  const newPlace = useSelector((state: RootState) => state.newPlace);
  let thisPlace: any;
  let location: any;

  useEffect(() => {
    if (!scriptLoad) {
      const googleMapScript = loadMapApi();
      googleMapScript.addEventListener('load', () => {
        dispatch(setScriptLoaded(true));
      });
    }
  }, []);

  if (newPlace) {
    thisPlace = newPlace;
    location = {
      type: 'Point',
      coordinates: [thisPlace.location.lat, thisPlace.location.lng]
    };
  } else if (places.length > 0) {
    thisPlace = places[thisId];
    console.log(thisPlace);
    location = thisPlace.location;
  }

  const [mutateOffer] = useMutation(insertOffer);

  const [thisOffer, setThisOffer] = useState({
    consumableType: '',
    offerType: '',
    start: '',
    end: '',
    repeat: false,
    repeatEvery: undefined,
    description: ''
  });
  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const value = e.target.value;
    if (e.target.name === 'repeat') {
      if (value === 'on') {
        setThisOffer({ ...thisOffer, [e.target.name]: true });
      }
    } else {
      setThisOffer({ ...thisOffer, [e.target.name]: value });
    }
  }
  const router = useRouter();
  return (
    scriptLoad && (
      <section className={styles.section}>
        <article className={styles.restaurantData}>
          {scriptLoad && thisPlace ? <h2>{thisPlace?.name}</h2> : ''}
        </article>
        <article
          className={
            thisOffer.consumableType
              ? styles.formContainer
              : styles.starter_consumable_type
          }
        >
          <h2>Type</h2>
          <div className={styles.offersType}>
            <div>
              <input
                className={styles.hidden_button}
                type="radio"
                id="food"
                name="consumableType"
                value="food"
                onChange={handleChange}
              />
              <label htmlFor="food">
                <img src="testfoodIcon.svg" alt="" className={styles.icon} />
              </label>
            </div>
            <div>
              <input
                className={styles.hidden_button}
                type="radio"
                id="drink"
                name="consumableType"
                value="drink"
                onChange={handleChange}
              />

              <label htmlFor="drink">
                <img
                  src="testdrinkIcon.svg"
                  alt="test"
                  className={styles.icon}
                />
              </label>
            </div>
          </div>
        </article>
        {thisOffer.consumableType ? (
          <article className={styles.formContainer}>
            <h2>Offer type</h2>
            <div className={styles.offersType}>
              <div>
                <input
                  className={styles.hidden_button}
                  type="radio"
                  id="2x1"
                  name="offerType"
                  value="2x1"
                  onChange={handleChange}
                />
                <label htmlFor="2x1">
                  <img src="test2X1.svg" alt="" className={styles.icon} />
                </label>
              </div>
              <div>
                <input
                  className={styles.hidden_button}
                  type="radio"
                  id="happy"
                  name="offerType"
                  value="happy hour"
                  onChange={handleChange}
                />
                <label htmlFor="happy">
                  <img src="testHappy.svg" alt="" className={styles.icon} />
                </label>
              </div>
              <div>
                <input
                  className={styles.hidden_button}
                  type="radio"
                  id="percent"
                  name="offerType"
                  value="Percentage"
                  onChange={handleChange}
                />
                <label htmlFor="percent">
                  <img src="test2X1.svg" alt="" className={styles.icon} />
                </label>
              </div>
            </div>
          </article>
        ) : (
          ''
        )}
        {thisOffer.offerType ? (
          <article className={styles.formContainer}>
            <h2>Dates</h2>
            <div className={styles.offersType}>
              <div className={styles.dates}>
                <label>Start</label>
                <input
                  type="datetime-local"
                  name="start"
                  onChange={handleChange}
                />
              </div>
              <div className={styles.dates}>
                <label>End</label>
                <input
                  type="datetime-local"
                  name="end"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={styles.offersType}>
              <div className={styles.dateRepeat}>
                <label>Repeat: </label>
                <input type="checkbox" name="repeat" onChange={handleChange} />
              </div>
              {thisOffer.repeat ? (
                <div>
                  <label>Each: </label>
                  <select
                    name="repeatEvery"
                    value={thisOffer.repeatEvery}
                    onChange={handleChange}
                  >
                    <option>Please Select from the list</option>
                    <option defaultValue="day">Day</option>
                    <option value="multipleDay">Multiple days</option>
                    <option value="week">Week</option>
                    <option value="month">Month</option>
                  </select>
                </div>
              ) : (
                ''
              )}
            </div>
          </article>
        ) : (
          ''
        )}
        {thisOffer.end ? (
          <article className={styles.formContainer}>
            <h2>Description of the offer</h2>
            <div className={styles.offersType}>
              <input
                type="text"
                name="description"
                id="description"
                className={styles.input}
                onChange={handleChange}
              />
            </div>
          </article>
        ) : (
          ''
        )}
        {thisOffer.description ? (
          <article className={styles.formContainer}>
            <button
              onClick={async () => {
                const newOffer = await mutateOffer({
                  variables: {
                    id: thisPlace.id,
                    name: thisPlace.name,
                    location: location,
                    offer: thisOffer
                  }
                });

                dispatch(setNewOffer(newOffer.data.insertOffer));

                router.push('/dashboard');
              }}
            >
              Send offer
            </button>
          </article>
        ) : (
          ''
        )}
      </section>
    )
  );
}
