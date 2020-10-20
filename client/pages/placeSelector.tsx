/* global google */
import styles from '../styles/placeSelector.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import { RootState } from '../types/redux';
import { setSelectedId, setNewPlace, setScriptLoaded } from '../redux/actions';

import Input from '../components/input';

import { useRouter } from 'next/router';

import { loadMapApi } from '../utils/googleMapsUtils';

export default function PlaceSelector() {
  const router = useRouter();
  const scriptLoad = useSelector((state: RootState) => state.scriptLoaded);
  const places = useSelector((state: RootState) => state.places);
  const service = useSelector((state: RootState) => state.serviceAPI);
  const coordinates = useSelector((state: RootState) => state.coords);

  useEffect(() => {
    if (!scriptLoad) {
      const googleMapScript = loadMapApi();
      googleMapScript.addEventListener('load', () => {
        dispatch(setScriptLoaded(true));
      });
    }
  }, []);

  const [googlePlaces, setGooglePlaces] = useState<
    google.maps.places.PlaceResult[]
  >();

  const dispatch = useDispatch();

  const createGrid = () => {
    const root = document.documentElement;
    root.style.setProperty(
      '--total',
      Math.floor((places.length + 2) / 2).toString()
    );
  };

  const showPlaces = () =>
    places.map((place, key) => {
      createGrid();
      return (
        scriptLoad && (
          <>
            <article
              key={place.id}
              className={key % 2 === 0 ? styles.place_even : styles.place_odd}
              onClick={() => {
                dispatch(setSelectedId(key));
                router.push('/addOffer');
              }}
            >
              <img src="cheapifyme.gif" className={styles['place-img']} />
              <h2>{place.name}</h2>
            </article>
          </>
        )
      );
    });

  const nearbyCoords = new google.maps.LatLng(
    coordinates.latitude,
    coordinates.longitude
  );

  const request: google.maps.places.PlaceSearchRequest = {
    location: nearbyCoords,
    radius: 400,
    type: 'restaurant',
  };
  const getPlaces = () => {
    if (service) {
      service.nearbySearch(
        request,
        (results: google.maps.places.PlaceResult[], status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            setGooglePlaces(results);
          }
        }
      );
    }
  };

  const showGooglePlaces = () =>
    googlePlaces?.map((place, key) => {
      createGrid();
      const thisPlace = {
        name: place.name,
        location: place.geometry?.location.toJSON(),
      };
      return (
        <>
          {scriptLoad && (
            <article
              key={place.name}
              className={key % 2 === 0 ? styles.place_even : styles.place_odd}
              onClick={() => {
                dispatch(setNewPlace(thisPlace));
                router.push('/addOffer');
              }}
            >
              <img src="cheapifyme.gif" className={styles['place-img']} />
              <h2>{place.name}</h2>
            </article>
          )}
        </>
      );
    });

  return (
    scriptLoad && (
      <section className={styles.section}>
        <div className={styles.results}>
          {showPlaces()}
          {scriptLoad && googlePlaces ? showGooglePlaces() : ''}
          {scriptLoad && (
            <article
              className={
                places.length % 2 === 0 ? styles.place_even : styles.place_odd
              }
              onClick={getPlaces}
            >
              <img src="cheapifyme.gif" className={styles['place-img']} />
              <h2>Search more places</h2>
            </article>
          )}
          {places.length % 2 === 1 ? (
            <div className={styles.blank_div}></div>
          ) : (
            <>
              <div className={styles.blank_div}></div>
              <div className={styles.blank_div}></div>
            </>
          )}
        </div>
        <div className={styles.search}>
          {/* Search on the list based on the keys added  */}
          <Input />
          {scriptLoad && (
            <button
              className={styles.button}
              onClick={() => router.push('/dashboard')}
            >
              Cancel
            </button>
          )}
        </div>
      </section>
    )
  );
}
