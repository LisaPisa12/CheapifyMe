import styles from '../styles/addOffer.module.css';

import { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useMutation } from '@apollo/client';

import { RootState, offer } from '../types/redux';
import { insertOffer } from '../Apollo';

export default function addOffer() {
  const thisId = useSelector((state: RootState) => state.selectedId);
  const places = useSelector((state: RootState) => state.places);
  let place;
  if (places.length > 0) {
    place = places.find((el) => el.id === thisId);
  }
  const [mutateOffer, { data }] = useMutation(insertOffer);
  const [thisOffer, setThisOffer] = useState({
    consumableType: 'Food',
    offerType: '2x1',
    start: '',
    end: '',
    repeat: false,
    repeatEvery: undefined,
    description: ''
  });
  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const value = e.target.value;
    setThisOffer({ ...thisOffer, [e.target.name]: value });
  }
  const router = useRouter();
  return (
    <section className={styles.section}>
      <article className={styles.restaurantData}>
        <h2>Navbar</h2>
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
      <article className={styles.formContainer}>
        <h2>Dates</h2>
        <div className={styles.offersType}>
          <div className={styles.dates}>
            <label>Start</label>
            <input type="datetime-local" name="start" onChange={handleChange} />
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
          <div>
            <label>Each: </label>
            <select
              name="repeatEvery"
              value={thisOffer.repeatEvery}
              onChange={handleChange}
            >
              <option defaultValue="day">Day</option>
              <option value="multipleDay">multiple days</option>
              <option value="week">Week</option>
              <option value="month">Month</option>
            </select>
          </div>
        </div>
      </article>
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
      <article className={styles.formContainer}>
        <button
          onClick={() => {
            console.log(thisOffer);
            mutateOffer({
              variables: { id: '5f885fbfa55b9fb721351e17', offers: thisOffer }
            });
            router.push('/dashboard');
          }}
        >
          Send offer
        </button>
      </article>
    </section>
  );
}
