INSERT INTO products (
    name, category, price, stock, sku, description
)
VALUES(
    'Laptop stand',
    'electronics',
    '5000.00',
    23,
    'ELEC-KEY-002',
    'This is the best laptop stand ever online'
);

SELECT * FROM products WHERE sku='ELEC-KEY-002';