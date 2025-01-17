import { AuthenticationPage } from "../pages/AuthenticationPage"
import { CatalogPage } from "../pages/CatalogPage"

describe('User Login', () => {
  const authenticationPage = new AuthenticationPage()
  const catalogPage = new CatalogPage()

  it('should login with valid credentials', () => {
    authenticationPage.visit();
    authenticationPage.writeUsername('standard_user');
    authenticationPage.writePassword('secret_sauce');
    authenticationPage.clickLogin();
    authenticationPage.getHeading().should('eq', 'Products');
  });

  it('should login with invalid credentials', () => {
    authenticationPage.visit();
    authenticationPage.writeUsername('invalid');
    authenticationPage.writePassword('invalid');
    authenticationPage.clickLogin();
    authenticationPage.getErrorMessage().should('eq', 'Epic sadface: Username and password do not match any user in this service');
  });

  it('should login with empty values', () => {
    authenticationPage.visit();
    authenticationPage.clickLogin();
    authenticationPage.getErrorMessage().should('eq', 'Epic sadface: Username is required');
  });

  it('should logout', () => {
    authenticationPage.visit();
    authenticationPage.writeUsername('standard_user');
    authenticationPage.writePassword('secret_sauce');
    authenticationPage.clickLogin();
    authenticationPage.getHeading().should('eq', 'Products');
    catalogPage.openMenu();
    catalogPage.logout();
    authenticationPage.getLoginButton().should('be.visible');
  });
});