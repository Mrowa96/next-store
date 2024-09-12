import { cookies } from 'next/headers';

import { type Product } from '@/domain/product/types';

import {
  addCart,
  addProductToCart,
  deleteProductFromCart,
  getCartById,
  updateProductQuantityInCart,
} from '../repository';

export class CartService {
  #CART_ID_COOKIE = 'cart_id';

  /**
   * Creates cart in database and sets cookie with cart id.
   */
  async #createCart() {
    const cartId = (await addCart()).id;

    // This should be encrypted but to keep it simple I won't do it
    cookies().set(this.#CART_ID_COOKIE, `${cartId}`, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 14,
    });

    return cartId;
  }

  async #getCurrentCartId(createIfEmpty = false) {
    const rawCartId = cookies().get(this.#CART_ID_COOKIE)?.value;

    if (!rawCartId && createIfEmpty) {
      return this.#createCart();
    }

    // We could parse it more, but again just to keep is simple
    return rawCartId ? Number.parseInt(rawCartId) : null;
  }

  /**
   * Always returns cart. If it doesn't exist it will be created.
   */
  async #getCurrentCartSafe() {
    const cartId = await this.#getCurrentCartId(true);

    if (!cartId) {
      throw new Error('Cart id is mandatory.');
    }
    return getCartById(cartId);
  }

  async getCurrentCart() {
    const cartId = await this.#getCurrentCartId();

    if (!cartId) {
      return null;
    }

    return getCartById(cartId);
  }

  async getProductsQuantityInCart() {
    const cart = await this.getCurrentCart();

    if (!cart) {
      return 0;
    }

    return cart.products.reduce((quantity, product) => {
      return quantity + product.quantity;
    }, 0);
  }

  async getTotalCostOfProductsInCart() {
    const cart = await this.getCurrentCart();

    if (!cart) {
      return 0;
    }

    return cart.products.reduce((totalCost, product) => {
      return totalCost + product.quantity * product.price;
    }, 0);
  }

  async addProductToCart(product: Product) {
    const cart = await this.#getCurrentCartSafe();
    const existingProduct = cart.products.find(({ id }) => id === product.id);

    if (existingProduct) {
      await updateProductQuantityInCart({
        cartId: cart.id,
        productId: existingProduct.id,
        quantity: existingProduct.quantity + 1,
      });
    } else {
      await addProductToCart({
        cartId: cart.id,
        product,
      });
    }

    return true;
  }

  async changeProductQuantityInCart(productId: number, mode: 'increase' | 'decrease') {
    const cart = await this.getCurrentCart();

    if (!cart) {
      throw new Error('Cart has to be defined at this point.');
    }

    const existingProduct = cart.products.find((product) => product.id === productId);

    if (!existingProduct) {
      throw new Error(`Cannot find product with id ${productId} in cart with id ${cart.id}`);
    }

    if (mode === 'increase') {
      await updateProductQuantityInCart({
        cartId: cart.id,
        productId: existingProduct.id,
        quantity: existingProduct.quantity + 1,
      });
    } else {
      if (existingProduct.quantity - 1 === 0) {
        await deleteProductFromCart({ cartId: cart.id, productId: existingProduct.id });
      } else {
        await updateProductQuantityInCart({
          cartId: cart.id,
          productId: existingProduct.id,
          quantity: existingProduct.quantity - 1,
        });
      }
    }

    return true;
  }

  async deleteProductFromCart(productId: number) {
    const cart = await this.getCurrentCart();

    if (!cart) {
      throw new Error('Cart has to be defined at this point.');
    }

    await deleteProductFromCart({
      cartId: cart.id,
      productId,
    });

    return true;
  }
}
