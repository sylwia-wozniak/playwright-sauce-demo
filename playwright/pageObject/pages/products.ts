import { expect, Locator, Page } from '@playwright/test';
import { productsSelectors } from '@playwrightSelectors/productsSelectors';
import { buttons } from '@utils/constants';

export class ProductsPage {
    constructor(private readonly page: Page) {}

    readonly productItem = this.page.locator(productsSelectors.productItem);
    readonly productItemName = this.page.locator(productsSelectors.productItemName);
    readonly addToCartButton = this.page.getByRole('button', { name: buttons.addToCart });
    readonly removeButton = this.page.getByRole('button', { name: buttons.remove });

    async getRandomProductIndex(): Promise<number> {
        return Math.floor(Math.random() * (await this.productItem.count()));
    }

    async addRandomProductToCart() {
        const randomIndex = await this.getRandomProductIndex();
        const randomProduct = this.productItem.nth(randomIndex);
        await randomProduct.locator(this.addToCartButton).click();
        await expect(this.removeButton).toBeVisible();
    }

    async selectRandomProductToClick(): Promise<Locator> {
        const randomIndex = await this.getRandomProductIndex();
        const randomProduct = this.productItem.nth(randomIndex);
        const expectedProductItemName = randomProduct.locator(this.productItemName);
        return expectedProductItemName;
    }

    async clickOnProduct(product: Locator) {
        await product.click();
    }
}
