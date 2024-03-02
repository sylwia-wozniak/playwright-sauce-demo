import { expect, Locator, Page } from '@playwright/test';
import { LoginPage } from '../pageObject/pages/login';
import { headings } from './constants';
import { baseSelectors } from '../../playwrightSelectors/baseSelectors';

export class BaseFunctions {
    constructor(private readonly page: Page) {
        this.loginPage = new LoginPage(page);
    }

    readonly loginPage: LoginPage;
    readonly title = this.page.locator(baseSelectors.title);

    public async validateUrl(path: string) {
        await expect(this.page).toHaveURL(`${path}`);
    }

    public async validateTitle(title: string) {
        await expect(this.title).toContainText(title);
    }

    async goto(path: string) {
        await this.page.goto(path);
    }

    public async login(email: string, password: string) {
        await this.loginPage.validateHeader(headings.loginHeading);
        await this.loginPage.fillEmail(email);
        await this.loginPage.fillPassword(password);
        await this.loginPage.clickLoginButton();
    }

    public async waitForResponseAfterClick(responsePath: string, locatorToClick: Locator) {
        return await Promise.all([
            this.page.waitForResponse(
                resp => (resp.url().includes(responsePath) && resp.status() === 200) || resp.status() === 201
            ),
            await locatorToClick.click(),
        ]);
    }
}
