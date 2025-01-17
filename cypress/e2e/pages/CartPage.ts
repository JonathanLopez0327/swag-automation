export class CartPage {
    private readonly cartItem = ".cart_item";
    private readonly removeItemButton = ".btn_secondary";
    private readonly cartItemName = ".inventory_item_name";
    private readonly checkoutButton = ".checkout_button";


    getCartProductNames(): Cypress.Chainable<string[]> {
        return cy.get('.cart_item .inventory_item_name').then((items) => {
            return Cypress._.map(items, (item) => item.innerText);
        });
    }

    removeProductByName(productName: string) : void {
        cy.get(this.cartItem).contains(this.cartItemName, productName)
        .parents(this.cartItem)
        .find(this.removeItemButton) 
        .click();
    }

    goToCheckout() : void {
        cy.get(this.checkoutButton).click();
    }
}