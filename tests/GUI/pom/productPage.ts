import { Page, Locator } from '@playwright/test';



export default class ProductPage {
    readonly productBagAdd: Locator
    readonly productBagRemove: Locator
    readonly productBikeLightAdd: Locator
    readonly productBikeLightRemove: Locator
    readonly cartButton: Locator


    constructor(public page: Page) {
        this.productBagAdd = this.page.locator('#add-to-cart-sauce-labs-backpack')
        this.productBagRemove = this.page.locator('#remove-sauce-labs-backpack')
        this.productBikeLightAdd = page.locator('#add-to-cart-sauce-labs-bike-light')
        this.productBikeLightRemove = page.locator('#remove-sauce-labs-bike-light')
        this.cartButton = page.locator('#shopping_cart_container')

    }

    async addBag() {
        await this.productBagAdd.click()
    }

    async addBikeLight() {
        await this.productBikeLightAdd.click()
    }

    async removeBag() {
        await this.productBagRemove.waitFor({ state: 'visible', timeout: 3000 })
        await this.productBagRemove.click()
    }

    async removeBikeLight() {
        await this.productBikeLightRemove.click()
    }

    async goToCart() {
        await this.cartButton.click()
    }
}