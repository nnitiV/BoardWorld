import * as cartService from "../services/cartService.js"
import * as userService from "../services/userService.js"
import { Product, User } from "@prisma/client";
import { StripeClient } from "../utils/Stripe.js"

export const createStripeCustomer = async (user: User) => {
  let customer = await StripeClient.customers.create({
    email: user.email || undefined,
    name: user.name || undefined,
    metadata: {
      userId: user.id,
    },
  });
  user.stripeCustomerId = customer.id;
  await userService.updateUserStripeId(user.id, customer.id);
  return customer;
};

export const createCheckout = async (userId: string) => {
  const cart = await cartService.getCartByUserId(userId);
  const lineItems = cart.items.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.product.name,
      },
      unit_amount: Math.round(Number(item.product.price) * 100), // 👈 Cents!
    },
    quantity: item.quantity,
  }));
  const checkoutSession = await StripeClient.checkout.sessions.create({
    success_url: "http://localhost:3000/",
    cancel_url: "http://localhost:3000/cart",
    line_items: lineItems,
    mode: "payment",
    metadata: {
      userId: userId,
      cartId: cart.id,
    },
  });
  return checkoutSession;
};