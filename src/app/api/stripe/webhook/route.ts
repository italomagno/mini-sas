import stripe from "@/app/lib/stripe";
import { handleStripeCancelSubscription } from "@/app/server/stripe/handle-cancel-subscription";
import { handleStripePayment } from "@/app/server/stripe/handle-payment";
import { handleStripeSubscription } from "@/app/server/stripe/handle-subscription";
import { handleStripeUpdateSubscription } from "@/app/server/stripe/handle-update-subscription";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


const secret = process.env.STRIPE_WEBHOOK_SECRET_KEY;
export async function POST(req:NextRequest) {
  try{

  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if( !signature || !secret ) {
    return NextResponse.json({ error: "Signature not found" }, { status: 400 });
  }

  const event = stripe.webhooks.constructEvent(body, signature, secret);

  console.log("Event type: ", event.type);
  switch (event.type) {
    case "checkout.session.completed":
      const metadata = event.data.object.metadata;
      
      if(metadata?.price === process.env.STRIPE_PROCUT_PRICE_ID){
      await handleStripePayment(event)
      }
      if(metadata?.price === process.env.STIPE_SUBSCRIPTION_PRICE_ID){
        await handleStripeSubscription(event)
      }

      break;
    case "checkout.session.expired":
      console.log("send email say subscription expired");

      break;
    case "checkout.session.async_payment_failed":
      console.log("send email say payment failed");

      break;
    case "customer.subscription.created":
      console.log("send email say subscription created");

      break;
    case "customer.subscription.updated":
      console.log("send email say subscription updated");
      await handleStripeUpdateSubscription(event)

      break;
    case "customer.subscription.deleted":
      console.log("entrou aqui")
      await handleStripeCancelSubscription(event)

      break;
      
    default:
      console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  }catch(error){
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
    
}