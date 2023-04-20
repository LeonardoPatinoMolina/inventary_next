import React from 'react';
import styles from  '@/styles/home.module.scss';
import { PageLayout } from '@/components/PageLayout';

const Home: React.FC<void> = () => {
  
  return (
    <PageLayout title="Inicio home" desc='inicio principal'>
      <div className={`${styles.home}`}>
        <h2>App de seguimiento de inventario</h2>
        <p className={styles.home__info}>El presente proyecto es un actividad realizada con las tecnologías React, PHP y MySQL.</p>
      </div>
    </PageLayout>
  )
}

export default Home;