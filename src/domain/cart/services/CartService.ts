import { cookies } from 'next/headers';

import { addCart, addProductToCart, getCartById, updateProductQuantityInCart } from '../repository';

export class CartService {
  #CART_ID_COOKIE = 'cart_id';

  async #createCart() {
    const cartId = (await addCart()).id;

    // This should be encrypted but to keep it simple I won't do it
    cookies().set(this.#CART_ID_COOKIE, `${cartId}`, {
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
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

  /** If cart doesn't exist it will be created */
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

  async addProductToCart(productId: number) {
    try {
      const cart = await this.#getCurrentCartSafe();
      const existingProduct = cart.products.find((product) => product.id === productId);

      if (existingProduct) {
        await updateProductQuantityInCart({
          cartId: cart.id,
          productId: existingProduct.id,
          quantity: existingProduct.quantity + 1,
        });
      } else {
        await addProductToCart({
          cartId: cart.id,
          productId,
        });
      }

      return {
        status: 'success',
      };
    } catch (error) {
      return {
        status: 'error',
        error,
      };
    }
  }
}
