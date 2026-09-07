import { http, HttpResponse } from 'msw'

export const handlers = [
    http.get('http://127.0.0.1:8000/api/orders', ({ request }) => {
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
                        'date_time': '2026-09-07T09:00:48.515074Z',
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
    }),
]