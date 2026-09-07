import { describe, test, expect} from 'vitest' 
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PreviousOrders from '../../assets/components/pages/PreviousOrders'
import ListOfOrders from '../../assets/components/cards/ListOfOrders'
import OrderSummary from '../../assets/components/cards/OrderSummary'
import { server } from '../../mocks/node'
import { http, HttpResponse, delay } from 'msw'

describe('ListOfOrders', () => {
    
    test('is correctly displayed, when the query returns an error.', async () => {
        server.use(
            http.get('http://127.0.0.1:8000/api/orders', () => {
                return HttpResponse.json(null, {status: 400})
            })
        )

        render(<ListOfOrders />)
        
        expect(await screen.findByText('0/0')).toBeVisible()

        const previousPageButton = screen.getByRole('button', {name: 'Previous Page'})
        expect(previousPageButton).toBeVisible()
        expect(previousPageButton).toBeDisabled()

        const nextPageButton = screen.getByRole('button', {name: 'Next Page'})
        expect(nextPageButton).toBeVisible()
        expect(nextPageButton).toBeDisabled()

        const order0 = screen.getByTestId('order-0')
        const order0Date = within(order0).queryByText('07/09/2026')
        const order0Time = within(order0).queryByText('09:02')
        const order0Button = within(order0).queryByRole('button', {name: 'See Order'})
        const order0Loading = within(order0).queryByText('Loading...')
        const order0Error = within(order0).queryByText('An error occurred.')
        expect(order0Date).not.toBeInTheDocument()
        expect(order0Time).not.toBeInTheDocument()
        expect(order0Button).not.toBeInTheDocument()
        expect(order0Loading).not.toBeInTheDocument()
        expect(order0Error).toBeVisible()

        const order1 = screen.getByTestId('order-1')
        const order1Date = within(order1).queryByText('07/09/2026')
        const order1Time = within(order1).queryByText('09:01')
        const order1Button = within(order1).queryByRole('button', {name: 'See Order'})
        const order1Loading = within(order1).queryByText('Loading...')
        const order1Error = within(order1).queryByText('An error occurred.')
        expect(order1Date).not.toBeInTheDocument()
        expect(order1Time).not.toBeInTheDocument()
        expect(order1Button).not.toBeInTheDocument()
        expect(order1Loading).not.toBeInTheDocument()
        expect(order1Error).toBeVisible()

        const order2 = screen.getByTestId('order-2')
        const order2Date = within(order2).queryByText('07/09/2026')
        const order2Time = within(order2).queryByText('09:00')
        const order2Button = within(order2).queryByRole('button', {name: 'See Order'})
        const order2Loading = within(order2).queryByText('Loading...')
        const order2Error = within(order2).queryByText('An error occurred.')
        expect(order2Date).not.toBeInTheDocument()
        expect(order2Time).not.toBeInTheDocument()
        expect(order2Button).not.toBeInTheDocument()
        expect(order2Loading).not.toBeInTheDocument()
        expect(order2Error).toBeVisible()
    })


    test('correctly displays loading values while waiting for server response.', async () => {
        server.use(
            http.get('http://127.0.0.1:8000/api/orders', async ({ request }) => {
                const url = new URL(request.url)
                const page = url.searchParams.get('page')

                await delay(400)

                if (page == '1') {
                    return HttpResponse.json({
                        'count': 4,
                        'next': 'http://127.0.0.1:8000/api/orders?page=2',
                        'previous': null,
                        'results': [
                            {
                                'id': 4,
                                'date_time': '2026-09-07T09:02:05.423877Z',
                                'order_items': [
                                    {
                                        'id': 7,
                                        'item': 'salad',
                                        'item_quantity': 5
                                    },
                                    {
                                        'id': 8,
                                        'item': 'burger',
                                        'item_quantity': 2
                                    }
                                ]
                            },
                            {
                                'id': 3,
                                'date_time': '2026-09-07T09:01:48.515074Z',
                                'order_items': [
                                    {
                                        'id': 5,
                                        'item': 'ice cream',
                                        'item_quantity': 2
                                    },
                                    {
                                        'id': 6,
                                        'item': 'strawberries',
                                        'item_quantity': 1
                                    }
                                ]
                            },
                            {
                                'id': 2,
                                'date_time': '2026-09-07T09:00:10.115674Z',
                                'order_items': [
                                    {
                                        'id': 3,
                                        'item': 'croquettes',
                                        'item_quantity': 4
                                    },
                                    {
                                        'id': 4,
                                        'item': 'strawberries',
                                        'item_quantity': 3
                                    }
                                ]
                            }
                        ]
                    })
                }  
            })
        )

        render(<ListOfOrders />)
        
        expect(screen.getByText('.../...')).toBeVisible()

        const previousPageButton = screen.getByRole('button', {name: 'Previous Page'})
        expect(previousPageButton).toBeVisible()
        expect(previousPageButton).toBeDisabled()

        const nextPageButton = screen.getByRole('button', {name: 'Next Page'})
        expect(nextPageButton).toBeVisible()
        expect(nextPageButton).toBeDisabled()

        const order0 = screen.getByTestId('order-0')
        const order0Date = within(order0).queryByText('07/09/2026')
        const order0Time = within(order0).queryByText('09:02')
        const order0Button = within(order0).queryByRole('button', {name: 'See Order'})
        const order0Loading = within(order0).queryByText('Loading...')
        const order0Error = within(order0).queryByText('An error occurred.')
        expect(order0Date).not.toBeInTheDocument()
        expect(order0Time).not.toBeInTheDocument()
        expect(order0Button).not.toBeInTheDocument()
        expect(order0Loading).toBeVisible()
        expect(order0Error).not.toBeInTheDocument()

        const order1 = screen.getByTestId('order-1')
        const order1Date = within(order1).queryByText('07/09/2026')
        const order1Time = within(order1).queryByText('09:01')
        const order1Button = within(order1).queryByRole('button', {name: 'See Order'})
        const order1Loading = within(order1).queryByText('Loading...')
        const order1Error = within(order1).queryByText('An error occurred.')
        expect(order1Date).not.toBeInTheDocument()
        expect(order1Time).not.toBeInTheDocument()
        expect(order1Button).not.toBeInTheDocument()
        expect(order1Loading).toBeVisible()
        expect(order1Error).not.toBeInTheDocument()

        const order2 = screen.getByTestId('order-2')
        const order2Date = within(order2).queryByText('07/09/2026')
        const order2Time = within(order2).queryByText('09:00')
        const order2Button = within(order2).queryByRole('button', {name: 'See Order'})
        const order2Loading = within(order2).queryByText('Loading...')
        const order2Error = within(order2).queryByText('An error occurred.')
        expect(order2Date).not.toBeInTheDocument()
        expect(order2Time).not.toBeInTheDocument()
        expect(order2Button).not.toBeInTheDocument()
        expect(order2Loading).toBeVisible()
        expect(order2Error).not.toBeInTheDocument()
    })


    test('is correctly displayed, when there are no previous orders.', async () => {
        server.use(
            http.get('http://127.0.0.1:8000/api/orders', ({ request }) => {
                const url = new URL(request.url)
                const page = url.searchParams.get('page')

                if (page == '1') {
                    return HttpResponse.json({
                        'count': 0,
                        'next': null,
                        'previous': null,
                        'results': []
                    })
                }  
            })
        )

        render(<ListOfOrders />)
        
        expect(await screen.findByText('0/0')).toBeVisible()

        const previousPageButton = screen.getByRole('button', {name: 'Previous Page'})
        expect(previousPageButton).toBeVisible()
        expect(previousPageButton).toBeDisabled()

        const nextPageButton = screen.getByRole('button', {name: 'Next Page'})
        expect(nextPageButton).toBeVisible()
        expect(nextPageButton).toBeDisabled()

        const order0 = screen.getByTestId('order-0')
        expect(order0).toBeEmptyDOMElement()

        const order1 = screen.getByTestId('order-1')
        expect(order1).toBeEmptyDOMElement()

        const order2 = screen.getByTestId('order-2')
        expect(order2).toBeEmptyDOMElement()
    })
})