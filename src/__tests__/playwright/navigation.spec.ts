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
})