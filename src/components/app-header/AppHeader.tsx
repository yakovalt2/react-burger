import React from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './AppHeader.module.css';

const AppHeader: React.FC = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.left}>
          <a href="#" className={`${styles.link} ${styles.active}`}>
            <BurgerIcon type="primary" />
            <p className="text text_type_main-default ml-2">Конструктор</p>
          </a>
          <a href="#" className={styles.link}>
            <ListIcon type="secondary" />
            <p className="text text_type_main-default ml-2 text_color_inactive">Лента заказов</p>
          </a>
        </div>

        <div className={styles.logo}>
          <Logo />
        </div>

        <div className={styles.right}>
          <a href="#" className={styles.link}>
            <ProfileIcon type="secondary" />
            <p className="text text_type_main-default ml-2 text_color_inactive">Личный кабинет</p>
          </a>
        </div>
      </nav>
    </header>
  );
};

export default AppHeader;