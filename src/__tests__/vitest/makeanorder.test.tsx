import { describe, test, expect} from 'vitest' 
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewOrderInfoProvider from '../../assets/providers/NewOrderInfoProvider'
import Menu from '../../assets/components/makeanorder/menu/Menu'
import { menuItemsInfo } from '../../utils/variables'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

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
})