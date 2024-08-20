import React, { useState, useContext, createContext, useEffect } from 'react'
import { AuthContext } from '@/context/AuthContext'

const CartContext = createContext(null)

export const CartProvider = ({ initialCartItems = [], children }) => {
  const { user } = useContext(AuthContext)
  let items = initialCartItems
  const [cart, setCart] = useState(initialCartItems)
  const [top, setTop] = useState([])
  const [error, setError] = useState(null)
  const [remark, setRemark] = useState('')
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => {
    setShow(true)
  }

  useEffect(() => {
    const fetchCart = async () => {
      if (!items.length) {
        try {
          if (typeof window !== 'undefined' && user !== undefined) {
            const url = `http://localhost:3005/api/cart/${user.id}`
            const response = await fetch(url)
            const result = await response.json()
            if (result.status === 'success') {
              setCart(result.data.cart)
              setTop(result.data.top)
              setRemark('')
            } else {
              setError(result.data.message)
            }
          } else {
            setCart([])
            setRemark('')
          }
        } catch (error) {
          setError(error)
        }
      }
    }
    fetchCart()
  }, [user])

  const handleAdd = async (object, type, quantity) => {
    const foundIndex = cart.findIndex(
      (v) => v.object_id === object.id && v.object_type === type
    )

    const url = `http://localhost:3005/api/cart/${user.id}/${type}/${object.id}`
    const method = foundIndex > -1 ? 'PUT' : 'POST'
    const updatedQuantity =
      method === 'PUT'
        ? parseInt(cart[foundIndex].quantity, 10) + parseInt(quantity, 10)
        : parseInt(quantity, 10)
    const body = JSON.stringify({
      quantity: updatedQuantity,
      price: object.price,
    })
    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body,
      })
      const result = await response.json()
      if (result.status === 'success') {
        setCart(result.data.cart)
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
    const url = `http://localhost:3005/api/cart/${user.id}/${object.object_type}/${object.object_id}`
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
    const url = `http://localhost:3005/api/cart/${user.id}/${object.object_type}/${object.object_id}`
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
    const url = `http://localhost:3005/api/cart/${user.id}/${object.object_type}/${object.object_id}`

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
    console.log(user)
    const url = `http://localhost:3005/api/cart/${user.id}`

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
        remark,
        setRemark,
        handleAdd,
        handleIncrease,
        handleDecrease,
        handleRemove,
        handleRemoveAll,
        handleClose,
        handleShow,
        show,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
