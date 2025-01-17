import { AuthenticationPage } from "../pages/AuthenticationPage";
import { CatalogPage } from "../pages/CatalogPage";
import { CartPage } from "../pages/CartPage";

describe('Product Catalog', () => {
    const authenticationPage = new AuthenticationPage();
    const catalogPage = new CatalogPage();
    const cartPage = new CartPage();
    let product = 'Sauce Labs Backpack';

    beforeEach(() => {
        authenticationPage.completeAuthentication('standard_user', 'secret_sauce');
    });

    it('should add a product to the cart', () => {
        catalogPage.addProductToCartByName(product);
        catalogPage.getShoppingCartBadge().should('eq', '1');
        catalogPage.goToCart();
        cartPage.getCartProductNames().should('include', product);
    });

    it('should remove a product from the catalog', () => {
        catalogPage.addProductToCartByName(product);
        catalogPage.getShoppingCartBadge().should('eq', '1');
        catalogPage.removeProductByName(product);
        cy.get('.shopping_cart_badge').should('not.exist');
    });

    it('should remove a product from the cart', () => {
        catalogPage.addProductToCartByName(product);
        catalogPage.getShoppingCartBadge().should('eq', '1');
        catalogPage.goToCart();
        cartPage.getCartProductNames().should('include', product);
        cartPage.removeProductByName(product);
        cy.get('.shopping_cart_badge').should('not.exist');
    });
});