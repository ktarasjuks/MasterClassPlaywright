import { test as base } from '@playwright/test';
import LoginPage from '../pom/loginPage';
import ProductPage from '../pom/productPage';
import dotenv from 'dotenv';
import path from 'path';
import CartPage from '../pom/cartPage';


// Declare the types of your fixtures.
type MyFixtures = {
    loginPage: LoginPage;
    productPage: ProductPage;
    cartPage: CartPage;

};

// Extend base test by providing "LoginPage" and "ProductPage".
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
export const test = base.extend<MyFixtures>({
    loginPage: async ({ page }, use) => {

        const rootDir = path.resolve(__dirname, '../../GUI/env');
        dotenv.config({ path: path.resolve(rootDir, './.env.test') });

        // Set up the fixture.
        const loginPage = new LoginPage(page);

        // Assuming you have a method like navigateHomePage in your LoginPage class
        await loginPage.navigateHomePage(process.env.BASE_URL!);

        // Assuming you have a method like login in your LoginPage class
        await loginPage.login(process.env.TEST_USER!, process.env.PASSWORD!);

        // Use the fixture value in the test.
        await use(loginPage);
    },

    productPage: async ({ page }, use) => {
        await use(new ProductPage(page));
    },
    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },
});
export { expect } from '@playwright/test';
