import styles from '../styles/Home.module.css';

export default function Home() {
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
          <button className={styles.button}>
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
