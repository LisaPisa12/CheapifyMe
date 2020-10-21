import styles from './DashBar.module.css';

import { motion } from 'framer-motion';

const easing = [0.6, -0.05, 0.01, 0.99];

const fadeInUp = {
  initial: {
    y: -100,
  },
  animate: {
    y: 0,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
};

function DashBar() {
  return (
    <motion.div className={styles.dashbar_container} variants={fadeInUp}>
      <img src="logo.png" alt="" className={styles.logo} />
    </motion.div>
  );
}
export default DashBar;
