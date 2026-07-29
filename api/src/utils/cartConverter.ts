import { FullCartDetails } from "../types/cart.types.js";
import * as orderService from "../services/orderService.js"

export const convertCartToOrder = async (userId: string, cart: FullCartDetails) => {
    cart.items.map(async (item) =>
      await orderService.addToOrder(userId, {
        quantity: item.quantity,
        productId: item.productId,
      }),
    );
    const order = await orderService.getOrderByUserId(userId);
    return order;
}