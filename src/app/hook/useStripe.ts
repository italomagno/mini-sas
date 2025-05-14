/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useEffect, useState } from "react";
import {loadStripe, Stripe} from "@stripe/stripe-js";



export function useStripe() {
  const [stripe, setStripe] = useState<Stripe | null>(null);

  useEffect(() => {
   async function loadStripeAsync(){
    if(!process.env.NEXT_PUBLIC_STRIPE_PUB_KEY){
      throw new Error("STRIPE_PUB_KEY is not set")
    }
    const stripeInstance = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUB_KEY)

    setStripe(stripeInstance)
   }

    loadStripeAsync()
  }, []);

  async function createPaymentStripeCheckout(checkoutData:any){

    if(!stripe) return

    try{
      const response = await fetch("api/stripe/create-pay-checkout", {
        method:"POST",
        body:JSON.stringify(checkoutData)
      })

      if(!response.ok){
        
        throw new Error("Failed to create checkout session")
      
      }

      const data = await response.json()

      await stripe.redirectToCheckout({
        sessionId: data.sessionId
      })

    }catch(e){
      console.error(e)
    }
    
  }


  async function createSubscriptionStripeCheckout(checkoutData:any){
    if(!stripe) return
    const response = await fetch("api/stripe/create-subscription-checkout", {
      method:"POST",
      body:JSON.stringify(checkoutData)
    })

    if(!response.ok){
      throw new Error("Failed to create checkout session")
    }

    const data = await response.json()

    await stripe.redirectToCheckout({
      sessionId: data.sessionId
    })
  }


  async function handleCreateStripePortal(){
    const response = await fetch("api/stripe/create-stripe-portal", {
      method:"POST",
      headers: {
        "Content-Type": "application/json",
      }
    })

    if(!response.ok){
      throw new Error("Failed to create checkout session")
    }

    const data = await response.json()

    window.location.href = data.url
  }
  return {
    createPaymentStripeCheckout,
    createSubscriptionStripeCheckout,handleCreateStripePortal
  }
}


