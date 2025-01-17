export class CatalogPage {
    private readonly inventoryItem = ".inventory_item";
    private readonly inventoryItemButton = ".btn_inventory";
    private readonly shoppingCartBadge = ".shopping_cart_badge";
    private readonly removeItemButton = ".btn_secondary";
    private readonly cartButton = ".shopping_cart_link";
    private readonly inventoryItemName = ".inventory_item_name";
    private readonly menuButton = "#react-burger-menu-btn";
    private readonly logoutButton = "[data-test='logout-sidebar-link']";
    private readonly invetoryItemPrice = ".inventory_item_price";


    addProductToCartByIndex(index: number) : void {
        cy.get(this.inventoryItem).eq(index).within(() => {
            cy.get(this.inventoryItemButton).click(); 
        });
    }

    addProductToCartByName(productName: string): void {
        cy.get('.inventory_item').contains('.inventory_item_name', productName)
          .parents('.inventory_item')
          .find('.btn_inventory') 
          .click();
    }

    removeProduct(index: number) : void {
        cy.get(this.inventoryItem).eq(index).within(() => {
            cy.get(this.removeItemButton).click(); 
        });
    }

    removeProductByName(productName: string) : void {
        cy.get(this.inventoryItem).contains(this.inventoryItemName, productName)
        .parents(this.inventoryItem)
        .find(this.removeItemButton) 
        .click();
    }

    getInventoryItemPrice(productName: string): Cypress.Chainable<string> {
        return cy
            .get('.inventory_item')
            .contains('.inventory_item_name', productName)
            .parents('.inventory_item')
            .find('.inventory_item_price') 
            .first() 
            .invoke('text'); 
    }

    getShoppingCartBadge() : Cypress.Chainable<string> {
        return cy.get(this.shoppingCartBadge).invoke('text');
    }

    goToCart() : void {
        cy.get(this.cartButton).click();
    }

    openMenu() : void {
        cy.get(this.menuButton).click();
    }

    logout() : void {
        cy.get(this.logoutButton).click();
    }
}