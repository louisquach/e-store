import {createContext} from 'react'

const CartContext = createContext({
    hidden: true,
    toggle: () => {}
})

export default CartContext;
