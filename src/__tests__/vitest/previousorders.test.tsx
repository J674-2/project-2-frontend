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
    test('is correctly displayed, when the query returns an error.', async () => {
        server.use(
            http.get('http://127.0.0.1:8000/api/orders', () => {
                return HttpResponse.json(null, {status: 400})
            })
        )

        const queryClient = new QueryClient()

        render(<QueryClientProvider client={queryClient}><PageProvider><PreviousOrderInfoProvider><OrderSummary /></PreviousOrderInfoProvider></PageProvider></QueryClientProvider>)
        
        const totalSection = screen.getByTestId('order-total-section')
        const zeroTotal = await within(totalSection).findByText('£0.00')
        const total = within(totalSection).queryByText('£56.45')
        const totalLoading = within(totalSection).queryByText('Loading...')
        expect(zeroTotal).toBeVisible()
        expect(total).not.toBeInTheDocument()
        expect(totalLoading).not.toBeInTheDocument()

        const deliveryCostSection = screen.getByTestId('order-delivery-cost-section')
        const deliveryCost = within(deliveryCostSection).queryByText('£2.20')
        const zeroDeliveryCost = within(deliveryCostSection).queryByText('£0.00')
        const deliveryCostLoading = within(deliveryCostSection).queryByText('Loading...')
        expect(deliveryCost).not.toBeInTheDocument()
        expect(zeroDeliveryCost).toBeVisible()
        expect(deliveryCostLoading).not.toBeInTheDocument()

        const subtotalSection = screen.getByTestId('order-subtotal-section')
        const subtotal = within(subtotalSection).queryByText('£54.25')
        const zeroSubtotal = within(subtotalSection).queryByText('£0.00')
        const subtotalLoading = within(subtotalSection).queryByText('Loading...')
        expect(subtotal).not.toBeInTheDocument()
        expect(zeroSubtotal).toBeVisible()
        expect(subtotalLoading).not.toBeInTheDocument()

        const itemsSection = screen.getByTestId('order-items-section')
        expect(itemsSection).toBeEmptyDOMElement()

        const dateTimeSection = screen.getByTestId('order-date-time-section')
        const date = within(dateTimeSection).queryByText('07/09/2026')
        const time = within(dateTimeSection).queryByText('09:02')
        const dateTimeLoading = within(dateTimeSection).queryByText('Loading...')
        expect(date).not.toBeInTheDocument()
        expect(time).not.toBeInTheDocument()
        expect(dateTimeLoading).not.toBeInTheDocument()
    })
    
    
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


    test('is correctly displayed, when the query returns no previous orders.', async () => {
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

        render(<QueryClientProvider client={queryClient}><PageProvider><PreviousOrderInfoProvider><OrderSummary /></PreviousOrderInfoProvider></PageProvider></QueryClientProvider>)
        
        const totalSection = screen.getByTestId('order-total-section')
        const zeroTotal = await within(totalSection).findByText('£0.00')
        const total = within(totalSection).queryByText('£56.45')
        const totalLoading = within(totalSection).queryByText('Loading...')
        expect(zeroTotal).toBeVisible()
        expect(total).not.toBeInTheDocument()
        expect(totalLoading).not.toBeInTheDocument()

        const deliveryCostSection = screen.getByTestId('order-delivery-cost-section')
        const deliveryCost = within(deliveryCostSection).queryByText('£2.20')
        const zeroDeliveryCost = within(deliveryCostSection).queryByText('£0.00')
        const deliveryCostLoading = within(deliveryCostSection).queryByText('Loading...')
        expect(deliveryCost).not.toBeInTheDocument()
        expect(zeroDeliveryCost).toBeVisible()
        expect(deliveryCostLoading).not.toBeInTheDocument()

        const subtotalSection = screen.getByTestId('order-subtotal-section')
        const subtotal = within(subtotalSection).queryByText('£54.25')
        const zeroSubtotal = within(subtotalSection).queryByText('£0.00')
        const subtotalLoading = within(subtotalSection).queryByText('Loading...')
        expect(subtotal).not.toBeInTheDocument()
        expect(zeroSubtotal).toBeVisible()
        expect(subtotalLoading).not.toBeInTheDocument()

        const itemsSection = screen.getByTestId('order-items-section')
        expect(itemsSection).toBeEmptyDOMElement()

        const dateTimeSection = screen.getByTestId('order-date-time-section')
        const date = within(dateTimeSection).queryByText('07/09/2026')
        const time = within(dateTimeSection).queryByText('09:02')
        const dateTimeLoading = within(dateTimeSection).queryByText('Loading...')
        expect(date).not.toBeInTheDocument()
        expect(time).not.toBeInTheDocument()
        expect(dateTimeLoading).not.toBeInTheDocument()
    })


    test('is correctly displayed, when the query returns previous orders.', async () => {

        const queryClient = new QueryClient()

        render(<QueryClientProvider client={queryClient}><PageProvider><PreviousOrderInfoProvider><OrderSummary /></PreviousOrderInfoProvider></PageProvider></QueryClientProvider>)
        
        const dateTimeSection = screen.getByTestId('order-date-time-section')
        const date = await within(dateTimeSection).findByText('07/09/2026')
        const time = within(dateTimeSection).queryByText('09:02')
        const dateTimeLoading = within(dateTimeSection).queryByText('Loading...')
        expect(date).toBeVisible()
        expect(time).toBeVisible()
        expect(dateTimeLoading).not.toBeInTheDocument()

        const itemsSection = screen.getByTestId('order-items-section')

        const item1 = screen.getByTestId('order-item-1')
        const item1Name = within(item1).getByText('Salad:')
        const item1Price = within(item1).getByText('£6.25')
        const item1Quantity = within(item1).getByText('x5')
        const wrongItem1Name = within(item1).queryByText('Burger:')
        const wrongItem1Price = within(item1).queryByText('£11.50')
        const wrongItem1Quantity = within(item1).queryByText('x2')
        expect(item1Name).toBeVisible()
        expect(item1Price).toBeVisible()
        expect(item1Quantity).toBeVisible()
        expect(wrongItem1Name).not.toBeInTheDocument()
        expect(wrongItem1Price).not.toBeInTheDocument()
        expect(wrongItem1Quantity).not.toBeInTheDocument()

        const item2 = screen.getByTestId('order-item-2')
        const item2Name = within(item2).getByText('Burger:')
        const item2Price = within(item2).getByText('£11.50')
        const item2Quantity = within(item2).getByText('x2')
        const wrongItem2Name = within(item2).queryByText('Salad:')
        const wrongItem2Price = within(item2).queryByText('£6.25')
        const wrongItem2Quantity = within(item2).queryByText('x5')
        expect(item2Name).toBeVisible()
        expect(item2Price).toBeVisible()
        expect(item2Quantity).toBeVisible()
        expect(wrongItem2Name).not.toBeInTheDocument()
        expect(wrongItem2Price).not.toBeInTheDocument()
        expect(wrongItem2Quantity).not.toBeInTheDocument()

        const itemsLoading = within(itemsSection).queryByText('Loading...')
        expect(itemsLoading).not.toBeInTheDocument()

        const subtotalSection = screen.getByTestId('order-subtotal-section')
        const subtotal = within(subtotalSection).queryByText('£54.25')
        const zeroSubtotal = within(subtotalSection).queryByText('£0.00')
        const subtotalLoading = within(subtotalSection).queryByText('Loading...')
        expect(subtotal).toBeVisible()
        expect(zeroSubtotal).not.toBeInTheDocument()
        expect(subtotalLoading).not.toBeInTheDocument()

        const deliveryCostSection = screen.getByTestId('order-delivery-cost-section')
        const deliveryCost = within(deliveryCostSection).queryByText('£2.20')
        const zeroDeliveryCost = within(deliveryCostSection).queryByText('£0.00')
        const deliveryCostLoading = within(deliveryCostSection).queryByText('Loading...')
        expect(deliveryCost).toBeVisible()
        expect(zeroDeliveryCost).not.toBeInTheDocument()
        expect(deliveryCostLoading).not.toBeInTheDocument()

        const totalSection = screen.getByTestId('order-total-section')
        const total = within(totalSection).queryByText('£56.45')
        const zeroTotal = within(totalSection).queryByText('£0.00')
        const totalLoading = within(totalSection).queryByText('Loading...')
        expect(total).toBeVisible()
        expect(zeroTotal).not.toBeInTheDocument()
        expect(totalLoading).not.toBeInTheDocument()
    })
})


describe('PreviousOrders', () => {
    test('correctly changes ListOfOrders and OrderSummary, when a "See Order" button is clicked in ListOfOrders.', async () => {
        const user = userEvent.setup()
        
        const queryClient = new QueryClient()

        render(<QueryClientProvider client={queryClient}><PageProvider><PreviousOrderInfoProvider><OrderSummary /></PreviousOrderInfoProvider></PageProvider></QueryClientProvider>)
        
        const seeOrderButton2 = screen.getAllByRole('button', {name: 'See Order'})[1]

        await user.click(seeOrderButton2)

        expect(seeOrderButton2).toBeDisabled()

        const seeOrderButton1 = screen.getAllByRole('button', {name: 'See Order'})[0]
        const seeOrderButton3 = screen.getAllByRole('button', {name: 'See Order'})[2]
        expect(seeOrderButton1).toBeEnabled()
        expect(seeOrderButton3).toBeEnabled()

        const dateTimeSection = screen.getByTestId('order-date-time-section')
        const date = within(dateTimeSection).queryByText('07/09/2026')
        const time = within(dateTimeSection).queryByText('09:01')
        const dateTimeLoading = within(dateTimeSection).queryByText('Loading...')
        expect(date).toBeVisible()
        expect(time).toBeVisible()
        expect(dateTimeLoading).not.toBeInTheDocument()

        const itemsSection = screen.getByTestId('order-items-section')

        const item1 = screen.getByTestId('order-item-1')
        const item1Name = within(item1).getByText('Ice cream:')
        const item1Price = within(item1).getByText('£4.30')
        const item1Quantity = within(item1).getByText('x2')
        const wrongItem1Name = within(item1).queryByText('Strawberries:')
        const wrongItem1Price = within(item1).queryByText('£2.60')
        const wrongItem1Quantity = within(item1).queryByText('x1')
        expect(item1Name).toBeVisible()
        expect(item1Price).toBeVisible()
        expect(item1Quantity).toBeVisible()
        expect(wrongItem1Name).not.toBeInTheDocument()
        expect(wrongItem1Price).not.toBeInTheDocument()
        expect(wrongItem1Quantity).not.toBeInTheDocument()

        const item2 = screen.getByTestId('order-item-2')
        const item2Name = within(item2).getByText('Strawberries:')
        const item2Price = within(item2).getByText('£2.60')
        const item2Quantity = within(item2).getByText('x1')
        const wrongItem2Name = within(item2).queryByText('Ice cream:')
        const wrongItem2Price = within(item2).queryByText('£4.30')
        const wrongItem2Quantity = within(item2).queryByText('x2')
        expect(item2Name).toBeVisible()
        expect(item2Price).toBeVisible()
        expect(item2Quantity).toBeVisible()
        expect(wrongItem2Name).not.toBeInTheDocument()
        expect(wrongItem2Price).not.toBeInTheDocument()
        expect(wrongItem2Quantity).not.toBeInTheDocument()

        const itemsLoading = within(itemsSection).queryByText('Loading...')
        expect(itemsLoading).not.toBeInTheDocument()

        const subtotalSection = screen.getByTestId('order-subtotal-section')
        const subtotal = within(subtotalSection).queryByText('£11.20')
        const zeroSubtotal = within(subtotalSection).queryByText('£0.00')
        const subtotalLoading = within(subtotalSection).queryByText('Loading...')
        expect(subtotal).toBeVisible()
        expect(zeroSubtotal).not.toBeInTheDocument()
        expect(subtotalLoading).not.toBeInTheDocument()

        const deliveryCostSection = screen.getByTestId('order-delivery-cost-section')
        const deliveryCost = within(deliveryCostSection).queryByText('£2.20')
        const zeroDeliveryCost = within(deliveryCostSection).queryByText('£0.00')
        const deliveryCostLoading = within(deliveryCostSection).queryByText('Loading...')
        expect(deliveryCost).toBeVisible()
        expect(zeroDeliveryCost).not.toBeInTheDocument()
        expect(deliveryCostLoading).not.toBeInTheDocument()

        const totalSection = screen.getByTestId('order-total-section')
        const total = within(totalSection).queryByText('£13.40')
        const zeroTotal = within(totalSection).queryByText('£0.00')
        const totalLoading = within(totalSection).queryByText('Loading...')
        expect(total).toBeVisible()
        expect(zeroTotal).not.toBeInTheDocument()
        expect(totalLoading).not.toBeInTheDocument()
    })


    test('does not change OrderSummary, when the page is changed in ListOfOrders and that next page is displaying.', async () => {
        const user = userEvent.setup()

        const queryClient = new QueryClient()

        render(<QueryClientProvider client={queryClient}><PageProvider><PreviousOrderInfoProvider><OrderSummary /></PreviousOrderInfoProvider></PageProvider></QueryClientProvider>)
        
        const nextPageButton = screen.getByRole('button', {name: 'Next Page'})

        await user.click(nextPageButton)

        expect(await screen.findByText('2/2')).toBeVisible()

        const dateTimeSection = screen.getByTestId('order-date-time-section')
        const date = within(dateTimeSection).queryByText('07/09/2026')
        const time = within(dateTimeSection).queryByText('09:02')
        const dateTimeLoading = within(dateTimeSection).queryByText('Loading...')
        expect(date).toBeVisible()
        expect(time).toBeVisible()
        expect(dateTimeLoading).not.toBeInTheDocument()

        const itemsSection = screen.getByTestId('order-items-section')

        const item1 = screen.getByTestId('order-item-1')
        const item1Name = within(item1).getByText('Salad:')
        const item1Price = within(item1).getByText('£6.25')
        const item1Quantity = within(item1).getByText('x5')
        const wrongItem1Name = within(item1).queryByText('Burger:')
        const wrongItem1Price = within(item1).queryByText('£11.50')
        const wrongItem1Quantity = within(item1).queryByText('x2')
        expect(item1Name).toBeVisible()
        expect(item1Price).toBeVisible()
        expect(item1Quantity).toBeVisible()
        expect(wrongItem1Name).not.toBeInTheDocument()
        expect(wrongItem1Price).not.toBeInTheDocument()
        expect(wrongItem1Quantity).not.toBeInTheDocument()

        const item2 = screen.getByTestId('order-item-2')
        const item2Name = within(item2).getByText('Burger:')
        const item2Price = within(item2).getByText('£11.50')
        const item2Quantity = within(item2).getByText('x2')
        const wrongItem2Name = within(item2).queryByText('Salad:')
        const wrongItem2Price = within(item2).queryByText('£6.25')
        const wrongItem2Quantity = within(item2).queryByText('x5')
        expect(item2Name).toBeVisible()
        expect(item2Price).toBeVisible()
        expect(item2Quantity).toBeVisible()
        expect(wrongItem2Name).not.toBeInTheDocument()
        expect(wrongItem2Price).not.toBeInTheDocument()
        expect(wrongItem2Quantity).not.toBeInTheDocument()

        const itemsLoading = within(itemsSection).queryByText('Loading...')
        expect(itemsLoading).not.toBeInTheDocument()

        const subtotalSection = screen.getByTestId('order-subtotal-section')
        const subtotal = within(subtotalSection).queryByText('£54.25')
        const zeroSubtotal = within(subtotalSection).queryByText('£0.00')
        const subtotalLoading = within(subtotalSection).queryByText('Loading...')
        expect(subtotal).toBeVisible()
        expect(zeroSubtotal).not.toBeInTheDocument()
        expect(subtotalLoading).not.toBeInTheDocument()

        const deliveryCostSection = screen.getByTestId('order-delivery-cost-section')
        const deliveryCost = within(deliveryCostSection).queryByText('£2.20')
        const zeroDeliveryCost = within(deliveryCostSection).queryByText('£0.00')
        const deliveryCostLoading = within(deliveryCostSection).queryByText('Loading...')
        expect(deliveryCost).toBeVisible()
        expect(zeroDeliveryCost).not.toBeInTheDocument()
        expect(deliveryCostLoading).not.toBeInTheDocument()

        const totalSection = screen.getByTestId('order-total-section')
        const total = within(totalSection).queryByText('£56.45')
        const zeroTotal = within(totalSection).queryByText('£0.00')
        const totalLoading = within(totalSection).queryByText('Loading...')
        expect(total).toBeVisible()
        expect(zeroTotal).not.toBeInTheDocument()
        expect(totalLoading).not.toBeInTheDocument()
    })


    test('does not change OrderSummary, when the page is changed in ListOfOrders and the placeholderData is available.', async () => {
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

        render(<QueryClientProvider client={queryClient}><PageProvider><PreviousOrderInfoProvider><OrderSummary /></PreviousOrderInfoProvider></PageProvider></QueryClientProvider>)
        
        const nextPageButton = screen.getByRole('button', {name: 'Next Page'})

        await user.click(nextPageButton)

        expect(await screen.findByText('.../...')).toBeVisible()

        const dateTimeSection = screen.getByTestId('order-date-time-section')
        const date = within(dateTimeSection).queryByText('07/09/2026')
        const time = within(dateTimeSection).queryByText('09:02')
        const dateTimeLoading = within(dateTimeSection).queryByText('Loading...')
        expect(date).toBeVisible()
        expect(time).toBeVisible()
        expect(dateTimeLoading).not.toBeInTheDocument()

        const itemsSection = screen.getByTestId('order-items-section')

        const item1 = screen.getByTestId('order-item-1')
        const item1Name = within(item1).getByText('Salad:')
        const item1Price = within(item1).getByText('£6.25')
        const item1Quantity = within(item1).getByText('x5')
        const wrongItem1Name = within(item1).queryByText('Burger:')
        const wrongItem1Price = within(item1).queryByText('£11.50')
        const wrongItem1Quantity = within(item1).queryByText('x2')
        expect(item1Name).toBeVisible()
        expect(item1Price).toBeVisible()
        expect(item1Quantity).toBeVisible()
        expect(wrongItem1Name).not.toBeInTheDocument()
        expect(wrongItem1Price).not.toBeInTheDocument()
        expect(wrongItem1Quantity).not.toBeInTheDocument()

        const item2 = screen.getByTestId('order-item-2')
        const item2Name = within(item2).getByText('Burger:')
        const item2Price = within(item2).getByText('£11.50')
        const item2Quantity = within(item2).getByText('x2')
        const wrongItem2Name = within(item2).queryByText('Salad:')
        const wrongItem2Price = within(item2).queryByText('£6.25')
        const wrongItem2Quantity = within(item2).queryByText('x5')
        expect(item2Name).toBeVisible()
        expect(item2Price).toBeVisible()
        expect(item2Quantity).toBeVisible()
        expect(wrongItem2Name).not.toBeInTheDocument()
        expect(wrongItem2Price).not.toBeInTheDocument()
        expect(wrongItem2Quantity).not.toBeInTheDocument()

        const itemsLoading = within(itemsSection).queryByText('Loading...')
        expect(itemsLoading).not.toBeInTheDocument()

        const subtotalSection = screen.getByTestId('order-subtotal-section')
        const subtotal = within(subtotalSection).queryByText('£54.25')
        const zeroSubtotal = within(subtotalSection).queryByText('£0.00')
        const subtotalLoading = within(subtotalSection).queryByText('Loading...')
        expect(subtotal).toBeVisible()
        expect(zeroSubtotal).not.toBeInTheDocument()
        expect(subtotalLoading).not.toBeInTheDocument()

        const deliveryCostSection = screen.getByTestId('order-delivery-cost-section')
        const deliveryCost = within(deliveryCostSection).queryByText('£2.20')
        const zeroDeliveryCost = within(deliveryCostSection).queryByText('£0.00')
        const deliveryCostLoading = within(deliveryCostSection).queryByText('Loading...')
        expect(deliveryCost).toBeVisible()
        expect(zeroDeliveryCost).not.toBeInTheDocument()
        expect(deliveryCostLoading).not.toBeInTheDocument()

        const totalSection = screen.getByTestId('order-total-section')
        const total = within(totalSection).queryByText('£56.45')
        const zeroTotal = within(totalSection).queryByText('£0.00')
        const totalLoading = within(totalSection).queryByText('Loading...')
        expect(total).toBeVisible()
        expect(zeroTotal).not.toBeInTheDocument()
        expect(totalLoading).not.toBeInTheDocument()
    })
})