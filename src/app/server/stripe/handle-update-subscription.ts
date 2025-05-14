import { db } from "@/app/lib/firebase";
import Stripe from "stripe";




export async function handleStripeUpdateSubscription(event: Stripe.CustomerSubscriptionUpdatedEvent) {

  const customerId = event.data.object.customer as Stripe.Customer;

  const useRef = await db.collection("users").where("stripeCustomerId", "==", customerId).get();

  if(useRef.empty) {
    console.log("User not found");
    return
  }

  const userId = useRef.docs[0].id

  console.log("status: ", event.data.object.status);

  await db.collection("users").doc(userId).update({
    subscriptionStatus: event.data.object.status
  });
  
}