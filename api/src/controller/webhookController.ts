import * as orderService from "../services/orderService.js"
import { StripeClient } from "../utils/Stripe.js";
import { Request, Response } from "express";
import Stripe from "stripe";

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

export const handleStripeWebhook = async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"] as string;
  let event: Stripe.Event;

  try {
    // 1. VERIFY THE SIGNATURE
    // This proves the request actually came from Stripe, not a hacker.
    // req.body MUST be the raw buffer here, which is why we used express.raw() in the router.
    event = StripeClient.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err: any) {
    console.error(`Webhook signature verification failed:`, err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // 2. HANDLE THE EVENT
  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const orderId = session.metadata?.orderId;

        if (orderId) {
          // Update order to PAID
          await orderService.markOrderAsPaid(orderId);
          
          // Optional: Clear the user's cart here using the session.client_reference_id (userId)
        }
        break;
      }

      case "checkout.session.expired": {
        const session = event.data.object as Stripe.Checkout.Session;
        const orderId = session.metadata?.orderId;
        const userId = session.metadata?.userId;

        if (orderId && userId) {
          // Update order to CANCELED
          await orderService.cancelOrder(orderId, userId)
        }
        break;
      }

      default:
        // Ignore other events you don't care about
        console.log(`Unhandled event type: ${event.type}`);
    }
  } catch (error) {
    console.error("Error processing webhook database update:", error);
    // Note: Do NOT return a 500 error to Stripe here unless you want them to keep retrying.
  }

  // 3. ACKNOWLEDGE RECEIPT
  // You must return a 20x status quickly so Stripe knows you received it.
  res.status(200).json({ received: true });
};