import styles from '../styles/placeSelector.module.css';

import Input from '../components/input';

export default function addOffer() {
  return (
    <section className={styles.section}>
      <div className={styles.results}>
        <article className={styles.place}>
          <img src="cheapifyme.gif" className={styles['place-img']} />
          <h2>Place name</h2>
        </article>
        <article className={styles.place}>
          <img src="cheapifyme.gif" className={styles['place-img']} />
          <h2>Place name</h2>
        </article>
        <article className={styles.place}>
          <img src="cheapifyme.gif" className={styles['place-img']} />
          <h2>Place name</h2>
        </article>
        <article className={styles.place}>
          <img src="cheapifyme.gif" className={styles['place-img']} />
          <h2>Place name</h2>
        </article>
      </div>
      <div className={styles.search}>
        <Input />
        <button className={styles.button}>Cancel</button>
      </div>
    </section>
  );
}
