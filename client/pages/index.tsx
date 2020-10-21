/* global google */
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useLazyQuery } from '@apollo/client';

import { motion } from 'framer-motion';

import styles from '../styles/Home.module.css';
import {
  setMapCoordinates,
  setUserCoordinates,
  setPlaces,
  setScriptLoaded,
} from '../redux/actions';
import { RootState, coords } from '../types/redux';
import { getPlaces } from '../Apollo/';

import Map from '../components/map';

import Input from '../components/input';

import { loadMapApi } from '../utils/googleMapsUtils';

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
    x: '-25%',
  },
  animate: {
    y: 0,
    x: '-25%',
    transition: {
      duration: 2,
      ease: easing,
    },
  },
  exit: {
    y: 100,
    x: '-25%',
  },
};

export default function Home() {
  const scriptLoad = useSelector((state: RootState) => state.scriptLoaded);
  const [clicked, setClicked] = useState(false);
  const dispatch = useDispatch();

  const router = useRouter();

  let geocoder: google.maps.Geocoder;
  if (scriptLoad) {
    geocoder = new google.maps.Geocoder();
  }

  const [getPlacesData, { data }] = useLazyQuery(getPlaces, {
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    const googleMapScript = loadMapApi();
    googleMapScript.addEventListener('load', () => {
      dispatch(setScriptLoaded(true));
    });
  }, []);

  useEffect(() => {
    if (data) {
      router.push('/dashboard');
      if (data.getOffersNearby.length > 0) {
        dispatch(setPlaces(data.getOffersNearby));
      }
    }
  }, [data]);

  function success(position: { coords: coords }) {
    const { latitude, longitude } = position.coords;

    if (position.coords) {
      dispatch(setMapCoordinates({ latitude, longitude }));
      dispatch(setUserCoordinates({ latitude, longitude }));
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

  const manualLocation = (text: string) => {
    const request = {
      address: text,
      componentRestrictions: {
        country: 'ES',
      },
    };

    geocoder.geocode(request, (result, status) => {
      if (status === 'OK') {
        const res = result[0].geometry.location.toJSON();
        dispatch(
          setMapCoordinates({
            latitude: res.lat,
            longitude: res.lng,
          })
        );
        dispatch(
          setUserCoordinates({
            latitude: res.lat,
            longitude: res.lng,
          })
        );
        getPlacesData({
          variables: {
            location: {
              type: 'Point',
              coordinates: [res.lat, res.lng],
            },
          },
        });
      } else {
        alert('Geocode was not succesful for the following reason: ' + status);
      }
    });
  };

  return (
    <motion.div
      exit="exit"
      initial="initial"
      animate="animate"
      className={styles.container}
    >
      <section className={styles.section} data-testid="section">
        <motion.div
          variants={AnimateLogo}
          className={styles.childs}
          data-testid="child"
        >
          <img
            className={styles.image}
            src="logo.png"
            data-testid="img"
          />
        </motion.div>
        <motion.div
          variants={animateSearch}
          className={styles.childs}
          data-testid="child"
        >
          <Input props={manualLocation} />
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
          {scriptLoad && <Map mapType={google.maps.MapTypeId.ROADMAP} />}
        </motion.div>
      </section>
    </motion.div>
  );
}
