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

        await page.getByTestId('header-previous-orders').click()

        await expect(page.getByRole('heading', {name: 'Previous Orders'})).toBeVisible()
        await expect(page.getByRole('heading', {name: 'Make an Order'})).toBeHidden()
        await expect(page).toHaveURL('')
    })
})


test.describe('Footer', () => {
    test('"Make an Order" link works.', async ({page}) => {
        await page.goto('')

        await expect(page.getByRole('heading', {name: 'Previous Orders'})).toBeVisible()
        await expect(page.getByRole('heading', {name: 'Make an Order'})).toBeHidden()
        await expect(page).toHaveURL('')

        await page.getByTestId('footer-make-an-order').click()
        
        await expect(page.getByRole('heading', {name: 'Previous Orders'})).toBeHidden()
        await expect(page.getByRole('heading', {name: 'Make an Order'})).toBeVisible()
        await expect(page).toHaveURL('/make-an-order')
    })

    test('"Previous Orders" link works.', async ({page}) => {
        await page.goto('/make-an-order')

        await expect(page.getByRole('heading', {name: 'Previous Orders'})).toBeHidden()
        await expect(page.getByRole('heading', {name: 'Make an Order'})).toBeVisible()
        await expect(page).toHaveURL('/make-an-order')

        await page.getByTestId('footer-previous-orders').click()

        await expect(page.getByRole('heading', {name: 'Previous Orders'})).toBeVisible()
        await expect(page.getByRole('heading', {name: 'Make an Order'})).toBeHidden()
        await expect(page).toHaveURL('')
    })
})