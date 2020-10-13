import { useState } from 'react';

import styles from '../styles/Home.module.css';

export default function Home() {
  const [clicked, setClicked] = useState(false);
  const [location, setLocation] = useState({});

  function success(position: any) {
    console.log(position);

    const { latitude, longitude } = position.coords;
    setLocation({ latitude, longitude });
  }

  function error() {
    console.log(error);
  }

  const askGeolocalization = (e: any) => {
    e.preventDefault();

    navigator.geolocation.getCurrentPosition(success, error);
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
          <input
            type="textbox"
            placeholder="location"
            className={styles.input}
            data-testid="location-textbox"
          />
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
