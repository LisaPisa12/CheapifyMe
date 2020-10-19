import styles from './AddButton.module.css';
import { useRouter } from 'next/router';

import { motion } from 'framer-motion';

const easing = [0.6, -0.05, 0.01, 0.99];

const fadeInUp = {
  initial: {
    y: -200,
  },
  animate: {
    y: 0,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
};

function AddButton() {
  const router = useRouter();
  return (
    <motion.div className={styles.add_container} variants={fadeInUp}>
      <button
        className={styles.add_button}
        onClick={() => router.push('/placeSelector')}
      >
        <p className={styles.p}>+</p>
      </button>
    </motion.div>
  );
}

export default AddButton;
