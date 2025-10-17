import React from 'react';
import AppHeader from './components/app-header/AppHeader';
import BurgerIngredients from './components/burger-ingredients/BurgerIngredients';
import { ingredientsData } from './utils/data';
import BurgerConstructor from './components/burger-constructor/BurgerConstructor';

function App() {
  return (
    <div>
      <AppHeader />
      <main>
        <BurgerIngredients ingredients={ingredientsData} />
        <BurgerConstructor ingredients={ingredientsData} />
      </main>
    </div>
  );
}

export default App;