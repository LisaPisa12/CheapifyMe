import styles from './AddButton.module.css';
import { useRouter } from 'next/router';

function AddButton() {
  const router = useRouter();
  return (
    <div className={styles.add_container}>
      <button
        className={styles.add_button}
        onClick={() => router.push('/placeSelector')}
      >
        <p className={styles.p}>+</p>
      </button>
    </div>
  );
}

export default AddButton;
