export class OverviewPage {
    private readonly finishButton = "[data-test='finish']";
    private readonly header = "[data-test='complete-header']";
    private readonly subTotalLabel = "[data-test='subtotal-label']";

    getOverviewProductNames(): Cypress.Chainable<string[]> {
        return cy.get('.cart_item .inventory_item_name').then((items) => {
            return Cypress._.map(items, (item) => item.innerText);
        });
    }

    finish(): void {
        cy.get(this.finishButton).click();
    }

    getCompleteHeader(): Cypress.Chainable<string> {
        return cy.get(this.header).invoke('text');
    }

}