import styles from './AppHeader.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.menu}>
          <li className={styles.menuItem}>
            <BurgerIcon type="primary" />
            <span className={styles.menuText}>Конструктор</span>
          </li>
          <li className={styles.menuItem}>
            <ListIcon type="secondary" />
            <span className={styles.menuText}>Лента заказов</span>
          </li>
        </ul>
        <div className={styles.logo}>
          <Logo />
        </div>
        <div className={styles.profile}>
          <ProfileIcon type="secondary" />
          <span className={styles.menuText}>Профиль</span>
        </div>
      </nav>
    </header>
  );
};

export default AppHeader;