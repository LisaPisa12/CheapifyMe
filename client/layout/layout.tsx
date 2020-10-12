import { ReactNode } from 'react';
import styles from './layout.module.css';

type IAppLayout = {
  children: ReactNode;
};

export default function AppLayout({ children }: IAppLayout) {
  return (
    <div className={styles.center}>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
