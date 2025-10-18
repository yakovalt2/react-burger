import React from 'react';
import AppHeader from '../app-header/AppHeader';
import styles from './App.module.css';
import BurgerIngredients from '../burger-ingredients/BurgerIngredients';
// import { ingredientsData } from '../../utils/data';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';
import { useState, useEffect } from 'react';
import { TIngredient } from '../../utils/types';
import { API_URL } from '../../utils/constants';

function App() {
  const [ingredients, setIngredients] = useState<TIngredient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const res = await fetch(`${API_URL}/ingredients`);
         if (!res.ok) {
          throw new Error(`Ошибка сервера: ${res.status}`);
        }
        const data = await res.json();
        setIngredients(data.data);
      } catch (error) {
        setHasError(true);
        console.error('Ошибка при загрузке ингредиентов:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchIngredients();
  }, []);

  if (isLoading) {
    return <p>Загрузка...</p>;
  }

  if (hasError) {
    return <p>Произошла ошибка при загрузке данных 😢</p>;
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients ingredients={ingredients} />
        <BurgerConstructor ingredients={ingredients} />
      </main>
    </div>
  );
};

export default App;
