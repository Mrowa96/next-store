import { Database } from 'sqlite3';

export const db = new Database('./db.sqlite');

db.serialize(() => {
  db.run(
    `
    CREATE TABLE IF NOT EXISTS cart (
      id INTEGER NOT NULL PRIMARY KEY, 
      created_at REAL
    );
  `,
  ).run(
    `CREATE TABLE IF NOT EXISTS cart_products (
      id INTEGER NOT NULL PRIMARY KEY, 
      cart_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      product_title TEXT NOT NULL,
      product_price REAL NOT NULL,
      quantity INTEGER NOT NULL DEFAULT 0,
      FOREIGN KEY (cart_id)
        REFERENCES cart (id) 
    );`,
  );
});
