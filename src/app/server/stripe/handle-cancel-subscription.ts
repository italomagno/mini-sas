import "server-only"
import { db } from "@/app/lib/firebase";
import Stripe from "stripe";

export async function handleStripeCancelSubscription(event: Stripe.CustomerSubscriptionDeletedEvent | Stripe.CustomerSubscriptionUpdatedEvent) {
  const customerId = event.data.object.customer as Stripe.Customer;

  const useRef = await db.collection("users").where("stripeCustomerId", "==", customerId).get();

  if(useRef.empty){
    console.log("User not found");
    return
  }
        const userId = useRef.docs[0].id
 
        await db.collection("users").doc(userId).update({
          subscriptionStatus: "inactive"
        });
}