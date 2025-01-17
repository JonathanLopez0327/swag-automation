export class AuthenticationPage {
    private readonly usernameField = "[data-test='username']";
    private readonly passwordField = "[data-test='password']";
    private readonly loginButton = "[data-test='login-button']";

    visit() : void {
        cy.visit('https://www.saucedemo.com/');
    }

    writeUsername(username: string) : void {
        cy.get(this.usernameField).type(username);
    }

    writePassword(password: string) : void {
        cy.get(this.passwordField).type(password);
    }

    clickLogin() : void {
        cy.get(this.loginButton).click();
    }

    getHeading() : Cypress.Chainable<string> {
        return cy.get('.title').invoke('text');
    }

    getErrorMessage() : Cypress.Chainable<string> {
        return cy.get('[data-test="error"]').invoke('text');
    }

    completeAuthentication(username: string, password: string) : void {
        this.visit();
        this.writeUsername(username);
        this.writePassword(password);
        this.clickLogin();
    }

    getLoginButton() : Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.loginButton);
    }
}