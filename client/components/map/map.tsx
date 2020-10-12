import { FunctionComponent, useEffect, useRef, useState } from 'react';
import styles from './map.module.css';

interface IMap {
  mapType: google.maps.MapTypeId;
  mapTypeControl?: boolean;
}

type GoogleLatLng = google.maps.LatLng;
type GoogleMap = google.maps.Map;

const Map: FunctionComponent<IMap> = ({ mapType, mapTypeControl = false }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<GoogleMap>();
  const startMap = (): void => {
    if (!map) {
      defaultMapStart();
    }
  };
  useEffect(startMap, [map]);

  const defaultMapStart = (): void => {
    const defaultAdress = new google.maps.LatLng(41.394846, 2.197848);
    initMap(14, defaultAdress);
  };

  const initMap = (zoomLevel: number, address: GoogleLatLng): void => {
    if (ref.current) {
      setMap(
        new google.maps.Map(ref.current, {
          zoom: zoomLevel,
          center: address,
          mapTypeControl: false,
          disableDefaultUI: false,
          zoomControl: true,
          mapTypeId: mapType,
          mapId: '2104dea2028a628c',
          useStaticMap: true,
          fullscreenControl: false,
          streetViewControl: false,
        })
      );
    }
  };
  return (
    <div className={styles.map_container}>
      <div ref={ref} className={styles.map_container_map}></div>
    </div>
  );
};

export default Map;
