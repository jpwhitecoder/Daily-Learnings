INSERT INTO products (
    name, category, price, stock, sku, description
)
VALUES(
    'T shirt',
    'clothing',
    '500.00',
    23,
    'CLOTH-KEY-001',
    'This is the cotton made t shirt'
),
(
    'Redmi Note 12',
    'electronics',
    '12000.00',
    23,
    'ELEC-KEY-003',
    'You can enjoy wide camera shutter'
),
(
    'Tripod',
    'Photogoraphy',
    '2000.00',
    23,
    'PHO-KEY-002',
    'Easy to carry anywhere you want to go'
);


SELECT * FROM products
WHERE sku IN ('ELEC-KEY-003','ELEC-KEY-003','PHO-KEY-002');