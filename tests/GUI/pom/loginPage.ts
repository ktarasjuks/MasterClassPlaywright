import { Page, Locator } from '@playwright/test';



export default class LoginPage {
    readonly userInput: Locator
    readonly passwordInput: Locator
    readonly loginButton: Locator

    constructor(public page: Page) {
        this.userInput = this.page.locator('#user-name')
        this.passwordInput = page.locator('#password')
        this.loginButton = page.locator('#login-button')
    }

    async navigateHomePage(url:string) {
        await this.page.goto(url)
    }

    async login(userName: string, password: string) {
        await this.userInput.fill(userName)
        await this.passwordInput.fill(password)
        await this.loginButton.click()
        await this.loginButton.isHidden()
    }


}