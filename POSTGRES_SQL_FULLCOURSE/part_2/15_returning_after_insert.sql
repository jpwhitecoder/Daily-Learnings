-- returning usually returns back the rows immediately after insert, update & delete
INSERT INTO products (name, category, price, stock, sku, description) 
VALUES ('Web camera','electronics',2500.00,15,'ELEC-CAM-001','DESCRIPTION FOR THE BEST WEBCAMERA');
RETURNING id,name,category,price, stock, created_at;


UPDATE products SET stock = stock + 10
WHERE sku='ELEC-CAM-001'
RETURNING id, name, stock;


DELETE FROM products WHERE sku='ELEC-CAM-001'
RETURNING id, name, stock, category;