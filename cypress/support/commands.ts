/// <reference types="cypress" />

import "@4tw/cypress-drag-drop";

declare namespace Cypress {
  interface Chainable<Subject = any> {
    dragAndDrop(source: string, target: string): Chainable<Subject>;
  }
}
