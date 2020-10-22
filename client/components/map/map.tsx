/* global google */
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSelectedId,
  setShowFloat,
  setServiceAPI
} from '../../redux/actions';

import { RootState } from '../../types/redux';
import styles from './map.module.css';

interface IMap {
  mapType: google.maps.MapTypeId | string;
}

type GoogleLatLng = google.maps.LatLng;
type GoogleMap = google.maps.Map;

const Map = ({ mapType }: IMap) => {
  const dispatch = useDispatch();
  const coords = useSelector((state: RootState) => state.mapCoords);
  const places = useSelector((state: RootState) => state.places);
  const serviceLoaded = useSelector((state: RootState) => state.serviceAPI);
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
    initMap(14, defaultAdress);
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

  function addMarker(id: number, type: string, coordinates: any) {
    const marker = new google.maps.Marker({
      position: coordinates,
      icon: `${type.toLowerCase()}Pin.svg`,
      map
    });
    marker.addListener('click', function () {
      dispatch(setShowFloat(true));
      dispatch(setSelectedId(id));
      map?.addListener('click', () => {
        dispatch(setShowFloat(false));
        google.maps.event.clearListeners(map, 'click');
      });
    });
  }

  if (places.length > 0) {
    places.forEach((el, index) => {
      let lat, lng;
      if (el.location) [lat, lng] = el.location.coordinates;
      if (el.offers && el.offers.length > 0)
        addMarker(index, el.offers[0].consumableType, { lat, lng });
    });
  }
  map?.panTo({ lat: coords.latitude, lng: coords.longitude });
  if (map && !serviceLoaded) {
    const service = new google.maps.places.PlacesService(map);
    dispatch(setServiceAPI(service));
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
