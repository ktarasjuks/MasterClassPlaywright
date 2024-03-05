import { Page, Locator, expect } from '@playwright/test';



export default class CartPage {
    readonly firstItemPrice: Locator
    readonly firstItemName: Locator
    // readonly loginButton: Locator

    constructor(public page: Page) {
        this.firstItemPrice = this.page.locator('.inventory_item_price')
        this.firstItemName = page.locator('.inventory_item_name')
        // this.loginButton = page.locator('#login-button')
    }

    async validatPrice(price: string) {
        await expect(this.firstItemPrice.first().textContent()).toBe(price)
    }


    async validatName(name: string) {
        await expect(this.firstItemName.first().textContent()).toBe(name)
    }

}