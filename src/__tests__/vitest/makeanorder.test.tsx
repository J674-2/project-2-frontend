import { describe, test, expect} from 'vitest' 
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewOrderInfoProvider from '../../assets/providers/NewOrderInfoProvider'
import Menu from '../../assets/components/makeanorder/menu/Menu'
import Cart from '../../assets/components/makeanorder/cart/Cart'
import MakeAnOrder from '../../assets/components/makeanorder/MakeAnOrder'
import { menuItemsInfo } from '../../utils/variables'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { server } from '../../mocks/node'
import { http, HttpResponse, delay } from 'msw'

describe('Menu', () => {
    test('correctly displays, when the starters need to be displayed.', () => {

        const queryClient = new QueryClient()

        render(<QueryClientProvider client={queryClient}><NewOrderInfoProvider><Menu /></NewOrderInfoProvider></QueryClientProvider>)

        const startersButton = screen.getByRole('button', {name: 'Starters'})
        expect(startersButton).toBeVisible()
        expect(startersButton).toBeDisabled()

        const mainsButton = screen.getByRole('button', {name: 'Mains'})
        expect(mainsButton).toBeVisible()
        expect(mainsButton).toBeEnabled()

        const dessertsButton = screen.getByRole('button', {name: 'Desserts'})
        expect(dessertsButton).toBeVisible()
        expect(dessertsButton).toBeEnabled()

        const item1 = screen.getByTestId('menu-item-1')
        const item1Image = within(item1).getByRole('img')
        const item1Name = within(item1).getByText('Toast')
        const item1Description = within(item1).getByText(menuItemsInfo.toast.description)
        const item1Price = within(item1).getByText('£'+ menuItemsInfo.toast.price.toFixed(2))
        const item1Button = within(item1).getByRole('button', {name: 'Add to Cart'})
        expect(item1Image).toBeVisible()
        expect(item1Image).toHaveAttribute('src', menuItemsInfo.toast.src)
        expect(item1Image).toHaveAttribute('alt', menuItemsInfo.toast.description)
        expect(item1Name).toBeVisible()
        expect(item1Description).toBeVisible()
        expect(item1Price).toBeVisible()
        expect(item1Button).toBeVisible()
        expect(item1Button).toBeEnabled()

        const item2 = screen.getByTestId('menu-item-2')
        const item2Image = within(item2).getByRole('img')
        const item2Name = within(item2).getByText('Salad')
        const item2Description = within(item2).getByText(menuItemsInfo.salad.description)
        const item2Price = within(item2).getByText('£'+ menuItemsInfo.salad.price.toFixed(2))
        const item2Button = within(item2).getByRole('button', {name: 'Add to Cart'})
        expect(item2Image).toBeVisible()
        expect(item2Image).toHaveAttribute('src', menuItemsInfo.salad.src)
        expect(item2Image).toHaveAttribute('alt', menuItemsInfo.salad.description)
        expect(item2Name).toBeVisible()
        expect(item2Description).toBeVisible()
        expect(item2Price).toBeVisible()
        expect(item2Button).toBeVisible()
        expect(item2Button).toBeEnabled()

        const item3 = screen.getByTestId('menu-item-3')
        const item3Image = within(item3).getByRole('img')
        const item3Name = within(item3).getByText('Croquettes')
        const item3Description = within(item3).getByText(menuItemsInfo.croquettes.description)
        const item3Price = within(item3).getByText('£'+ menuItemsInfo.croquettes.price.toFixed(2))
        const item3Button = within(item3).getByRole('button', {name: 'Add to Cart'})
        expect(item3Image).toBeVisible()
        expect(item3Image).toHaveAttribute('src', menuItemsInfo.croquettes.src)
        expect(item3Image).toHaveAttribute('alt', menuItemsInfo.croquettes.description)
        expect(item3Name).toBeVisible()
        expect(item3Description).toBeVisible()
        expect(item3Price).toBeVisible()
        expect(item3Button).toBeVisible()
        expect(item3Button).toBeEnabled()        
    })


    test('correctly displays, when the mains need to be displayed.', async () => {

        const user = userEvent.setup()

        const queryClient = new QueryClient()

        render(<QueryClientProvider client={queryClient}><NewOrderInfoProvider><Menu /></NewOrderInfoProvider></QueryClientProvider>)

        const startersButton = screen.getByRole('button', {name: 'Starters'})
        const mainsButton = screen.getByRole('button', {name: 'Mains'})
        const dessertsButton = screen.getByRole('button', {name: 'Desserts'})

        await user.click(mainsButton)

        expect(startersButton).toBeVisible()
        expect(startersButton).toBeEnabled()

        expect(mainsButton).toBeVisible()
        expect(mainsButton).toBeDisabled()

        expect(dessertsButton).toBeVisible()
        expect(dessertsButton).toBeEnabled()

        const item1 = screen.getByTestId('menu-item-1')
        const item1Image = within(item1).getByRole('img')
        const item1Name = within(item1).getByText('Pie')
        const item1Description = within(item1).getByText(menuItemsInfo.pie.description)
        const item1Price = within(item1).getByText('£'+ menuItemsInfo.pie.price.toFixed(2))
        const item1Button = within(item1).getByRole('button', {name: 'Add to Cart'})
        expect(item1Image).toBeVisible()
        expect(item1Image).toHaveAttribute('src', menuItemsInfo.pie.src)
        expect(item1Image).toHaveAttribute('alt', menuItemsInfo.pie.description)
        expect(item1Name).toBeVisible()
        expect(item1Description).toBeVisible()
        expect(item1Price).toBeVisible()
        expect(item1Button).toBeVisible()
        expect(item1Button).toBeEnabled()

        const item2 = screen.getByTestId('menu-item-2')
        const item2Image = within(item2).getByRole('img')
        const item2Name = within(item2).getByText('Burger')
        const item2Description = within(item2).getByText(menuItemsInfo.burger.description)
        const item2Price = within(item2).getByText('£'+ menuItemsInfo.burger.price.toFixed(2))
        const item2Button = within(item2).getByRole('button', {name: 'Add to Cart'})
        expect(item2Image).toBeVisible()
        expect(item2Image).toHaveAttribute('src', menuItemsInfo.burger.src)
        expect(item2Image).toHaveAttribute('alt', menuItemsInfo.burger.description)
        expect(item2Name).toBeVisible()
        expect(item2Description).toBeVisible()
        expect(item2Price).toBeVisible()
        expect(item2Button).toBeVisible()
        expect(item2Button).toBeEnabled()

        const item3 = screen.getByTestId('menu-item-3')
        const item3Image = within(item3).getByRole('img')
        const item3Name = within(item3).getByText('Spaghetti')
        const item3Description = within(item3).getByText(menuItemsInfo.spaghetti.description)
        const item3Price = within(item3).getByText('£'+ menuItemsInfo.spaghetti.price.toFixed(2))
        const item3Button = within(item3).getByRole('button', {name: 'Add to Cart'})
        expect(item3Image).toBeVisible()
        expect(item3Image).toHaveAttribute('src', menuItemsInfo.spaghetti.src)
        expect(item3Image).toHaveAttribute('alt', menuItemsInfo.spaghetti.description)
        expect(item3Name).toBeVisible()
        expect(item3Description).toBeVisible()
        expect(item3Price).toBeVisible()
        expect(item3Button).toBeVisible()
        expect(item3Button).toBeEnabled()        
    })


    test('correctly displays, when the desserts need to be displayed.', async () => {

        const user = userEvent.setup()

        const queryClient = new QueryClient()

        render(<QueryClientProvider client={queryClient}><NewOrderInfoProvider><Menu /></NewOrderInfoProvider></QueryClientProvider>)

        const startersButton = screen.getByRole('button', {name: 'Starters'})
        const mainsButton = screen.getByRole('button', {name: 'Mains'})
        const dessertsButton = screen.getByRole('button', {name: 'Desserts'})

        await user.click(dessertsButton)

        expect(startersButton).toBeVisible()
        expect(startersButton).toBeEnabled()

        expect(mainsButton).toBeVisible()
        expect(mainsButton).toBeEnabled()

        expect(dessertsButton).toBeVisible()
        expect(dessertsButton).toBeDisabled()

        const item1 = screen.getByTestId('menu-item-1')
        const item1Image = within(item1).getByRole('img')
        const item1Name = within(item1).getByText('Ice cream')
        const item1Description = within(item1).getByText(menuItemsInfo['ice cream'].description)
        const item1Price = within(item1).getByText('£'+ menuItemsInfo['ice cream'].price.toFixed(2))
        const item1Button = within(item1).getByRole('button', {name: 'Add to Cart'})
        expect(item1Image).toBeVisible()
        expect(item1Image).toHaveAttribute('src', menuItemsInfo['ice cream'].src)
        expect(item1Image).toHaveAttribute('alt', menuItemsInfo['ice cream'].description)
        expect(item1Name).toBeVisible()
        expect(item1Description).toBeVisible()
        expect(item1Price).toBeVisible()
        expect(item1Button).toBeVisible()
        expect(item1Button).toBeEnabled()

        const item2 = screen.getByTestId('menu-item-2')
        const item2Image = within(item2).getByRole('img')
        const item2Name = within(item2).getByText('Cookies')
        const item2Description = within(item2).getByText(menuItemsInfo.cookies.description)
        const item2Price = within(item2).getByText('£'+ menuItemsInfo.cookies.price.toFixed(2))
        const item2Button = within(item2).getByRole('button', {name: 'Add to Cart'})
        expect(item2Image).toBeVisible()
        expect(item2Image).toHaveAttribute('src', menuItemsInfo.cookies.src)
        expect(item2Image).toHaveAttribute('alt', menuItemsInfo.cookies.description)
        expect(item2Name).toBeVisible()
        expect(item2Description).toBeVisible()
        expect(item2Price).toBeVisible()
        expect(item2Button).toBeVisible()
        expect(item2Button).toBeEnabled()

        const item3 = screen.getByTestId('menu-item-3')
        const item3Image = within(item3).getByRole('img')
        const item3Name = within(item3).getByText('Strawberries')
        const item3Description = within(item3).getByText(menuItemsInfo.strawberries.description)
        const item3Price = within(item3).getByText('£'+ menuItemsInfo.strawberries.price.toFixed(2))
        const item3Button = within(item3).getByRole('button', {name: 'Add to Cart'})
        expect(item3Image).toBeVisible()
        expect(item3Image).toHaveAttribute('src', menuItemsInfo.strawberries.src)
        expect(item3Image).toHaveAttribute('alt', menuItemsInfo.strawberries.description)
        expect(item3Name).toBeVisible()
        expect(item3Description).toBeVisible()
        expect(item3Price).toBeVisible()
        expect(item3Button).toBeVisible()
        expect(item3Button).toBeEnabled()        
    })


    test('only disables the "Add to Cart" button that was clicked, when the menu items being displayed are the same as when the button was clicked.', async () => {

        const user = userEvent.setup()

        const queryClient = new QueryClient()

        render(<QueryClientProvider client={queryClient}><NewOrderInfoProvider><Menu /></NewOrderInfoProvider></QueryClientProvider>)

        const item1 = screen.getByTestId('menu-item-1')
        const item1Button = within(item1).getByRole('button', {name: 'Add to Cart'})

        const item2 = screen.getByTestId('menu-item-2')
        const item2Button = within(item2).getByRole('button', {name: 'Add to Cart'})

        const item3 = screen.getByTestId('menu-item-3')
        const item3Button = within(item3).getByRole('button', {name: 'Add to Cart'})
        
        await user.click(item1Button)

        expect(item1Button).toBeVisible()
        expect(item1Button).toBeDisabled()

        expect(item2Button).toBeVisible()
        expect(item2Button).toBeEnabled()

        expect(item3Button).toBeVisible()
        expect(item3Button).toBeEnabled()

        const mainsButton = screen.getByRole('button', {name: 'Mains'})

        await user.click(mainsButton)

        expect(item1Button).toBeVisible()
        expect(item1Button).toBeEnabled()

        expect(item2Button).toBeVisible()
        expect(item2Button).toBeEnabled()

        expect(item3Button).toBeVisible()
        expect(item3Button).toBeEnabled()

        const startersButton = screen.getByRole('button', {name: 'Starters'})

        await user.click(startersButton)

        expect(item1Button).toBeVisible()
        expect(item1Button).toBeDisabled()

        expect(item2Button).toBeVisible()
        expect(item2Button).toBeEnabled()

        expect(item3Button).toBeVisible()
        expect(item3Button).toBeEnabled()
    })
})


describe('Cart', () => {
    test('successfully displays its starting content.', () => {
        
        const queryClient = new QueryClient()

        render(<QueryClientProvider client={queryClient}><NewOrderInfoProvider><Cart /></NewOrderInfoProvider></QueryClientProvider>)
        
        const itemsSection = screen.getByTestId('order-items-section')
        expect(itemsSection).toBeEmptyDOMElement()

        const subtotalSection = screen.getByTestId('order-subtotal-section')
        const zeroSubtotal = within(subtotalSection).queryByText('£0.00')
        expect(zeroSubtotal).toBeVisible()

        const deliveryCostSection = screen.getByTestId('order-delivery-cost-section')
        const deliveryCost = within(deliveryCostSection).queryByText('£2.20')
        const zeroDeliveryCost = within(deliveryCostSection).queryByText('£0.00')
        expect(deliveryCost).not.toBeInTheDocument()
        expect(zeroDeliveryCost).toBeVisible()

        const totalSection = screen.getByTestId('order-total-section')
        const zeroTotal = within(totalSection).queryByText('£0.00')
        expect(zeroTotal).toBeVisible()
    })
})


describe('MakeAnOrder', () => {
    test('displays Cart correctly, when a menu item is added to the cart.', async () => {
        
        const user = userEvent.setup()
        
        const queryClient = new QueryClient()

        render(<QueryClientProvider client={queryClient}><NewOrderInfoProvider><MakeAnOrder /></NewOrderInfoProvider></QueryClientProvider>)
        
        const menuItem1 = screen.getByTestId('menu-item-1')
        const menuItem1Button = within(menuItem1).getByRole('button', {name: 'Add to Cart'})

        await user.click(menuItem1Button)

        const cartItemsSection = screen.getByTestId('order-items-section')
        const cartItemName = within(cartItemsSection).getByText('Toast:')
        const cartItemPrice = within(cartItemsSection).getByText('£7.10')
        const cartItemQuantity = within(cartItemsSection).getByText('1')
        const cartItemMinusButton = within(cartItemsSection).getByRole('button', {name: '-'})
        const cartItemPlusButton = within(cartItemsSection).getByRole('button', {name: '+'})
        expect(cartItemsSection).toHaveTextContent(/^Toast: £7\.10-1\+$/)
        expect(cartItemName).toBeVisible()
        expect(cartItemPrice).toBeVisible()
        expect(cartItemQuantity).toBeVisible()
        expect(cartItemMinusButton).toBeVisible()
        expect(cartItemMinusButton).toBeEnabled()
        expect(cartItemPlusButton).toBeVisible()
        expect(cartItemPlusButton).toBeEnabled()

        const subtotalSection = screen.getByTestId('order-subtotal-section')
        const subtotal = within(subtotalSection).queryByText('£7.10')
        const zeroSubtotal = within(subtotalSection).queryByText('£0.00')
        expect(subtotal).toBeVisible()
        expect(zeroSubtotal).not.toBeInTheDocument()
        
        const deliveryCostSection = screen.getByTestId('order-delivery-cost-section')
        const deliveryCost = within(deliveryCostSection).queryByText('£2.20')
        const zeroDeliveryCost = within(deliveryCostSection).queryByText('£0.00')
        expect(deliveryCost).toBeVisible()
        expect(zeroDeliveryCost).not.toBeInTheDocument()

        const totalSection = screen.getByTestId('order-total-section')
        const total = within(totalSection).queryByText('£9.30')
        const zeroTotal = within(totalSection).queryByText('£0.00')
        expect(total).toBeVisible()
        expect(zeroTotal).not.toBeInTheDocument()
    })


    test('correctly displays Cart, when the only item in the cart is removed.', async () => {
        
        const user = userEvent.setup()
        
        const queryClient = new QueryClient()

        render(<QueryClientProvider client={queryClient}><NewOrderInfoProvider><MakeAnOrder /></NewOrderInfoProvider></QueryClientProvider>)
        
        const menuItem1 = screen.getByTestId('menu-item-1')
        const menuItem1Button = within(menuItem1).getByRole('button', {name: 'Add to Cart'})

        await user.click(menuItem1Button)

        expect(menuItem1Button).toBeDisabled()

        const cartItemMinusButton = screen.getByRole('button', {name: '-'})

        await user.click(cartItemMinusButton)

        expect(menuItem1Button).toBeEnabled()

        const itemsSection = screen.getByTestId('order-items-section')
        expect(itemsSection).toBeEmptyDOMElement()

        const subtotalSection = screen.getByTestId('order-subtotal-section')
        const subtotal = within(subtotalSection).queryByText('£7.10')
        const zeroSubtotal = within(subtotalSection).queryByText('£0.00')
        expect(subtotal).not.toBeInTheDocument()
        expect(zeroSubtotal).toBeVisible()

        const deliveryCostSection = screen.getByTestId('order-delivery-cost-section')
        const deliveryCost = within(deliveryCostSection).queryByText('£2.20')
        const zeroDeliveryCost = within(deliveryCostSection).queryByText('£0.00')
        expect(deliveryCost).not.toBeInTheDocument()
        expect(zeroDeliveryCost).toBeVisible()

        const totalSection = screen.getByTestId('order-total-section')
        const total = within(totalSection).queryByText('£9.30')
        const zeroTotal = within(totalSection).queryByText('£0.00')
        expect(total).not.toBeInTheDocument()
        expect(zeroTotal).toBeVisible()
    })


    test('correctly displays Cart, when the quantity of an item is increased. In addition, the PlusButton of an item disappears once that item reaches the maximum quantity.', async () => {

        const user = userEvent.setup()
        
        const queryClient = new QueryClient()

        render(<QueryClientProvider client={queryClient}><NewOrderInfoProvider><MakeAnOrder /></NewOrderInfoProvider></QueryClientProvider>)
        
        const menuItem1 = screen.getByTestId('menu-item-1')
        const menuItem1Button = within(menuItem1).getByRole('button', {name: 'Add to Cart'})

        await user.click(menuItem1Button)

        const cartItemPlusButton = screen.getByRole('button', {name: '+'})

        await user.click(cartItemPlusButton)

        const cartItemsSection = screen.getByTestId('order-items-section')
        const cartItemName = within(cartItemsSection).getByText('Toast:')
        const cartItemPrice = within(cartItemsSection).getByText('£7.10')
        const cartItemQuantity1 = within(cartItemsSection).getByText('2')
        const cartItemMinusButton = within(cartItemsSection).getByRole('button', {name: '-'})
        expect(cartItemsSection).toHaveTextContent(/^Toast: £7\.10-2\+$/)
        expect(cartItemName).toBeVisible()
        expect(cartItemPrice).toBeVisible()
        expect(cartItemQuantity1).toBeVisible()
        expect(cartItemMinusButton).toBeVisible()
        expect(cartItemMinusButton).toBeEnabled()
        expect(cartItemPlusButton).toBeVisible()
        expect(cartItemPlusButton).toBeEnabled()

        const subtotalSection = screen.getByTestId('order-subtotal-section')
        const subtotal = within(subtotalSection).queryByText('£14.20')
        const zeroSubtotal = within(subtotalSection).queryByText('£0.00')
        expect(subtotal).toBeVisible()
        expect(zeroSubtotal).not.toBeInTheDocument()
        
        const deliveryCostSection = screen.getByTestId('order-delivery-cost-section')
        const deliveryCost = within(deliveryCostSection).queryByText('£2.20')
        const zeroDeliveryCost = within(deliveryCostSection).queryByText('£0.00')
        expect(deliveryCost).toBeVisible()
        expect(zeroDeliveryCost).not.toBeInTheDocument()

        const totalSection = screen.getByTestId('order-total-section')
        const total = within(totalSection).queryByText('£16.40')
        const zeroTotal = within(totalSection).queryByText('£0.00')
        expect(total).toBeVisible()
        expect(zeroTotal).not.toBeInTheDocument()

        await user.click(cartItemPlusButton)
        await user.click(cartItemPlusButton)
        await user.click(cartItemPlusButton)
        await user.click(cartItemPlusButton)

        const cartItemQuantity2 = within(cartItemsSection).getByText('6')
        expect(cartItemsSection).toHaveTextContent(/^Toast: £7\.10-6$/)
        expect(cartItemName).toBeVisible()
        expect(cartItemPrice).toBeVisible()
        expect(cartItemQuantity2).toBeVisible()
        expect(cartItemMinusButton).toBeVisible()
        expect(cartItemMinusButton).toBeEnabled()
        expect(cartItemPlusButton).not.toBeInTheDocument()

        const subtotal2 = within(subtotalSection).queryByText('£42.60')
        expect(subtotal2).toBeVisible()
        expect(zeroSubtotal).not.toBeInTheDocument()
        
        expect(deliveryCost).toBeVisible()
        expect(zeroDeliveryCost).not.toBeInTheDocument()

        const total2 = within(totalSection).queryByText('£44.80')
        expect(total2).toBeVisible()
        expect(zeroTotal).not.toBeInTheDocument()
    })


    test('correctly displays Cart, when the quantity of an item is decreased.', async () => {

        const user = userEvent.setup()
        
        const queryClient = new QueryClient()

        render(<QueryClientProvider client={queryClient}><NewOrderInfoProvider><MakeAnOrder /></NewOrderInfoProvider></QueryClientProvider>)
        
        const menuItem1 = screen.getByTestId('menu-item-1')
        const menuItem1Button = within(menuItem1).getByRole('button', {name: 'Add to Cart'})

        await user.click(menuItem1Button)

        const cartItemPlusButton = screen.getByRole('button', {name: '+'})

        await user.click(cartItemPlusButton)

        const cartItemMinusButton = screen.getByRole('button', {name: '-'})

        await user.click(cartItemMinusButton)

        const cartItemsSection = screen.getByTestId('order-items-section')
        const cartItemName = within(cartItemsSection).getByText('Toast:')
        const cartItemPrice = within(cartItemsSection).getByText('£7.10')
        const cartItemQuantity = within(cartItemsSection).getByText('1')
        expect(cartItemsSection).toHaveTextContent(/^Toast: £7\.10-1\+$/)
        expect(cartItemName).toBeVisible()
        expect(cartItemPrice).toBeVisible()
        expect(cartItemQuantity).toBeVisible()
        expect(cartItemMinusButton).toBeVisible()
        expect(cartItemMinusButton).toBeEnabled()
        expect(cartItemPlusButton).toBeVisible()
        expect(cartItemPlusButton).toBeEnabled()

        const subtotalSection = screen.getByTestId('order-subtotal-section')
        const subtotal = within(subtotalSection).queryByText('£7.10')
        const zeroSubtotal = within(subtotalSection).queryByText('£0.00')
        expect(subtotal).toBeVisible()
        expect(zeroSubtotal).not.toBeInTheDocument()
        
        const deliveryCostSection = screen.getByTestId('order-delivery-cost-section')
        const deliveryCost = within(deliveryCostSection).queryByText('£2.20')
        const zeroDeliveryCost = within(deliveryCostSection).queryByText('£0.00')
        expect(deliveryCost).toBeVisible()
        expect(zeroDeliveryCost).not.toBeInTheDocument()

        const totalSection = screen.getByTestId('order-total-section')
        const total = within(totalSection).queryByText('£9.30')
        const zeroTotal = within(totalSection).queryByText('£0.00')
        expect(total).toBeVisible()
        expect(zeroTotal).not.toBeInTheDocument()
    })


    test('\'s \'Make Order\' button is disabled, when there are no items in the cart.', () => {

        const queryClient = new QueryClient()

        render(<QueryClientProvider client={queryClient}><NewOrderInfoProvider><MakeAnOrder /></NewOrderInfoProvider></QueryClientProvider>)

        const cartItemsSection = screen.getByTestId('order-items-section')
        expect(cartItemsSection).toBeEmptyDOMElement()

        const makeOrderButton = screen.getByRole('button', {name: 'Make Order'})
        expect(makeOrderButton).toBeVisible()
        expect(makeOrderButton).toBeDisabled()
    })


    test('\'s \'Make Order\' button is enabled, when there are items in the cart.', async () => {

        const user = userEvent.setup()

        const queryClient = new QueryClient()

        render(<QueryClientProvider client={queryClient}><NewOrderInfoProvider><MakeAnOrder /></NewOrderInfoProvider></QueryClientProvider>)

        const menuItem1 = screen.getByTestId('menu-item-1')
        const menuItem1Button = within(menuItem1).getByRole('button', {name: 'Add to Cart'})

        await user.click(menuItem1Button)
        
        const cartItemsSection = screen.getByTestId('order-items-section')
        expect(cartItemsSection).toHaveTextContent(/^Toast: £7\.10-1\+$/)

        const makeOrderButton = screen.getByRole('button', {name: 'Make Order'})
        expect(makeOrderButton).toBeVisible()
        expect(makeOrderButton).toBeEnabled()
    })


    test('correctly displays pending message, when the mutation is pending.', async () => {

        server.use(
            http.post('http://127.0.0.1:8000/api/orders', async () => {

                await delay(400)

                return HttpResponse.json({
                    'id': 1,
                    'date_time': '2026-09-07T08:50:32.234494Z',
                    'order_items': [
                        {
                            'id': 1,
                            'item': 'toast',
                            'item_quantity': 1
                        }
                    ]
                }, {status: 201})
            })
        )

        const user = userEvent.setup()

        const queryClient = new QueryClient()

        render(<QueryClientProvider client={queryClient}><NewOrderInfoProvider><MakeAnOrder /></NewOrderInfoProvider></QueryClientProvider>)

        const pendingMessage = screen.queryByText('Processing order...')

        expect(pendingMessage).not.toBeInTheDocument()

        const menuItem1 = screen.getByTestId('menu-item-1')
        const menuItem1Button = within(menuItem1).getByRole('button', {name: 'Add to Cart'})

        await user.click(menuItem1Button)

        expect(pendingMessage).not.toBeInTheDocument()

        const makeOrderButton = screen.getByRole('button', {name: 'Make Order'})

        await user.click(makeOrderButton)

        expect(pendingMessage).toBeVisible()
    })


    test('correctly displays a success message and resets the cart, when an order is successfully made.', async () => {

        const user = userEvent.setup()

        const queryClient = new QueryClient()

        render(<QueryClientProvider client={queryClient}><NewOrderInfoProvider><MakeAnOrder /></NewOrderInfoProvider></QueryClientProvider>)

        const successMessage = screen.queryByText('Order creation was successful.')

        expect(successMessage).not.toBeInTheDocument()

        const menuItem1 = screen.getByTestId('menu-item-1')
        const menuItem1Button = within(menuItem1).getByRole('button', {name: 'Add to Cart'})

        await user.click(menuItem1Button)

        expect(successMessage).not.toBeInTheDocument()

        const cartItemsSection = screen.getByTestId('order-items-section')
        expect(cartItemsSection).toHaveTextContent(/^Toast: £7\.10-1\+$/)

        const makeOrderButton = screen.getByRole('button', {name: 'Make Order'})

        await user.click(makeOrderButton)

        const successMessageAwait = await screen.findByText('Order creation was successful.')

        expect(successMessageAwait).toBeVisible()

        expect(cartItemsSection).toBeEmptyDOMElement()

        const subtotalSection = screen.getByTestId('order-subtotal-section')
        const subtotal = within(subtotalSection).queryByText('£7.10')
        const zeroSubtotal = within(subtotalSection).queryByText('£0.00')
        expect(subtotal).not.toBeInTheDocument()
        expect(zeroSubtotal).toBeVisible()
        
        const deliveryCostSection = screen.getByTestId('order-delivery-cost-section')
        const deliveryCost = within(deliveryCostSection).queryByText('£2.20')
        const zeroDeliveryCost = within(deliveryCostSection).queryByText('£0.00')
        expect(deliveryCost).not.toBeInTheDocument()
        expect(zeroDeliveryCost).toBeVisible()

        const totalSection = screen.getByTestId('order-total-section')
        const total = within(totalSection).queryByText('£9.30')
        const zeroTotal = within(totalSection).queryByText('£0.00')
        expect(total).not.toBeInTheDocument()
        expect(zeroTotal).toBeVisible()
    })


    test('correctly displays an error message and does not reset the cart, when order creation is unsuccessful.', async () => {

        server.use(
            http.post('http://127.0.0.1:8000/api/orders', () => {
                return HttpResponse.json(null, {status: 500})
            })
        )

        const user = userEvent.setup()

        const queryClient = new QueryClient()

        render(<QueryClientProvider client={queryClient}><NewOrderInfoProvider><MakeAnOrder /></NewOrderInfoProvider></QueryClientProvider>)

        const errorMessage = screen.queryByText('Order creation was unsuccessful.')

        expect(errorMessage).not.toBeInTheDocument()

        const menuItem1 = screen.getByTestId('menu-item-1')
        const menuItem1Button = within(menuItem1).getByRole('button', {name: 'Add to Cart'})

        await user.click(menuItem1Button)

        expect(errorMessage).not.toBeInTheDocument()

        const cartItemsSection = screen.getByTestId('order-items-section')
        expect(cartItemsSection).toHaveTextContent(/^Toast: £7\.10-1\+$/)

        const makeOrderButton = screen.getByRole('button', {name: 'Make Order'})

        await user.click(makeOrderButton)

        const errorMessageAwait = await screen.findByText('Order creation was unsuccessful.')

        expect(errorMessageAwait).toBeVisible() 

        expect(cartItemsSection).toHaveTextContent(/^Toast: £7\.10-1\+$/)

        const subtotalSection = screen.getByTestId('order-subtotal-section')
        const subtotal = within(subtotalSection).queryByText('£7.10')
        const zeroSubtotal = within(subtotalSection).queryByText('£0.00')
        expect(subtotal).toBeVisible()
        expect(zeroSubtotal).not.toBeInTheDocument()
        
        const deliveryCostSection = screen.getByTestId('order-delivery-cost-section')
        const deliveryCost = within(deliveryCostSection).queryByText('£2.20')
        const zeroDeliveryCost = within(deliveryCostSection).queryByText('£0.00')
        expect(deliveryCost).toBeVisible()
        expect(zeroDeliveryCost).not.toBeInTheDocument()

        const totalSection = screen.getByTestId('order-total-section')
        const total = within(totalSection).queryByText('£9.30')
        const zeroTotal = within(totalSection).queryByText('£0.00')
        expect(total).toBeVisible()
        expect(zeroTotal).not.toBeInTheDocument()
    })


    test('correctly resets mutation state, when an \'Add to Cart\' button is clicked.', async () => {

        const user = userEvent.setup()

        const queryClient = new QueryClient()

        render(<QueryClientProvider client={queryClient}><NewOrderInfoProvider><MakeAnOrder /></NewOrderInfoProvider></QueryClientProvider>)

        const menuItem1 = screen.getByTestId('menu-item-1')
        const menuItem1Button = within(menuItem1).getByRole('button', {name: 'Add to Cart'})

        await user.click(menuItem1Button)

        const makeOrderButton = screen.getByRole('button', {name: 'Make Order'})

        await user.click(makeOrderButton)

        const successMessage = screen.queryByText('Order creation was successful.')

        expect(successMessage).toBeVisible()

        await user.click(menuItem1Button)

        expect(successMessage).not.toBeInTheDocument()
    })


    test('correctly resets mutation state, when a \'-\' button is clicked.', async () => {
        
        server.use(
            http.post('http://127.0.0.1:8000/api/orders', () => {
                return HttpResponse.json(null, {status: 500})
            })
        )

        const user = userEvent.setup()

        const queryClient = new QueryClient()

        render(<QueryClientProvider client={queryClient}><NewOrderInfoProvider><MakeAnOrder /></NewOrderInfoProvider></QueryClientProvider>)

        const menuItem1 = screen.getByTestId('menu-item-1')
        const menuItem1Button = within(menuItem1).getByRole('button', {name: 'Add to Cart'})

        await user.click(menuItem1Button)

        const makeOrderButton = screen.getByRole('button', {name: 'Make Order'})

        await user.click(makeOrderButton)

        const errorMessage = screen.queryByText('Order creation was unsuccessful.')

        expect(errorMessage).toBeVisible() 

        const cartItemsSection = screen.getByTestId('order-items-section')
        const cartItemMinusButton = within(cartItemsSection).getByRole('button', {name: '-'})
        
        await user.click(cartItemMinusButton)

        expect(errorMessage).not.toBeInTheDocument()
    })


    test('correctly resets mutation state, when a \'+\' button is clicked.', async () => {
        
        server.use(
            http.post('http://127.0.0.1:8000/api/orders', () => {
                return HttpResponse.json(null, {status: 500})
            })
        )

        const user = userEvent.setup()

        const queryClient = new QueryClient()

        render(<QueryClientProvider client={queryClient}><NewOrderInfoProvider><MakeAnOrder /></NewOrderInfoProvider></QueryClientProvider>)

        const menuItem1 = screen.getByTestId('menu-item-1')
        const menuItem1Button = within(menuItem1).getByRole('button', {name: 'Add to Cart'})

        await user.click(menuItem1Button)

        const makeOrderButton = screen.getByRole('button', {name: 'Make Order'})

        await user.click(makeOrderButton)

        const errorMessage = screen.queryByText('Order creation was unsuccessful.')

        expect(errorMessage).toBeVisible() 

        const cartItemsSection = screen.getByTestId('order-items-section')
        const cartItemPlusButton = within(cartItemsSection).getByRole('button', {name: '+'})
        
        await user.click(cartItemPlusButton)

        expect(errorMessage).not.toBeInTheDocument()
    })
})