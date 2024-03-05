import { test, expect } from 'C:/projects/PlaywrightMasterclass/tests/GUI/fixtures/baseFixture';

test.beforeEach(async ({ loginPage, productPage, page }) => {
  await productPage.addBag()
});

test('basic test', async ({ productPage, cartPage, page }) => {
  await productPage.addBikeLight()
  await productPage.removeBag()
  await productPage.goToCart()
  await cartPage.validatPrice("$9.99")
});