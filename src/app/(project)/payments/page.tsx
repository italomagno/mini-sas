/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import { useStripe } from "@/app/hook/useStripe"


export default function payments(){
  const {createPaymentStripeCheckout , createSubscriptionStripeCheckout, handleCreateStripePortal} = useStripe()
  return(
    <div className="flex flex-col gap-4 h-screen justify-center items-center">
    <h1 className="text-4xl font-bold">Payments</h1>
    <button onClick={()=>createPaymentStripeCheckout({
      testId: "123"
    })} className="border rounded-md px-1"> Create payment Stripe</button>
    <button onClick={()=>createSubscriptionStripeCheckout({
      testId: "123"
    })} className="border rounded-md px-1"> Create subscription Stripe</button>
    <button onClick={()=>handleCreateStripePortal()} className="border rounded-md px-1"> Create portal Stripe</button>
    </div>
  )
}