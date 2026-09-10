import { describe, test, expect} from 'vitest' 
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PreviousOrders from '../../assets/components/previousorders/PreviousOrders'
import ListOfOrders from '../../assets/components/previousorders/listoforders/ListOfOrders'
import OrderSummary from '../../assets/components/cards/OrderSummary'
import { server } from '../../mocks/node'
import { http, HttpResponse, delay } from 'msw'
import PageProvider from '../../assets/providers/PageProvider'
import PreviousOrderInfoProvider from '../../assets/providers/PreviousOrderInfoProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

describe('ListOfOrders', () => {
    
    test('is correctly displayed, when the query returns an error.', async () => {
        server.use(
            http.get('http://127.0.0.1:8000/api/orders', () => {
                return HttpResponse.json(null, {status: 400})
            })
        )

        const queryClient = new QueryClient()

        render(<QueryClientProvider client={queryClient}><PageProvider><PreviousOrderInfoProvider><ListOfOrders /></PreviousOrderInfoProvider></PageProvider></QueryClientProvider>)
        
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

        const queryClient = new QueryClient()

        render(<QueryClientProvider client={queryClient}><PageProvider><PreviousOrderInfoProvider><ListOfOrders /></PreviousOrderInfoProvider></PageProvider></QueryClientProvider>)
        
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

        const queryClient = new QueryClient()

        render(<QueryClientProvider client={queryClient}><PageProvider><PreviousOrderInfoProvider><ListOfOrders /></PreviousOrderInfoProvider></PageProvider></QueryClientProvider>)
        
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


    test('is correctly displayed, when there are previous orders.', async () => {
        const queryClient = new QueryClient()

        render(<QueryClientProvider client={queryClient}><PageProvider><PreviousOrderInfoProvider><ListOfOrders /></PreviousOrderInfoProvider></PageProvider></QueryClientProvider>)

        expect(await screen.findByText('1/2')).toBeVisible()

        const previousPageButton = screen.getByRole('button', {name: 'Previous Page'})
        expect(previousPageButton).toBeVisible()
        expect(previousPageButton).toBeDisabled()

        const nextPageButton = screen.getByRole('button', {name: 'Next Page'})
        expect(nextPageButton).toBeVisible()
        expect(nextPageButton).toBeEnabled()

        const order0 = screen.getByTestId('order-0')
        const order0Date = within(order0).queryByText('07/09/2026')
        const order0Time = within(order0).queryByText('09:02')
        const order0Button = within(order0).queryByRole('button', {name: 'See Order'})
        const order0Loading = within(order0).queryByText('Loading...')
        const order0Error = within(order0).queryByText('An error occurred.')
        expect(order0Date).toBeVisible()
        expect(order0Time).toBeVisible()
        expect(order0Button).toBeVisible()
        expect(order0Button).toBeDisabled()
        expect(order0Loading).not.toBeInTheDocument()
        expect(order0Error).not.toBeInTheDocument()

        const order1 = screen.getByTestId('order-1')
        const order1Date = within(order1).queryByText('07/09/2026')
        const order1Time = within(order1).queryByText('09:01')
        const order1Button = within(order1).queryByRole('button', {name: 'See Order'})
        const order1Loading = within(order1).queryByText('Loading...')
        const order1Error = within(order1).queryByText('An error occurred.')
        expect(order1Date).toBeVisible()
        expect(order1Time).toBeVisible()
        expect(order1Button).toBeVisible()
        expect(order1Button).toBeEnabled()
        expect(order1Loading).not.toBeInTheDocument()
        expect(order1Error).not.toBeInTheDocument()

        const order2 = screen.getByTestId('order-2')
        const order2Date = within(order2).queryByText('07/09/2026')
        const order2Time = within(order2).queryByText('09:00')
        const order2Button = within(order2).queryByRole('button', {name: 'See Order'})
        const order2Loading = within(order2).queryByText('Loading...')
        const order2Error = within(order2).queryByText('An error occurred.')
        expect(order2Date).toBeVisible()
        expect(order2Time).toBeVisible()
        expect(order2Button).toBeVisible()
        expect(order2Button).toBeEnabled()
        expect(order2Loading).not.toBeInTheDocument()
        expect(order2Error).not.toBeInTheDocument()
    })


    test('is correctly displayed, when using the "Previous Page" and "Next Page" buttons to change the page of orders.', async () => {

        const user = userEvent.setup()

        const queryClient = new QueryClient()

        render(<QueryClientProvider client={queryClient}><PageProvider><PreviousOrderInfoProvider><ListOfOrders /></PreviousOrderInfoProvider></PageProvider></QueryClientProvider>)

        const previousPageButton = screen.getByRole('button', {name: 'Previous Page'})
        const nextPageButton = screen.getByRole('button', {name: 'Next Page'})

        await user.click(nextPageButton)

        expect(await screen.findByText('2/2')).toBeVisible()

        expect(previousPageButton).toBeVisible()
        expect(previousPageButton).toBeEnabled()

        expect(nextPageButton).toBeVisible()
        expect(nextPageButton).toBeDisabled()

        const order0 = screen.getByTestId('order-0')
        const order0Date2 = within(order0).queryByText('07/09/2026')
        const order0Time2 = within(order0).queryByText('08:57')
        const order0Button = within(order0).queryByRole('button', {name: 'See Order'})
        const order0Loading = within(order0).queryByText('Loading...')
        const order0Error = within(order0).queryByText('An error occurred.')
        expect(order0Date2).toBeVisible()
        expect(order0Time2).toBeVisible()
        expect(order0Button).toBeVisible()
        expect(order0Button).toBeEnabled()
        expect(order0Loading).not.toBeInTheDocument()
        expect(order0Error).not.toBeInTheDocument()

        const order1 = screen.getByTestId('order-1')
        expect(order1).toBeEmptyDOMElement()

        const order2 = screen.getByTestId('order-2')
        expect(order2).toBeEmptyDOMElement()

        await user.click(previousPageButton)

        expect(await screen.findByText('1/2')).toBeVisible()

        expect(previousPageButton).toBeVisible()
        expect(previousPageButton).toBeDisabled()

        expect(nextPageButton).toBeVisible()
        expect(nextPageButton).toBeEnabled()

        const order0Date1 = within(order0).queryByText('07/09/2026')
        const order0Time1 = within(order0).queryByText('09:02')
        expect(order0Date1).toBeVisible()
        expect(order0Time1).toBeVisible()
        expect(order0Button).toBeVisible()
        expect(order0Button).toBeDisabled()
        expect(order0Loading).not.toBeInTheDocument()
        expect(order0Error).not.toBeInTheDocument()

        const order1Date = within(order1).queryByText('07/09/2026')
        const order1Time = within(order1).queryByText('09:01')
        const order1Button = within(order1).queryByRole('button', {name: 'See Order'})
        const order1Loading = within(order1).queryByText('Loading...')
        const order1Error = within(order1).queryByText('An error occurred.')
        expect(order1Date).toBeVisible()
        expect(order1Time).toBeVisible()
        expect(order1Button).toBeVisible()
        expect(order1Button).toBeEnabled()
        expect(order1Loading).not.toBeInTheDocument()
        expect(order1Error).not.toBeInTheDocument()

        const order2Date = within(order2).queryByText('07/09/2026')
        const order2Time = within(order2).queryByText('09:00')
        const order2Button = within(order2).queryByRole('button', {name: 'See Order'})
        const order2Loading = within(order2).queryByText('Loading...')
        const order2Error = within(order2).queryByText('An error occurred.')
        expect(order2Date).toBeVisible()
        expect(order2Time).toBeVisible()
        expect(order2Button).toBeVisible()
        expect(order2Button).toBeEnabled()
        expect(order2Loading).not.toBeInTheDocument()
        expect(order2Error).not.toBeInTheDocument()
    })


    test('correctly displays, when placeholderData is available.', async () => {
        server.use(
            http.get('http://127.0.0.1:8000/api/orders', async ({ request }) => {
                const url = new URL(request.url)
                const page = url.searchParams.get('page')

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
                } else if (page == '2') {
                    await delay(400)
                    return HttpResponse.json({
                        'count': 4,
                        'next': null,
                        'previous': 'http://127.0.0.1:8000/api/orders',
                        'results': [
                            {
                                'id': 1,
                                'date_time': '2026-09-07T08:57:32.234494Z',
                                'order_items': [
                                    {
                                        'id': 1,
                                        'item': 'toast',
                                        'item_quantity': 2
                                    },
                                    {
                                        'id': 2,
                                        'item': 'spaghetti',
                                        'item_quantity': 1
                                    }
                                ]
                            }
                        ]
                    })
                } 
            })
        )

        const user = userEvent.setup()

        const queryClient = new QueryClient()

        render(<QueryClientProvider client={queryClient}><PageProvider><PreviousOrderInfoProvider><ListOfOrders /></PreviousOrderInfoProvider></PageProvider></QueryClientProvider>)

        const previousPageButton = screen.getByRole('button', {name: 'Previous Page'})
        const nextPageButton = screen.getByRole('button', {name: 'Next Page'})

        await user.click(nextPageButton)

        expect(screen.getByText('.../...')).toBeVisible()

        expect(previousPageButton).toBeVisible()
        expect(previousPageButton).toBeEnabled()

        expect(nextPageButton).toBeVisible()
        expect(nextPageButton).toBeDisabled()

        const order0 = screen.getByTestId('order-0')
        const order0Date = within(order0).queryByText('07/09/2026')
        const order0Time = within(order0).queryByText('09:02')
        const order0Button = within(order0).queryByRole('button', {name: 'See Order'})
        const order0Loading = within(order0).queryByText('Loading...')
        const order0Error = within(order0).queryByText('An error occurred.')
        expect(order0Date).toBeVisible()
        expect(order0Time).toBeVisible()
        expect(order0Button).toBeVisible()
        expect(order0Button).toBeDisabled()
        expect(order0Loading).not.toBeInTheDocument()
        expect(order0Error).not.toBeInTheDocument()

        const order1 = screen.getByTestId('order-1')
        const order1Date = within(order1).queryByText('07/09/2026')
        const order1Time = within(order1).queryByText('09:01')
        const order1Button = within(order1).queryByRole('button', {name: 'See Order'})
        const order1Loading = within(order1).queryByText('Loading...')
        const order1Error = within(order1).queryByText('An error occurred.')
        expect(order1Date).toBeVisible()
        expect(order1Time).toBeVisible()
        expect(order1Button).toBeVisible()
        expect(order1Button).toBeDisabled()
        expect(order1Loading).not.toBeInTheDocument()
        expect(order1Error).not.toBeInTheDocument()

        const order2 = screen.getByTestId('order-2')
        const order2Date = within(order2).queryByText('07/09/2026')
        const order2Time = within(order2).queryByText('09:00')
        const order2Button = within(order2).queryByRole('button', {name: 'See Order'})
        const order2Loading = within(order2).queryByText('Loading...')
        const order2Error = within(order2).queryByText('An error occurred.')
        expect(order2Date).toBeVisible()
        expect(order2Time).toBeVisible()
        expect(order2Button).toBeVisible()
        expect(order2Button).toBeDisabled()
        expect(order2Loading).not.toBeInTheDocument()
        expect(order2Error).not.toBeInTheDocument()
    })
})


describe('OrderSummary', () => {
    test('correctly displays loading values while the query is pending.', () => {
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
        
        const queryClient = new QueryClient()

        render(<QueryClientProvider client={queryClient}><PageProvider><PreviousOrderInfoProvider><OrderSummary /></PreviousOrderInfoProvider></PageProvider></QueryClientProvider>)
        
        const dateTimeSection = screen.getByTestId('order-date-time-section')
        const date = within(dateTimeSection).queryByText('07/09/2026')
        const time = within(dateTimeSection).queryByText('09:02')
        const dateTimeLoading = within(dateTimeSection).queryByText('Loading...')
        expect(date).not.toBeInTheDocument()
        expect(time).not.toBeInTheDocument()
        expect(dateTimeLoading).toBeVisible()

        const itemsSection = screen.getByTestId('order-items-section')
        const item1 = screen.queryByTestId('order-item-1')
        const item2 = screen.queryByTestId('order-item-2')
        const itemsLoading = within(itemsSection).queryByText('Loading...')
        expect(item1).not.toBeInTheDocument()
        expect(item2).not.toBeInTheDocument()
        expect(itemsLoading).toBeVisible()

        const subtotalSection = screen.getByTestId('order-subtotal-section')
        const subtotal = within(subtotalSection).queryByText('£54.25')
        const zeroSubtotal = within(subtotalSection).queryByText('£0.00')
        const subtotalLoading = within(subtotalSection).queryByText('Loading...')
        expect(subtotal).not.toBeInTheDocument()
        expect(zeroSubtotal).not.toBeInTheDocument()
        expect(subtotalLoading).toBeVisible()

        const deliveryCostSection = screen.getByTestId('order-delivery-cost-section')
        const deliveryCost = within(deliveryCostSection).queryByText('£2.20')
        const zeroDeliveryCost = within(deliveryCostSection).queryByText('£0.00')
        const deliveryCostLoading = within(deliveryCostSection).queryByText('Loading...')
        expect(deliveryCost).not.toBeInTheDocument()
        expect(zeroDeliveryCost).not.toBeInTheDocument()
        expect(deliveryCostLoading).toBeVisible()

        const totalSection = screen.getByTestId('order-total-section')
        const total = within(totalSection).queryByText('£56.45')
        const zeroTotal = within(totalSection).queryByText('£0.00')
        const totalLoading = within(totalSection).queryByText('Loading...')
        expect(total).not.toBeInTheDocument()
        expect(zeroTotal).not.toBeInTheDocument()
        expect(totalLoading).toBeVisible()
    }) 
})