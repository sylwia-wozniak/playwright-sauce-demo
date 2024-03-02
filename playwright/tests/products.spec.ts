import { test } from '@fixtures/productsPage_fixture';
import { headings, paths } from '@utils/constants';
import { playwrightUsers, UserGroup } from '@utils/userHandler';

const standardUsers = playwrightUsers.getUsers(UserGroup.StandardUsers);

standardUsers.forEach(user => {
    const userRole = user.role;
    const authFile = `.auth/${UserGroup.StandardUsers.valueOf()}/${userRole}.json`;

    test.describe(`Tests for ${user.role}`, () => {
        test.use({ storageState: authFile });

        test.beforeEach(async ({ page }) => {
            await page.goto(paths.inventoryPath);
        });

        test(`A ${user.role} should see the Products title`, async ({ baseFunctions }) => {
            await baseFunctions.validateTitle(headings.productsHeading);
        });

        test(`A ${user.role} should add a random product to the cart`, async ({ productsPage, headerSection }) => {
            await productsPage.addRandomProductToCart();
            await headerSection.checkCartBadgeItems(1);
        });

        test(`A ${user.role} should click a random product and see the product name on the product page`, async ({
            productsPage,
            productPage,
        }) => {
            const productLocator = await productsPage.selectRandomProductToClick();
            const productName = await productLocator.textContent();

            await productsPage.clickOnProduct(productLocator);
            await productPage.validateProductName(productName);
        });
    });
});
