/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    dragAndDrop(targetEl: string | JQuery<HTMLElement>): Chainable<Subject>;
  }
}
