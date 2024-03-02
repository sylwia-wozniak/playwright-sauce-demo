import { expect, Page } from '@playwright/test';
import { loginSelectors } from '@playwrightSelectors/loginSelectors';

export class LoginPage {
    constructor(private readonly page: Page) {}

    readonly loginHeading = this.page.locator(loginSelectors.loginLogo);
    readonly emailInput = this.page.getByTestId(loginSelectors.emailInput);
    readonly passwordInput = this.page.getByTestId(loginSelectors.passwordInput);
    readonly loginButton = this.page.getByTestId(loginSelectors.loginButton);

    async validateHeader(heading: string) {
        await expect(this.loginHeading).toContainText(heading);
    }

    async fillEmail(email: string) {
        await this.emailInput.click();
        await this.emailInput.fill(email);
    }

    async fillPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    async login(email: string, password: string) {
        await this.fillEmail(email);
        await this.fillPassword(password);
        await this.clickLoginButton();
    }
}
