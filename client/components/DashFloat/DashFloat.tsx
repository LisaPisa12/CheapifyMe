import styles from './DashFloat.module.css';

function DashFloat() {
  return (
    <div className={styles.float_container} data-testid="float_container">
      <div className={styles.float_info}>
        <img src="floatTest.jpg" alt="" className={styles.float_img} />
        <div className={styles.float_text}>
          <h3>PlaceHolder title</h3>
          <h5>
            <img src="testOfferIcon.svg" alt="" className={styles.offer_icon} />{' '}
            Placeholder for basic offer
          </h5>
        </div>
      </div>
    </div>
  );
}

export default DashFloat;
