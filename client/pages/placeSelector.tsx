/* global google */
import styles from '../styles/placeSelector.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import { RootState } from '../types/redux';
import { setSelectedId, setNewPlace, setScriptLoaded } from '../redux/actions';

import { useRouter } from 'next/router';

import { loadMapApi } from '../utils/googleMapsUtils';

import AddButton from '../components/AddButton';
import { motion } from 'framer-motion';

import calculateDistance from '../helpers/calcDistance';

type newPlace = {
  name?: string;
  distance?: number;
  location?: any;
  address?: string;
  placeId?: string;
};
type newPlaces = newPlace[];

const divStyle = {
  height: '100%',
  width: '100%'
};

export default function PlaceSelector() {
  const router = useRouter();

  const scriptLoad = useSelector((state: RootState) => state.scriptLoaded);
  const places = useSelector((state: RootState) => state.places);
  const service = useSelector((state: RootState) => state.serviceAPI);
  const coordinates = useSelector((state: RootState) => state.userCoords);

  if (
    typeof window !== 'undefined' &&
    coordinates.longitude === 0 &&
    coordinates.latitude === 0
  )
    router.push('/');

  useEffect(() => {
    if (!scriptLoad) {
      const googleMapScript = loadMapApi();
      googleMapScript.addEventListener('load', () => {
        dispatch(setScriptLoaded(true));
      });
    }
  }, []);

  const [googlePlaces, setGooglePlaces] = useState<newPlaces>();

  const dispatch = useDispatch();

  const createGrid = () => {
    const root = document.documentElement;
    const placesLength = places.length ? places.length : 0;
    const length = googlePlaces
      ? googlePlaces.length + placesLength
      : placesLength;
    root.style.setProperty('--total', Math.floor(length + 1).toString());
  };

  const showPlaces = () =>
    places.map((place, key) => {
      createGrid();

      return (
        scriptLoad && (
          <article
            key={place.id}
            className={styles.place}
            onClick={() => {
              dispatch(setSelectedId(key));
              router.push('/addOffer');
            }}
          >
            <h2>{place.name}</h2>
          </article>
        )
      );
    });

  let nearbyCoords;
  let request: google.maps.places.PlaceSearchRequest;

  const [radius, setRadius] = useState(400);

  const getPlaces = () => {
    nearbyCoords = new google.maps.LatLng(
      coordinates.latitude,
      coordinates.longitude
    );

    request = {
      location: nearbyCoords,
      radius: radius,
      type: 'restaurant'
    };

    if (service) {
      service.nearbySearch(
        request,
        (results: google.maps.places.PlaceResult[], status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            const formatedResult: newPlaces = results?.map((place) => {
              const newPlace: newPlace = {};
              newPlace.distance = calculateDistance(
                place.geometry?.location.lat(),
                place.geometry?.location.lng(),
                coordinates.latitude,
                coordinates.longitude
              );
              newPlace.name = place.name;
              newPlace.address = place.formatted_address
                ? place.formatted_address
                : place.vicinity;
              newPlace.location = place.geometry?.location;
              newPlace.placeId = place.place_id;
              return newPlace;
            });

            const sortedResult = formatedResult.sort((a, b) => {
              if (a.distance && b.distance) return a.distance - b.distance;
              else return 0;
            });

            setGooglePlaces(sortedResult);
            setRadius(radius + 400);
          }
        }
      );
    }
  };

  const showGooglePlaces = () =>
    googlePlaces?.map((place) => {
      createGrid();
      const thisPlace = {
        name: place.name,
        address: place.address,
        location: place.location.toJSON()
      };

      return (
        scriptLoad && (
          <article
            key={place.placeId}
            className={styles.place}
            onClick={() => {
              dispatch(setNewPlace(thisPlace));
              router.push('/addOffer');
            }}
          >
            <h2>{place.name}</h2>
            <p>{place.address}</p>
          </article>
        )
      );
    });

  return (
    scriptLoad && (
      <motion.div
        style={divStyle}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <section className={styles.section}>
          <div className={styles.results}>
            <AddButton
              click={() => router.push('/dashboard')}
              text={'X'}
              finalPosition={-100}
            />
            {showPlaces()}
            {scriptLoad && googlePlaces ? showGooglePlaces() : ''}

            {scriptLoad && (
              <article
                className={styles.place}
                onClick={getPlaces}
                key={'loadMore'}
              >
                <h2>
                  {places.length || googlePlaces?.length
                    ? 'Search more places'
                    : `There isn't any offer nearby. Click me for search for near places!`}
                </h2>
              </article>
            )}
            <div className={styles.blank_div}></div>
          </div>
        </section>
      </motion.div>
    )
  );
}
