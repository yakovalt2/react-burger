/// <reference types="cypress" />
import "@4tw/cypress-drag-drop";

// Тестовые данные
const testBun1 = "Флюоресцентная булка R2-D3";
const testBun2 = "Краторная булка N-200i";
const testIngredient1 = "Соус Spicy-X";
const testIngredient2 = "Мини-салат Экзо-Плантаго";

// Alias
const getUser = "getUser";
const postOrder = "postOrder";

// URL
const testUrl = "http://localhost:3000/react-burger";

// Селекторы
const CARD_SELECTOR = '[class*="card"]';
const BURGER_CONSTRUCTOR_SELECTOR = '[class*="burgerConstructor"]';
const CONSTRUCTOR_ELEMENT_SELECTOR = '[class*="constructor-element"]';
const INGREDIENT_TITLE_SELECTOR = "h3.text_type_main-medium";
const INGREDIENT_VALUE_SELECTOR = "p.text_type_digits-default";
const MODAL_SELECTOR = "[data-cy='modal']";
const CLOSE_MODAL_BUTTON_SELECTOR = "[data-cy='close-modal']";
const LEGACY_MODAL_SELECTOR = ".modal";

describe("Burger Constructor", () => {
  beforeEach(() => {
    cy.viewport(1440, 1080);

    cy.intercept("GET", "**/api/ingredients").as("getIngredients");

    // Токены
    cy.setCookie("token", "test-access-token");
    cy.window().then((win) => {
      win.localStorage.setItem("accessToken", "test-access-token");
      win.localStorage.setItem("refreshToken", "test-refresh-token");
    });

    // Мокаем пользователя
    cy.intercept("GET", "**/api/auth/user", {
      statusCode: 200,
      body: {
        success: true,
        user: { email: "test@gmail.com", name: "Test" },
      },
    }).as(getUser);

    cy.visit(testUrl);
    cy.wait(`@${getUser}`);
    cy.wait("@getIngredients");
  });

  it("добавляет ингредиенты в конструктор через drag-and-drop", () => {
    // Булка
    cy.contains(CARD_SELECTOR, testBun1).trigger("dragstart");
    cy.get(BURGER_CONSTRUCTOR_SELECTOR).trigger("drop");

    // Начинка
    cy.contains(CARD_SELECTOR, testIngredient1).trigger("dragstart");
    cy.get(BURGER_CONSTRUCTOR_SELECTOR).trigger("drop");

    cy.contains(CARD_SELECTOR, testIngredient2).trigger("dragstart");
    cy.get(BURGER_CONSTRUCTOR_SELECTOR).trigger("drop");

    // Проверяем начинку
    cy.get(CONSTRUCTOR_ELEMENT_SELECTOR)
      .contains(testIngredient1)
      .should("exist");

    cy.get(CONSTRUCTOR_ELEMENT_SELECTOR)
      .contains(testIngredient2)
      .should("exist");
  });

  it("открывает и закрывает модальное окно ингредиента", () => {
    // Открываем модалку
    cy.contains(CARD_SELECTOR, testBun1).click();

    // Проверяем название
    cy.get(INGREDIENT_TITLE_SELECTOR).should("contain.text", testBun1);

    // Проверяем значения
    cy.get(INGREDIENT_VALUE_SELECTOR).eq(0).should("not.be.empty");
    cy.get(INGREDIENT_VALUE_SELECTOR).eq(1).should("not.be.empty");
    cy.get(INGREDIENT_VALUE_SELECTOR).eq(2).should("not.be.empty");
    cy.get(INGREDIENT_VALUE_SELECTOR).eq(3).should("not.be.empty");

    // Закрываем модалку
    cy.get(CLOSE_MODAL_BUTTON_SELECTOR).click();
    cy.get(LEGACY_MODAL_SELECTOR).should("not.exist");
  });

  it("оформляет заказ и показывает номер в модалке", () => {
    cy.intercept("POST", "**/api/orders", {
      statusCode: 200,
      body: { success: true, order: { number: 65434 } },
    }).as(postOrder);

    // Drag-and-drop ингредиентов
    cy.contains(CARD_SELECTOR, testBun1).trigger("dragstart");
    cy.get(BURGER_CONSTRUCTOR_SELECTOR).trigger("drop");

    cy.contains(CARD_SELECTOR, testIngredient1).trigger("dragstart");
    cy.get(BURGER_CONSTRUCTOR_SELECTOR).trigger("drop");

    cy.contains(CARD_SELECTOR, testIngredient2).trigger("dragstart");
    cy.get(BURGER_CONSTRUCTOR_SELECTOR).trigger("drop");

    // Оформляем заказ
    cy.contains("button", "Оформить заказ").click();

    cy.wait(`@${postOrder}`).its("response.statusCode").should("eq", 200);

    // Проверяем модалку
    cy.get(MODAL_SELECTOR).should("be.visible");

    // Закрываем модалку
    cy.get(CLOSE_MODAL_BUTTON_SELECTOR).click();
    cy.get(MODAL_SELECTOR).should("not.exist");
  });
});
