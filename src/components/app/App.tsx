import React from 'react';
import AppHeader from '../app-header/AppHeader';
import styles from './App.module.css';
import BurgerIngredients from '../burger-ingredients/BurgerIngredients';
import { ingredientsData } from '../../utils/data';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';

const App = () => {
  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients ingredients={ingredientsData} />
        <BurgerConstructor ingredients={ingredientsData} />
      </main>
    </div>
  );
};

export default App;
