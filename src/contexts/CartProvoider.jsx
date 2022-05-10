import React, { useState, createContext, useContext } from 'react'

const Cart = createContext()

export function CartProvider({ children }) {
  const [cartState, setCartState] = useState([])

  const updateCart = (orderData) => {
    setCartState((prevCart) => [...prevCart, orderData])
  }

  const cleanCart = () => {
    setCartState([])
  }

  const deleteStuff = (id) => {
    const newCart = cartState.filter((item) => item.itemOnCart.id !== id)
    setCartState(newCart)
  }

  return (
    <Cart.Provider value={{ cartState, updateCart, cleanCart, deleteStuff }}>
      {children}
    </Cart.Provider>
  )
}

export function useCart() {
  return useContext(Cart)
}
