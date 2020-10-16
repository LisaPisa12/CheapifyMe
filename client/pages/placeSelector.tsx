import styles from '../styles/placeSelector.module.css';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../types/redux';
import { setSelectedId} from '../redux/actions'; 

import Input from '../components/input';

import { useRouter } from 'next/router';

export default function addOffer() {
  const router = useRouter();
  const places = useSelector((state: RootState) => state.places);
  
  const dispatch = useDispatch();

  const createGrid = () => {
    const root = document.documentElement;
    console.log(root);
    root.style.setProperty('--total', Math.floor(((places.length+2) / 2)).toString());
  }

  const showPlaces = () => places.map( (place, key) => {
    createGrid();
           return (
            <>
              <article
                key={place.id}
                className={key % 2 === 0 ? styles.place_even : styles.place_odd}
                onClick={() => {
                  dispatch(setSelectedId("1"));
                  router.push('/addOffer')
                }}
              >
                <img src="cheapifyme.gif" className={styles['place-img']} />
                <h2>{place.name}</h2>
              </article>
            </>
            )
          })

  return (
    <section className={styles.section}>
      <div className={styles.results}>
       {showPlaces()}
       <article
                
                className={places.length % 2 === 0 ? styles.place_even : styles.place_odd }
                onClick={() => {
                  dispatch(setSelectedId("1"));
                  router.push('/addOffer')
                }}
              >
                <img src="cheapifyme.gif" className={styles['place-img']} />
                <h2>Search more places</h2>
              </article>
       {places.length % 2 === 0 ? <p></p> : <><p></p><p></p></>}
              
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
