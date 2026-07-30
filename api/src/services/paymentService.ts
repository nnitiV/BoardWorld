import * as cartService from "../services/cartService.js"
import * as userService from "../services/userService.js"
import * as orderService from "../services/orderService.js"
import { StripeClient } from "../utils/Stripe.js"
import { AppError } from "../utils/AppError.js";

export const createOrUpdateStripeCustomer = async (userId: string ) => {
  const user = await userService.getUserById(userId);
  if(!user) {
    throw new AppError(`User with id ${userId} doesn't exist.`, 404);
  }
  if(!user.stripeCustomerId){

    let customer = await StripeClient.customers.create({
      email: user.email || undefined,
      name: user.name || undefined,
      metadata: {
        userId: user.id,
      },
    });
    user.stripeCustomerId = customer.id;
    await userService.updateUserStripeId(user.id, customer.id);
    // return customer;
  }
  let customer = await StripeClient.customers.retrieve(user.stripeCustomerId)
  // return customer;
};

export const createCheckout = async (userId: string) => {
  const cart = await cartService.getCartByUserId(userId);
  if (!('userId' in cart) || cart.items.length === 0) {
    throw new AppError("Cannot create checkout for an empty cart", 400);
  }

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
  await createOrUpdateStripeCustomer(userId);
  const checkoutSession = await StripeClient.checkout.sessions.create({
    success_url: "http://localhost:3000/",
    cancel_url: "http://localhost:3000/orders",
    line_items: lineItems,
    mode: "payment",
    metadata: {
      userId: userId,
      cartId: cart.id,
    },
  });
  if(!checkoutSession.url) {
    throw new AppError("Url not created.", 500);
  }
  const order = await orderService.createOrderFromCart(cart, userId, checkoutSession.url);
  return {order, checkoutSession};
};