import React, { useState, useContext, createContext, useEffect } from 'react'

const CartContext = createContext(null)

export const CartProvider = ({ initialCartItems = [], children }) => {
  const user_id = 1
  let items = initialCartItems
  const [cart, setCart] = useState(initialCartItems)
  const [top, setTop] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCart = async () => {
      if (!items.length) {
        try {
          if (typeof window !== 'undefined') {
            const url = `http://localhost:3005/api/cart/${user_id}`
            const response = await fetch(url)
            const result = await response.json()
            if (result.status === 'success') {
              setCart(result.data.cart)
              setTop(result.data.top)
            } else {
              setError(result.data.message)
            }
          }
        } catch (error) {
          setError(error)
        }
      }
    }
    fetchCart()
  }, [])

  const handleAdd = async (object, type, quantity) => {
    const foundIndex = cart.findIndex(
      (v) => v.object_id === object.id && v.object_type === type
    )
    const url = `http://localhost:3005/api/cart/${user_id}/${type}/${object.id}`
    const method = foundIndex > -1 ? 'PUT' : 'POST'
    const body = JSON.stringify({ quantity, price: object.price })

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body,
      })
      const result = await response.json()
      if (result.status === 'success') {
        setCart(result.data.cart)
        setError(null)
      } else {
        setError(result.data.message)
      }
    } catch (error) {
      setError(error.message)
    }
  }

  const handleIncrease = async (object) => {
    const foundIndex = cart.findIndex(
      (v) =>
        v.object_id === object.object_id && v.object_type === object.object_type
    )
    if (foundIndex === -1) {
      setError('購物車內無該商品')
      return
    }
    const url = `http://localhost:3005/api/cart/${user_id}/${object.object_type}/${object.object_id}`
    const quantity = cart[foundIndex].quantity + 1
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity }),
      })
      const result = await response.json()
      if (result.status === 'success') {
        setCart(result.data.cart)
        setError(null)
      } else {
        setError(result.data.message)
      }
    } catch (error) {
      setError(error.message)
    }
  }

  const handleDecrease = async (object) => {
    const foundIndex = cart.findIndex(
      (v) =>
        v.object_id === object.object_id && v.object_type === object.object_type
    )
    if (foundIndex === -1) {
      setError('購物車內無該商品')
      return
    }
    const url = `http://localhost:3005/api/cart/${user_id}/${object.object_type}/${object.object_id}`
    const quantity = cart[foundIndex].quantity - 1

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity }),
      })
      const result = await response.json()
      if (result.status === 'success') {
        setCart(result.data.cart)
        setError(null)
      } else {
        setError(result.data.message)
      }
    } catch (error) {
      setError(error.message)
    }
  }

  const handleRemove = async (object) => {
    const foundIndex = cart.findIndex(
      (v) =>
        v.object_id === object.object_id && v.object_type === object.object_type
    )
    if (foundIndex === -1) {
      setError('購物車內無該商品')
      return
    }
    const url = `http://localhost:3005/api/cart/${user_id}/${object.object_type}/${object.object_id}`

    try {
      const response = await fetch(url, {
        method: 'DELETE',
      })
      const result = await response.json()
      if (result.status === 'success') {
        setCart(result.data.cart)
      }
    } catch (error) {
      setError(error.message)
    }
  }

  const handleRemoveAll = async () => {
    const url = `http://localhost:3005/api/cart/${user_id}`

    try {
      const response = await fetch(url, {
        method: 'DELETE',
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.data?.message || '清空購物車失敗')
      }
      const result = await response.json()
      if (result.status === 'success') {
        setCart([])
      }
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        top,
        error,
        handleAdd,
        handleIncrease,
        handleDecrease,
        handleRemove,
        handleRemoveAll,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
