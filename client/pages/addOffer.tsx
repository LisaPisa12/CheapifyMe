import styles from '../styles/addOffer.module.css';

import { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useMutation } from '@apollo/client';

import { RootState } from '../types/redux';
import { insertOffer } from '../Apollo';

export default function addOffer() {
  const thisId = useSelector((state: RootState) => state.selectedId);
  const places = useSelector((state: RootState) => state.places);
  let place: any;
  if (places.length > 0) {
    place = places.find((el) => el.id === thisId);
  }
  const [mutateOffer, { data }] = useMutation(insertOffer);
  const [thisOffer, setThisOffer] = useState({
    consumableType: '',
    offerType: '',
    start: '',
    end: '',
    repeat: false,
    repeatEvery: undefined,
    description: '',
    score: 0,
    available: true
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
    <section className={styles.section}>
      <article className={styles.restaurantData}>
        <h2>{place?.name}</h2>
      </article>
      <article className={styles.formContainer}>
        <h2>Type</h2>
        <div className={styles.offersType}>
          <div>
            <input
              type="radio"
              id="food"
              name="consumableType"
              value="Food"
              // checked={thisOffer.consumableType === 'food'}
              onChange={handleChange}
            />
            <label htmlFor="offerType">Food</label>
          </div>
          <div>
            <input
              type="radio"
              id="drink"
              name="consumableType"
              value="drink"
              // checked={thisOffer.consumableType === 'drink'}
              onChange={handleChange}
            />
            <label htmlFor="offerType">Drinks</label>
          </div>
        </div>
      </article>
      {thisOffer.consumableType ? (
        <article className={styles.formContainer}>
          <h2>Offer type</h2>
          <div className={styles.offersType}>
            <div>
              <input
                type="radio"
                id="offerType"
                name="offerType"
                value="2x1"
                // checked={thisOffer.offerType === '2x1'}
                onChange={handleChange}
              />
              <label htmlFor="offerType">2x1</label>
            </div>
            <div>
              <input
                type="radio"
                id="offerType"
                name="offerType"
                value="happy hour"
                // checked={thisOffer.offerType === 'happy_hour'}
                onChange={handleChange}
              />
              <label htmlFor="offerType">Happy hours</label>
            </div>
            <div>
              <input
                type="radio"
                id="offerType"
                name="offerType"
                value="Percentage"
                // checked={thisOffer.offerType === 'Percentage'}
                onChange={handleChange}
              />
              <label htmlFor="offerType">Percentage</label>
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
              <input type="datetime-local" name="end" onChange={handleChange} />
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
            onClick={() => {
              mutateOffer({
                variables: { id: place.id, offers: thisOffer }
              });
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
  );
}
