import styles from './style/Footer.module.scss';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <ul className={styles.footer__info}>
        <li>Leonardo Patiño</li>
        <li>Yaicelee Gonzalez</li>
        <li>ANÁLISIS Y DESARROLLO DE SISTEMAS DE INFOPRMACIÓN</li>
        <li>Ficha: 2376370</li>
      </ul>
    </footer>
  );
};
