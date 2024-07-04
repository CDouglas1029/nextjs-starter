"use client"

import { listCartShippingMethods } from "@lib/data/fulfillment"
import { listCartPaymentMethods } from "@lib/data/payment"
import { HttpTypes } from "@medusajs/types"
import Addresses from "@modules/checkout/components/addresses"
import Payment from "@modules/checkout/components/payment"
import Review from "@modules/checkout/components/review"
import Shipping from "@modules/checkout/components/shipping"
import { useEffect, useState } from "react"

export default function CheckoutForm({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) {
  const [shippingMethods, setAvailableShippingMethods] = useState([])
  const [paymentMethods, setPaymentMethods] = useState([])

  if (!cart) {
    return null
  }

  useEffect(() => {
    listCartShippingMethods(cart.id).then((methods: any) =>
      setAvailableShippingMethods(methods)
    )
  }, [])

  useEffect(() => {
    listCartPaymentMethods(cart.region?.id ?? "").then((payments: any) =>
      setPaymentMethods(payments)
    )
  }, [])

  return (
    <div>
      <div className="w-full grid grid-cols-1 gap-y-8">
        <div>
          <Addresses cart={cart} customer={customer} />
        </div>

        <div>
          <Shipping cart={cart} availableShippingMethods={shippingMethods} />
        </div>

        <div>
          <Payment cart={cart} availablePaymentMethods={paymentMethods} />
        </div>

        <div>
          <Review cart={cart} />
        </div>
      </div>
    </div>
  )
}
