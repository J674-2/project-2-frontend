import { test, expect } from '@playwright/test'

test.describe('Header', () => {
    test('"Make an Order" link works.', async ({page}) => {
        await page.goto('')

        await expect(page.getByRole('heading', {name: 'Previous Orders'})).toBeVisible()
        await expect(page.getByRole('heading', {name: 'Make an Order'})).toBeHidden()
        await expect(page).toHaveURL('')
        await expect(page.getByTestId('header-make-an-order')).not.toHaveCSS('text-decoration-line','underline')

        await page.getByTestId('header-make-an-order').click()
        
        await expect(page.getByRole('heading', {name: 'Previous Orders'})).toBeHidden()
        await expect(page.getByRole('heading', {name: 'Make an Order'})).toBeVisible()
        await expect(page).toHaveURL('/make-an-order')
        await expect(page.getByTestId('header-make-an-order')).toHaveCSS('text-decoration-line','underline')
    })

    test('"Previous Orders" link works.', async ({page}) => {
        await page.goto('/make-an-order')

        await expect(page.getByRole('heading', {name: 'Previous Orders'})).toBeHidden()
        await expect(page.getByRole('heading', {name: 'Make an Order'})).toBeVisible()
        await expect(page).toHaveURL('/make-an-order')
        await expect(page.getByTestId('header-previous-orders')).not.toHaveCSS('text-decoration-line','underline')

        await page.getByTestId('header-previous-orders').click()

        await expect(page.getByRole('heading', {name: 'Previous Orders'})).toBeVisible()
        await expect(page.getByRole('heading', {name: 'Make an Order'})).toBeHidden()
        await expect(page).toHaveURL('')
        await expect(page.getByTestId('header-previous-orders')).toHaveCSS('text-decoration-line','underline')
    })

    test('"Previous Orders" link resets mutation state.', async ({page}) => {
        await page.goto('/make-an-order')

        const menuItem1 = page.getByTestId('menu-item-1')
        const menuItem1Button = menuItem1.getByRole('button', {name: 'Add to Cart'})

        await menuItem1Button.click()

        const makeOrderButton = page.getByRole('button', {name: 'Make Order'})

        await makeOrderButton.click()

        const successMessage = page.getByText('Order creation was successful.')

        await expect(successMessage).toBeVisible()

        await page.getByTestId('header-previous-orders').click()

        await page.getByTestId('header-make-an-order').click()

        const errorMessage = page.getByText('Order creation was unsuccessful.')
        const pendingMessage = page.getByText('Processing order...')

        await expect(successMessage).toBeHidden()
        await expect(errorMessage).toBeHidden()
        await expect(pendingMessage).toBeHidden()
        
        await page.goto('http://127.0.0.1:8000/admin')

        const user = page.getByLabel('Username:')
        await user.fill('user')

        const password = page.getByLabel('Password:')
        await password.fill('1234')

        await page.getByRole('button', {name: 'Log in'}).click()

        await page.getByRole('link', {name: 'Orders'}).click()

        const select = page.getByLabel('Action: ')
        await select.selectOption('Delete selected orders')

        await page.getByRole('checkbox').first().check()

        await page.getByRole('button', {name: 'Run'}).click()

        const heading1 = page.getByRole('heading', { name: 'Delete multiple objects' })
        await expect(heading1).toBeVisible()

        await page.getByRole('button').nth(3).click()

        const heading2 = page.getByRole('heading', { name: 'Select order to change' })
        await expect(heading2).toBeVisible()

        await expect(page.getByText(' 0 orders ')).toBeVisible()
    })
})


test.describe('Footer', () => {
    test('"Make an Order" link works.', async ({page}) => {
        await page.goto('')

        await expect(page.getByRole('heading', {name: 'Previous Orders'})).toBeVisible()
        await expect(page.getByRole('heading', {name: 'Make an Order'})).toBeHidden()
        await expect(page).toHaveURL('')
        await expect(page.getByTestId('footer-make-an-order')).not.toHaveCSS('text-decoration-line','underline')

        await page.getByTestId('footer-make-an-order').click()
        
        await expect(page.getByRole('heading', {name: 'Previous Orders'})).toBeHidden()
        await expect(page.getByRole('heading', {name: 'Make an Order'})).toBeVisible()
        await expect(page).toHaveURL('/make-an-order')
        await expect(page.getByTestId('footer-make-an-order')).toHaveCSS('text-decoration-line','underline')
    })

    test('"Previous Orders" link works.', async ({page}) => {
        await page.goto('/make-an-order')

        await expect(page.getByRole('heading', {name: 'Previous Orders'})).toBeHidden()
        await expect(page.getByRole('heading', {name: 'Make an Order'})).toBeVisible()
        await expect(page).toHaveURL('/make-an-order')
        await expect(page.getByTestId('footer-previous-orders')).not.toHaveCSS('text-decoration-line','underline')

        await page.getByTestId('footer-previous-orders').click()

        await expect(page.getByRole('heading', {name: 'Previous Orders'})).toBeVisible()
        await expect(page.getByRole('heading', {name: 'Make an Order'})).toBeHidden()
        await expect(page).toHaveURL('')
        await expect(page.getByTestId('footer-previous-orders')).toHaveCSS('text-decoration-line','underline')
    })

    test('"Previous Orders" link resets mutation state.', async ({page}) => {
        await page.goto('/make-an-order')

        const menuItem1 = page.getByTestId('menu-item-1')
        const menuItem1Button = menuItem1.getByRole('button', {name: 'Add to Cart'})

        await menuItem1Button.click()

        const makeOrderButton = page.getByRole('button', {name: 'Make Order'})

        await makeOrderButton.click()

        const successMessage = page.getByText('Order creation was successful.')

        await expect(successMessage).toBeVisible()

        await page.getByTestId('footer-previous-orders').click()

        await page.getByTestId('footer-make-an-order').click()

        const errorMessage = page.getByText('Order creation was unsuccessful.')
        const pendingMessage = page.getByText('Processing order...')

        await expect(successMessage).toBeHidden()
        await expect(errorMessage).toBeHidden()
        await expect(pendingMessage).toBeHidden()
    })
})