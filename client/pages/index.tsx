import { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useLazyQuery } from '@apollo/client';

import { motion } from 'framer-motion';

import styles from '../styles/Home.module.css';
import { setCoordinates, setPlaces } from '../redux/actions';
import { RootState, coords } from '../types/redux';
import { getPlaces } from '../Apollo/';

import Input from '../components/input';

const easing = [0.6, -0.05, 0.01, 0.99];

const AnimateLogo = {
  initial: {
    y: -300,
  },
  animate: {
    y: 0,
    transition: {
      duration: 2,
      ease: easing,
    },
  },
  exit: {
    y: 100,
  },
};

const animateSearch = {
  initial: {
    x: 1000,
  },
  animate: {
    x: 0,
    transition: {
      duration: 2,
      ease: easing,
    },
  },
  exit: {
    x: 100,
  },
};

const animateMap = {
  initial: {
    y: 300,
  },
  animate: {
    y: 0,
    transition: {
      duration: 2,
      ease: easing,
    },
  },
  exit: {
    y: 100,
  },
};

export default function Home() {
  const [clicked, setClicked] = useState(false);
  const dispatch = useDispatch();

  const router = useRouter();

  const Coords = useSelector((state: RootState) => state.coords);

  const [getPlacesData, { data }] = useLazyQuery(getPlaces, {
    fetchPolicy: 'network-only',
  });

  if (data && data.getOffersNearby) {
    router.push('/dashboard');
    if (data.getOffersNearby.length > 0) {
      dispatch(setPlaces(data.getOffersNearby));
    }
  }

  function success(position: { coords: coords }) {
    const { latitude, longitude } = position.coords;

    if (Coords) {
      dispatch(setCoordinates({ latitude, longitude }));

      getPlacesData({
        variables: {
          location: {
            type: 'Point',
            coordinates: [latitude, longitude],
          },
        },
      });
    }
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
    <motion.div exit="exit" initial="initial" animate="animate">
      <section className={styles.section} data-testid="section">
        <motion.div
          variants={AnimateLogo}
          className={styles.childs}
          data-testid="child"
        >
          <img
            className={styles.image}
            src="cheapifyme.gif"
            data-testid="img"
          />
        </motion.div>
        <motion.div
          variants={animateSearch}
          className={styles.childs}
          data-testid="child"
        >
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
        </motion.div>
        <motion.div
          className={styles.childs}
          data-testid="child"
          variants={animateMap}
        >
          <img
            className={styles.map_placeholder}
            src="map-placeholder.jpg"
            data-testid="map-img"
          />
        </motion.div>
      </section>
    </motion.div>
  );
}
