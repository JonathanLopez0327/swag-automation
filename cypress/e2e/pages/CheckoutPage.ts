export class CheckoutPage {
    private readonly firstNameField = "[data-test='firstName']";
    private readonly lastNameField = "[data-test='lastName']";
    private readonly postalCodeField = "[data-test='postalCode']";
    private readonly continueButton = "[data-test='continue']";

    writeFirstName(firstName: string): void {
        cy.get(this.firstNameField).type(firstName);
    }

    writeLastname(lastName: string): void {
        cy.get(this.lastNameField).type(lastName);
    }

    writePostalCode(code: string): void {
        cy.get(this.postalCodeField).type(code);
    }

    continue(): void {
        cy.get(this.continueButton).click();
    }
}