import { expect, Page } from '@playwright/test';
import { headerSelectors } from '@playwrightSelectors/headerSelectors';

export class HeaderSection {
    constructor(private readonly page: Page) {}

    readonly cartBadge = this.page.locator(headerSelectors.cartBadge);

    async checkCartBadgeItems(items: number) {
        await expect(this.cartBadge).toBeVisible();
        await expect(this.cartBadge).toContainText(items.toString());
    }
}
