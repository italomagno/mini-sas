import { db } from "@/app/lib/firebase";
import stripe from "@/app/lib/stripe";
import "server-only"



/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Retrieves an existing Stripe customer by userId or creates a new one using userEmail.
 * 
 * @param userId - The unique identifier for the user in the system.
 * @param userEmail - The email address of the user, used to create a new customer if needed.
 * @returns A Promise that resolves to the Stripe customer object.
 */

/*******  0ba2dc52-ce0a-4dad-a1e7-2dec0907485e  *******/
export async function getOrCreateCustomer(userId: string, userEmail: string) {
  try {
    const userRef = db.collection("users").doc(userId);
    const userDoc = await userRef.get();

    if(!userDoc.exists) {
      throw new Error("User not found");
    }

    const stripeCustomerId = userDoc.data()?.stripeCustomerId;

    if (stripeCustomerId) {
      return stripeCustomerId;
    }

    const userName = userDoc.data()?.name
    const stripeCustomer = await stripe.customers.create({ email: userEmail,
      ...(userName && {name: userName}),
      metadata: {
        userId
      }
     });

     await userRef.update({ stripeCustomerId: stripeCustomer.id });

     return stripeCustomer.id;
  } catch (error) {
    console.error(error);
  }
  
}