import React, { useEffect, useState, useContext } from 'react'
import OrderList from '@/components/order/orderList'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useCart } from '@/hooks/use-cart'

export default function OrderListHome() {
  const { handleRemoveAll = () => {} } = useCart()
  const router = useRouter()
  const MySwal = withReactContent(Swal)

  return (
    <>
      <OrderList />
    </>
  )
}
