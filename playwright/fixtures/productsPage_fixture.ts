import { test as base } from '@playwright/test';
import { BaseFunctions } from '@utils/baseFunctions';
import { HeaderSection } from '@pageObject/sections/header';
import { ProductsPage } from '@pageObject/pages/products';
import { ProductPage } from '@pageObject/pages/product';

type ProductsPageFixtures = {
    baseFunctions: BaseFunctions;
    headerSection: HeaderSection;
    productsPage: ProductsPage;
    productPage: ProductPage;
};

export const test = base.extend<ProductsPageFixtures>({
    baseFunctions: async ({ page }, use) => {
        await use(new BaseFunctions(page));
    },

    headerSection: async ({ page }, use) => {
        await use(new HeaderSection(page));
    },

    productsPage: async ({ page }, use) => {
        await use(new ProductsPage(page));
    },

    productPage: async ({ page }, use) => {
        await use(new ProductPage(page));
    },
});
