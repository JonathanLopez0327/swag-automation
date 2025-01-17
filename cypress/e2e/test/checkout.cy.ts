import { AuthenticationPage } from "../pages/AuthenticationPage";
import { CatalogPage } from "../pages/CatalogPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { OverviewPage } from "../pages/OverviewPage";

describe('Checkout', () => {
    const authenticationPage = new AuthenticationPage();
    const catalogPage = new CatalogPage();
    const cartPage = new CartPage();
    const checkoutPage = new CheckoutPage();
    const overviewPage = new OverviewPage();

    let product1 = 'Sauce Labs Backpack';
    let product2 = 'Sauce Labs Bike Light';


    beforeEach(() => {
        authenticationPage.completeAuthentication('standard_user', 'secret_sauce');
    });

    it('should not complete a checkout with empty values', () => {
        catalogPage.addProductToCartByName(product1);
        catalogPage.getShoppingCartBadge().should('eq', '1');
        catalogPage.goToCart();
        cartPage.getCartProductNames().should('include', product1);

        cartPage.goToCheckout();
        checkoutPage.continue();
        cy.get("[data-test='error']").should('be.visible');
    });

    it('should complete a checkout with valid values', () => {
        catalogPage.addProductToCartByName(product1);
        catalogPage.getShoppingCartBadge().should('eq', '1');
        catalogPage.goToCart();
        cartPage.getCartProductNames().should('include', product1);
        cartPage.goToCheckout();

        checkoutPage.writeFirstName('Pepe');
        checkoutPage.writeLastname('Cdena');
        checkoutPage.writePostalCode('12345');
        checkoutPage.continue();
        overviewPage.getOverviewProductNames().should('include', product1);
        overviewPage.finish();
        overviewPage.getCompleteHeader().should('eq', 'Thank you for your order!');
    });

    it('should complete the sum of the total prices', () => {
        let total = 0;
        catalogPage.addProductToCartByName(product1);
        catalogPage.addProductToCartByName(product2);

        catalogPage.getInventoryItemPrice(product1).then((price1Text) => {
            const price1 = parseFloat(price1Text.replace('$', ''));
    
            catalogPage.getInventoryItemPrice(product2).then((price2Text) => {
                const price2 = parseFloat(price2Text.replace('$', ''));
                total = price1 + price2;
                console.log(total);
                
            });
        });
        
        catalogPage.getShoppingCartBadge().should('eq', '2');
        catalogPage.goToCart();
        cartPage.getCartProductNames().should('include', product1, product2);
        cartPage.goToCheckout();

        checkoutPage.writeFirstName('Pepe');
        checkoutPage.writeLastname('Cdena');
        checkoutPage.writePostalCode('12345');
        checkoutPage.continue();
        overviewPage.getOverviewProductNames().should('include', product1, product2);

        cy.get('.summary_subtotal_label').invoke('text').then((subtotalText: string) => {
            const subtotal = parseFloat(subtotalText.replace('Item total: $', '')); 
            expect(total).to.equal(subtotal);
        });

        overviewPage.finish();
        overviewPage.getCompleteHeader().should('eq', 'Thank you for your order!');
    });
});