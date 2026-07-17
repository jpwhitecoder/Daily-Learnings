
-- IS NULL 
-- description = NULL ( IT IS WRONG)
SELECT name, category, price, description FROM products 
WHERE description IS NULL;

-- NOT NULL
SELECT name, category, price, description FROM products 
WHERE description IS  NOT NULL;

SELECT name, category, price, description,is_active FROM products 
WHERE description IS NOT NULL AND is_active='true' AND price > 10000;