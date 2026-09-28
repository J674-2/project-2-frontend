import MenuItem from './MenuItem'
import { useState } from 'react'
import type { Item } from '../../../../utils/types'

const starters: ['toast', 'salad', 'croquettes'] = ['toast', 'salad', 'croquettes']
const mains: ['pie', 'burger', 'spaghetti'] = ['pie', 'burger', 'spaghetti']
const desserts: ['ice cream', 'cookies', 'strawberries'] = ['ice cream', 'cookies', 'strawberries']

export default function Menu() {

    const [items, setItems] = useState<Item[]>(starters)

    function isStartersDisabled() {
        if(items[0] == 'toast') {
            return true
        } else {
            return false
        }
    }

    function isMainsDisabled() {
        if(items[0] == 'pie') {
            return true
        } else {
            return false
        }
    }

    function isDessertsDisabled() {
        if(items[0] == 'ice cream') {
            return true
        } else {
            return false
        }
    }

    return (
        <section>
            <div className='mb-2 flex justify-center'>
                <h3>Menu</h3>
            </div>
            <div className='mb-6 flex gap-5 justify-center'>
                <div>
                    <button className='py-px' disabled={isStartersDisabled()} onClick={() => setItems(starters)}>Starters</button>
                </div>
                <div>
                    <button className='py-px' disabled={isMainsDisabled()} onClick={() => setItems(mains)}>Mains</button>
                </div>
                <div>
                    <button className='py-px' disabled={isDessertsDisabled()} onClick={() => setItems(desserts)}>Desserts</button>
                </div>
            </div>
            <div className='flex-1 flex flex-col'>
                <MenuItem menuItem={items[0]} itemNumber={1} />
                <MenuItem menuItem={items[1]} itemNumber={2} />
                <MenuItem menuItem={items[2]} itemNumber={3} />
            </div>
        </section>
    )
}