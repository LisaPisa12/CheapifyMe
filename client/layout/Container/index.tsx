import { ReactNode } from 'react';
import styles from './index.module.css';

type IAppLayout = {
  children: ReactNode;
};

export default function AppLayout({ children }: IAppLayout) {
  return (
    <div className={styles.center} data-testid="center-div">
      <main className={styles.main} data-testid="main">
        {children}
      </main>
    </div>
  );
}
