import styles from '../styles/addOffer.module.css';

import { useRouter } from 'next/router';

export default function addOffer() {
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
            <input type="radio" id="food" name="food" value="2x1" />
            <label htmlFor="offerType">Food</label>
          </div>
          <div>
            <input type="radio" id="food" name="food" value="2x1" />
            <label htmlFor="offerType">Drinks</label>
          </div>
        </div>
      </article>
      <article className={styles.formContainer}>
        <h2>Offer type</h2>
        <div className={styles.offersType}>
          <div>
            <input type="radio" id="offerType" name="offerType" value="2x1" />
            <label htmlFor="offerType">2x1</label>
          </div>
          <div>
            <input type="radio" id="offerType" name="offerType" value="2x1" />
            <label htmlFor="offerType">Happy hours</label>
          </div>
          <div>
            <input type="radio" id="offerType" name="offerType" value="2x1" />
            <label htmlFor="offerType">Percentage</label>
          </div>
        </div>
      </article>
      <article className={styles.formContainer}>
        <h2>Dates</h2>
        <div className={styles.offersType}>
          <div className={styles.dates}>
            <label>Start</label>
            <input type="datetime-local" />
          </div>
          <div className={styles.dates}>
            <label>End</label>
            <input type="datetime-local" />
          </div>
        </div>
        <div className={styles.offersType}>
          <div className={styles.dateRepeat}>
            <label>Repeat: </label>
            <input type="checkbox" />
          </div>
          <div>
            <label>Each: </label>
            <select>
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
          />
        </div>
      </article>
      <article className={styles.formContainer}>
        <button
          onClick={() => {
            router.push('/dashboard');
          }}
        >
          Send offer
        </button>
      </article>
    </section>
  );
}
