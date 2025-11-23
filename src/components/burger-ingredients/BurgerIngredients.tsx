import React, { useState, useRef, useEffect, useCallback } from "react";
import styles from "./BurgerIngredients.module.css";
import {
  Tab,
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { TIngredient } from "../../utils/types";
import Modal from "../modal/Modal";
import IngredientDetails from "../ingredient-details/IngredientDetails";
import { useDrag } from "react-dnd";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../services/store";

const BurgerIngredients: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [current, setCurrent] = useState("bun");
  const [selectedIngredient, setSelectedIngredient] =
    useState<TIngredient | null>(null);

  const ingredients = useAppSelector((state) => state.ingredients.items);

  const buns = ingredients.filter((item) => item.type === "bun");
  const sauces = ingredients.filter((item) => item.type === "sauce");
  const mains = ingredients.filter((item) => item.type === "main");

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const bunRef = useRef<HTMLDivElement | null>(null);
  const sauceRef = useRef<HTMLDivElement | null>(null);
  const mainRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current) return;

    const containerTop = scrollContainerRef.current.getBoundingClientRect().top;

    const sections = [
      { id: "bun", ref: bunRef },
      { id: "sauce", ref: sauceRef },
      { id: "main", ref: mainRef },
    ];

    const distances = sections.map((section) => {
      const el = section.ref.current;
      if (!el) return { id: section.id, distance: Infinity };
      const rect = el.getBoundingClientRect();
      return { id: section.id, distance: Math.abs(rect.top - containerTop) };
    });

    const closest = distances.reduce((prev, curr) =>
      curr.distance < prev.distance ? curr : prev
    );

    setCurrent(closest.id);
  }, []);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    scrollContainer.addEventListener("scroll", handleScroll);
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleTabClick = (value: string) => {
    setCurrent(value);
    const sectionRef =
      value === "bun" ? bunRef : value === "sauce" ? sauceRef : mainRef;
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleIngredientClick = (ingredient: TIngredient) => {
    navigate(`/ingredients/${ingredient._id}`, {
      state: { background: location },
    });
  };

  return (
    <section className={styles.burgerIngredients}>
      <h1 className={`${styles.title} text text_type_main-large`}>
        Соберите бургер
      </h1>

      <div className={styles.tabs}>
        <Tab
          value="bun"
          active={current === "bun"}
          onClick={() => handleTabClick("bun")}
        >
          Булки
        </Tab>
        <Tab
          value="sauce"
          active={current === "sauce"}
          onClick={() => handleTabClick("sauce")}
        >
          Соусы
        </Tab>
        <Tab
          value="main"
          active={current === "main"}
          onClick={() => handleTabClick("main")}
        >
          Начинки
        </Tab>
      </div>

      <div className={styles.scrollArea} ref={scrollContainerRef}>
        <div ref={bunRef}>
          <IngredientGroup
            title="Булки"
            items={buns}
            onClick={handleIngredientClick}
          />
        </div>
        <div ref={sauceRef}>
          <IngredientGroup
            title="Соусы"
            items={sauces}
            onClick={handleIngredientClick}
          />
        </div>
        <div ref={mainRef}>
          <IngredientGroup
            title="Начинки"
            items={mains}
            onClick={handleIngredientClick}
          />
        </div>
      </div>

      {selectedIngredient && (
        <Modal
          title="Детали ингредиента"
          onClose={() => setSelectedIngredient(null)}
        >
          <IngredientDetails ingredient={selectedIngredient} />
        </Modal>
      )}
    </section>
  );
};

type GroupProps = {
  title: string;
  items: TIngredient[];
  onClick: (ingredient: TIngredient) => void;
};

const IngredientGroup: React.FC<GroupProps> = ({ title, items, onClick }) => (
  <div className={styles.group}>
    <h2 className={`${styles.groupTitle} text text_type_main-medium`}>
      {title}
    </h2>
    <div className={styles.grid}>
      {items.map((item) => {
        const count = (item as any).count ?? 0;
        return (
          <IngredientCard
            key={item._id}
            item={item}
            count={count}
            onClick={onClick}
          />
        );
      })}
    </div>
  </div>
);

type CardProps = {
  item: TIngredient;
  count?: number;
  onClick: (ingredient: TIngredient) => void;
};

const IngredientCard: React.FC<CardProps> = ({ item, count = 0, onClick }) => {
  const [, dragRef] = useDrag(
    () => ({
      type: "ingredient",
      item: { ...item },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [item]
  );

  return (
    <div
      ref={dragRef as any}
      className={styles.card}
      onClick={() => onClick(item)}
    >
      {count > 0 && (
        <Counter count={count} size="default" extraClass={styles.counter} />
      )}
      <img src={item.image} alt={item.name} className={styles.image} />
      <div className={styles.price}>
        <span className={`${styles.priceValue} text text_type_digits-medium`}>
          {item.price}
        </span>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles.name} text text_type_main-default`}>
        {item.name}
      </p>
    </div>
  );
};

export default BurgerIngredients;
