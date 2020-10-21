import styles from './AddButton.module.css';

import { motion } from 'framer-motion';

const easing = [0.6, -0.05, 0.01, 0.99];

function AddButton({ click, text, finalPosition }: any) {
  const fadeInUp = {
    initial: {
      y: -200,
    },
    animate: {
      y: finalPosition,
      transition: {
        duration: 0.6,
        ease: easing,
      },
    },
  };
  return (
    <motion.div className={styles.add_container} variants={fadeInUp}>
      <button className={styles.add_button} onClick={click}>
        {text}
      </button>
    </motion.div>
  );
}

export default AddButton;
