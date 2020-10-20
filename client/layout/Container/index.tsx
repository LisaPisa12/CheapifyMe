import { ReactNode } from 'react';

import { motion } from 'framer-motion';

import styles from './index.module.css';

type IAppLayout = {
  children: ReactNode;
};

export default function AppLayout({ children }: IAppLayout) {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className={styles.center} data-testid="center-div">
        <main className={styles.main} data-testid="main">
          {children}
        </main>
      </div>
    </motion.div>
  );
}
