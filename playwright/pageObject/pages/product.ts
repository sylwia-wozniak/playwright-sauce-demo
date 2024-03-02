import { expect, Page } from '@playwright/test';
import { productSelectors } from '@playwrightSelectors/productSelectors';

export class ProductPage {
    constructor(private readonly page: Page) {}

    readonly productName = this.page.locator(productSelectors.productDetailsName);

    async validateProductName(name: string) {
        await expect(this.productName).toContainText(name);
    }
}
