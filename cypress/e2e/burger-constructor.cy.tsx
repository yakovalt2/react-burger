/// <reference types="cypress" />
import "@4tw/cypress-drag-drop";

const testBun1 = "Флюоресцентная булка R2-D3";
const testBun2 = "Краторная булка N-200i";
const testIngredient1 = "Соус Spicy-X";
const testIngredient2 = "Мини-салат Экзо-Плантаго";

const getUser = "getUser";
const postOrder = "postOrder";

describe("Burger Constructor", () => {
  beforeEach(() => {
    cy.viewport(1440, 1080);

    cy.intercept("GET", "**/api/ingredients").as("getIngredients");

    // Ставим токены
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

    cy.visit("http://localhost:3000");
    cy.wait(getUser);
    cy.wait("@getIngredients");
  });

  it("добавляет ингредиенты в конструктор через drag-and-drop", () => {
    // Булка
    cy.contains('[class*="card"]', testBun1).trigger("dragstart");
    cy.get('[class*="burgerConstructor"]').trigger("drop");

    // Начинка
    cy.contains('[class*="card"]', testIngredient1).trigger("dragstart");
    cy.get('[class*="burgerConstructor"]').trigger("drop");
    cy.contains('[class*="card"]', testIngredient2).trigger("dragstart");
    cy.get('[class*="burgerConstructor"]').trigger("drop");

    // Проверяем, что добавилась нужная начинка
    cy.get('[class*="constructor-element"]')
      .contains(testIngredient1)
      .should("exist");
    cy.get('[class*="constructor-element"]')
      .contains(testIngredient2)
      .should("exist");
  });

  it("открывает и закрывает модальное окно ингредиента", () => {
    // Кликаем на ингредиент (открываем модалку)
    cy.contains('[class*="card"]', testBun1).click();

    // Проверяем имя ингредиента
    cy.get("h3.text_type_main-medium").should("contain.text", testBun1);

    // Проверяем числовые значения (калории, белки, жиры, углеводы)
    cy.get("p.text_type_digits-default").eq(0).should("not.be.empty");
    cy.get("p.text_type_digits-default").eq(1).should("not.be.empty");
    cy.get("p.text_type_digits-default").eq(2).should("not.be.empty");
    cy.get("p.text_type_digits-default").eq(3).should("not.be.empty");

    // Закрываем модалку
    cy.get("[data-cy='close-modal']").click();
    cy.get(".modal").should("not.exist");
  });

  it("оформляет заказ и показывает номер в модалке", () => {
    // Мокаем POST заказа
    cy.intercept("POST", "**/api/orders", {
      statusCode: 200,
      body: { success: true, order: { number: 65434 } },
    }).as(postOrder);

    // Ждём GET пользователя
    cy.wait(`@${getUser}`);

    // Drag-and-drop ингредиентов
    cy.contains('[class*="card"]', testBun1).trigger("dragstart");
    cy.get('[class*="burgerConstructor"]').trigger("drop");
    cy.contains('[class*="card"]', testIngredient1).trigger("dragstart");
    cy.get('[class*="burgerConstructor"]').trigger("drop");
    cy.contains('[class*="card"]', testIngredient2).trigger("dragstart");
    cy.get('[class*="burgerConstructor"]').trigger("drop");

    // Кликаем оформить заказ
    cy.contains("button", "Оформить заказ").click();

    // Ждём POST запроса
    cy.wait(`@${postOrder}`).its("response.statusCode").should("eq", 200);

    // Проверяем появление модалки с номером заказа
    cy.get("[data-cy='modal']").should("be.visible");

    // Закрываем модалку
    cy.get("[data-cy='close-modal']").click();
    cy.get("[data-cy='modal']").should("not.exist");
  });
});
