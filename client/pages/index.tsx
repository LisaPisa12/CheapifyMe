import { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';

import styles from '../styles/Home.module.css';
import { setCoordinates } from '../redux/actions';
import { RootState, coords } from '../types/redux';
import { getPlaces } from '../Apollo/';

import Input from '../components/input';

export default function Home() {
  const [clicked, setClicked] = useState(false);
  const dispatch = useDispatch();

  const router = useRouter();

  const { loading, error, data } = useQuery(getPlaces);

  const Coords = useSelector((state: RootState) => state.coords);

  function success(position: { coords: coords }) {
    const { latitude, longitude } = position.coords;
    if (Coords) {
      dispatch(setCoordinates({ latitude, longitude }));
    }
    router.push('/dashboard');
  }

  function positionError(error: any) {
    // Tell the user to add a direction manually and disable the button
    console.log(error);
  }

  const askGeolocalization = (e: any) => {
    e.preventDefault();

    navigator.geolocation.getCurrentPosition(success, positionError);
    setClicked(true);
  };
  return (
    <>
      <section className={styles.section} data-testid="section">
        <div className={styles.childs} data-testid="child">
          <img
            className={styles.image}
            src="cheapifyme.gif"
            data-testid="img"
          />
        </div>
        <div className={styles.childs} data-testid="child">
          <Input />
          <button
            className={styles.button}
            onClick={askGeolocalization}
            disabled={clicked}
          >
            <img
              src="gps.png"
              className={styles.gps_icon}
              data-testid="location-button"
            />
          </button>
        </div>
        <div className={styles.childs} data-testid="child">
          <img
            className={styles.map_placeholder}
            src="map-placeholder.jpg"
            data-testid="map-img"
          />
        </div>
      </section>
    </>
  );
}
