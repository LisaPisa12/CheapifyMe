import styles from './DashBar.module.css';

function DashBar() {
  return (
    <div className={styles.dashbar_container}>
      <div className={styles.logo_container}>
        <img src="cheapifyme.gif" alt="" className={styles.logo} />
      </div>
      <button className={styles.filter_button}>
        <img src="testFilter.svg" className={styles.filter_img}></img>
      </button>
    </div>
  );
}
export default DashBar;
