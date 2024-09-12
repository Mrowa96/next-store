import { parse } from 'valibot';

import { db } from '@/infrastructure/db';

import { type Product } from '../product/types';
import { cartWithProductsSchema, rawCartWithProductsSchema } from './schemas';
import { type CartWithProducts } from './types';

export function getCartById(id: number): Promise<CartWithProducts> {
  return new Promise((resolve, reject) => {
    db.all(
      `
        SELECT 
          c.id AS cart_id,
          c.created_at,
          cp.product_id,
          cp.product_price,
          cp.product_title,
          cp.quantity
        FROM cart c
        LEFT JOIN cart_products cp 
          ON c.id = cp.cart_id
        WHERE c.id = ?;
      `,
      [id],
      function callback(error, rows) {
        if (error) {
          reject(error);
        }

        if (!rows.length) {
          reject(new Error(`Cannot find cart for id ${id}.`));
        }

        const parsedData = parse(rawCartWithProductsSchema, rows);

        const data = {
          id: parsedData[0]?.cart_id,
          products: parsedData
            .filter((item) => item.product_id !== null)
            .map((item) => ({
              id: item.product_id,
              price: item.product_price,
              title: item.product_title,
              quantity: item.quantity,
            })),
          createdAt: parsedData[0]?.created_at,
        };

        resolve(parse(cartWithProductsSchema, data));
      },
    );
  });
}

export function addCart(): Promise<{ id: number }> {
  return new Promise((resolve, reject) => {
    db.run(`INSERT INTO cart (created_at) VALUES (julianday('now'))`, function callback(error) {
      if (error) {
        reject(error);
      }

      resolve({
        id: this.lastID,
      });
    });
  });
}

export async function addProductToCart(data: { cartId: number; product: Product }): Promise<void> {
  return new Promise((resolve, reject) => {
    db.run(
      `
        INSERT INTO cart_products(cart_id, product_id, product_title, product_price, quantity) 
        VALUES (?,?,?,?,1);`,
      [data.cartId, data.product.id, data.product.title, data.product.price],
      function callback(error) {
        if (error) {
          reject(error);
        }

        resolve();
      },
    );
  });
}

export async function deleteProductFromCart(data: {
  cartId: number;
  productId: number;
}): Promise<void> {
  return new Promise((resolve, reject) => {
    db.run(
      `
        DELETE FROM cart_products
        WHERE cart_id = ? AND product_id = ?;`,
      [data.cartId, data.productId],
      function callback(error) {
        if (error) {
          reject(error);
        }

        resolve();
      },
    );
  });
}

export async function updateProductQuantityInCart(data: {
  cartId: number;
  productId: number;
  quantity: number;
}): Promise<void> {
  return new Promise((resolve, reject) => {
    db.run(
      `
        UPDATE cart_products
        SET quantity = ?
        WHERE cart_id = ? AND product_id = ?;
      `,
      [data.quantity, data.cartId, data.productId],
      function callback(error) {
        if (error) {
          reject(error);
        }

        resolve();
      },
    );
  });
}
