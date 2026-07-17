
SELECT name, price, stock FROM products 
WHERE sku='ELEC-CAB-001';


UPDATE products 
SET stock = 20, price = 499.00
WHERE sku='ELEC-CAB-001';
