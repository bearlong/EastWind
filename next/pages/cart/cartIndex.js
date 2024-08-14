import React, { useEffect, useState } from 'react'
import { useCart } from '@/hooks/use-cart'
import Cart from '@/components/cart'

export default function CartIndex() {
  const {
    cart,
    top,
    error,
    handleIncrease = () => {},
    handleDecrease = () => {},
    handleRemove = () => {},
  } = useCart()
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <Cart
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
        cart={cart}
        top={top}
        handleIncrease={handleIncrease}
        handleDecrease={handleDecrease}
        handleRemove={handleRemove}
      />
    </>
  )
}
