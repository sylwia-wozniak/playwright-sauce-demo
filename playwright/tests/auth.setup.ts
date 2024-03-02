import { LoginPage } from '@pageObject/pages/login';
import { expect, test as setup } from '@playwright/test';
import { BaseFunctions } from '@utils/baseFunctions';
import { playwrightUsers, UserGroup } from '@utils/userHandler';

const standardUsers = playwrightUsers.getUsers(UserGroup.StandardUsers);
const problemUsers = playwrightUsers.getUsers(UserGroup.ProblemUsers);

const users = [
    ...standardUsers.map(user => ({
        role: user.role,
        email: user.email,
        password: user.password,
        file: `.auth/${UserGroup.StandardUsers.valueOf()}/${user.role}.json`,
    })),
    ...problemUsers.map(user => ({
        role: user.role,
        email: user.email,
        password: user.password,
        file: `.auth/${UserGroup.ProblemUsers.valueOf()}/${user.role}.json`,
    })),
];

users.forEach(user => {
    setup(`Create auth file for ${user.role}`, async ({ page, context }) => {
        const loginPage = new LoginPage(page);
        const baseFunctions = new BaseFunctions(page);

        await baseFunctions.goto('/');
        await loginPage.login(user.email, user.password);
        expect(await baseFunctions.validateUrl('/inventory.html'));

        await context.storageState({ path: user.file });
    });
});
