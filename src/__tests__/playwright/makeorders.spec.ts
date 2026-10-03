import { test, expect } from '@playwright/test'

test('Making an order and viewing it in the order summary is successful.',  async ({page}) => {
    await page.goto('')

    await page.getByTestId('header-make-an-order').click()

    const menuItem1 = page.getByTestId('menu-item-1')
    const menuItem1Button = menuItem1.getByRole('button', {name: 'Add to Cart'})
    await menuItem1Button.click()

    await page.getByRole('button', {name: 'Mains'}).click()

    await menuItem1Button.click()

    await page.getByRole('button', {name: 'Desserts'}).click()
    
    await menuItem1Button.click()

    const cartItem2 = page.getByTestId('order-item-2')
    const cartItem2PlusButton = cartItem2.getByRole('button', {name: '+'})
    await cartItem2PlusButton.click()

    const makeOrderButton = page.getByRole('button', {name: 'Make Order'})
    await makeOrderButton.click()

    const successMessage = page.getByText('Order creation was successful.')
    await expect(successMessage).toBeVisible()

    await page.getByTestId('header-previous-orders').click()

    const dateTimeSection = page.getByTestId('order-date-time-section')
    const dateTimeLoading = dateTimeSection.getByText('Loading...')
    const date = dateTimeSection.getByText(/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/)
    const time = dateTimeSection.getByText(/^[0-9]{2}:[0-9]{2}$/)
    await expect(dateTimeLoading).toBeHidden()
    await expect(date).toBeVisible()
    await expect(time).toBeVisible()

    const itemsSection = page.getByTestId('order-items-section')
    const itemsLoading = itemsSection.getByText('Loading...')
    await expect(itemsLoading).toBeHidden()

    const item1 = page.getByTestId('order-item-1')
    const item1Name = item1.getByText('Toast:')
    const item1Price = item1.getByText('£7.10')
    const item1Quantity = item1.getByText('x1')
    await expect(item1).toContainText(/^Toast:£7\.10x1$/)
    await expect(item1Name).toBeVisible()
    await expect(item1Price).toBeVisible()
    await expect(item1Quantity).toBeVisible()

    const item2 = page.getByTestId('order-item-2')
    const item2Name = item2.getByText('Pie:')
    const item2Price = item2.getByText('£10.40')
    const item2Quantity = item2.getByText('x2')
    await expect(item2).toContainText(/^Pie:£10\.40x2$/)
    await expect(item2Name).toBeVisible()
    await expect(item2Price).toBeVisible()
    await expect(item2Quantity).toBeVisible()

    const item3 = page.getByTestId('order-item-3')
    const item3Name = item3.getByText('Ice cream:')
    const item3Price = item3.getByText('£4.30')
    const item3Quantity = item3.getByText('x1')
    await expect(item3).toContainText(/^Ice cream:£4\.30x1$/)
    await expect(item3Name).toBeVisible()
    await expect(item3Price).toBeVisible()
    await expect(item3Quantity).toBeVisible()

    const item4 = page.getByTestId('order-item-4')
    await expect(item4).toBeHidden()

    const subtotalSection = page.getByTestId('order-subtotal-section')
    const subtotalLoading = subtotalSection.getByText('Loading...')
    await expect(subtotalLoading).toBeHidden()
    await expect(subtotalSection).toContainText(/^Subtotal: £32\.20$/)

    const deliveryCostSection = page.getByTestId('order-delivery-cost-section')
    const deliveryCostLoading = deliveryCostSection.getByText('Loading...')
    await expect(deliveryCostLoading).toBeHidden()
    await expect(deliveryCostSection).toContainText(/^Delivery cost: £2\.20$/)

    const totalSection = page.getByTestId('order-total-section')
    const totalLoading = totalSection.getByText('Loading...')
    await expect(totalLoading).toBeHidden()
    await expect(totalSection).toContainText(/^Total: £34\.40$/)
})