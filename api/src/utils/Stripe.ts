import Stripe from "stripe"
const  secret = process.env.SECRET_KEY || "";
export const StripeClient = new Stripe(secret);
