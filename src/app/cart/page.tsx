import { CartService } from '@/domain/cart/services/CartService';
import { CartManager } from '@/domain/cart/ui/CartManager';

const cartService = new CartService();

export default async function CartPage() {
  const totalCost = await cartService.getTotalCostOfProductsInCart();
  const cart = await cartService.getCurrentCart();

  return <CartManager cart={cart} totalCost={totalCost} />;
}
