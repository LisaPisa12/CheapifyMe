import styles from '../styles/placeSelector.module.css';

import Input from '../components/input';

import { useRouter } from 'next/router';

export default function addOffer() {
  const router = useRouter();
  return (
    <section className={styles.section}>
      <div className={styles.results}>
        <article
          className={styles.place}
          onClick={() => router.push('/addOffer')}
        >
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
        <button
          className={styles.button}
          onClick={() => router.push('/dashboard')}
        >
          Cancel
        </button>
      </div>
    </section>
  );
}
