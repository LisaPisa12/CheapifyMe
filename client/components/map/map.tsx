import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setShowFloat } from '../../redux/actions';

import { RootState } from '../../types/redux';
import styles from './map.module.css';

interface IMap {
  mapType: google.maps.MapTypeId | string;
  coords: {
    latitude: number;
    longitude: number;
  };
}

type GoogleLatLng = google.maps.LatLng;
type GoogleMap = google.maps.Map;

const Map = ({ mapType, coords }: IMap) => {
  const dispatch = useDispatch();
  const places = useSelector((state: RootState) => state.places);
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<GoogleMap>();
  const startMap = (): void => {
    if (!map) {
      defaultMapStart();
    }
  };
  useEffect(startMap, [map]);

  const defaultMapStart = (): void => {
    const defaultAdress = new google.maps.LatLng(
      coords.latitude,
      coords.longitude
    );
    initMap(17, defaultAdress);
  };

  const initMap = (zoomLevel: number, address: GoogleLatLng): void => {
    if (ref.current) {
      setMap(
        new google.maps.Map(ref.current, {
          zoom: zoomLevel,
          center: address,
          disableDefaultUI: false,
          zoomControl: false,
          mapTypeId: mapType,
          mapTypeControl: false,
          mapId: process.env.NEXT_PUBLIC_MAPS_ID, //eslint-disable-line
          useStaticMap: true,
          fullscreenControl: false,
          streetViewControl: false,
          gestureHandling: 'cooperative'
        } as google.maps.MapOptions)
      );
    }
  };

  function addMarker(coordinates: any) {
    const marker = new google.maps.Marker({
      position: coordinates,
      title: 'Hello World!',
      icon: 'test.png',
      map
    });
    marker.addListener('click', function () {
      dispatch(setShowFloat(true));
      map.addListener('click', () => {
        dispatch(setShowFloat(false));
        google.maps.event.clearListeners(map, 'click');
      });
    });
  }
  addMarker({ latitude: 41.3903651, longitude: 2.1941609 });
  console.log(places.length);
  if (places.length > 0) {
    places.forEach((el) => {
      const coordsArray = el.location.coordinates;
      console.log({ latitude: coordsArray[0], longitude: coordsArray[1] });
      addMarker({ lat: coordsArray[0], lng: coordsArray[1] });
    });
  }

  return (
    <div className={styles.map_container} data-testid="map_container">
      <div
        ref={ref}
        className={styles.map_container_map}
        data-testid="map_div"
      ></div>
    </div>
  );
};

export default Map;
