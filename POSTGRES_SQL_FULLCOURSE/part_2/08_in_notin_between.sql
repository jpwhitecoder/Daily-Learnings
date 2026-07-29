
-- list the data in the furniture and electronics category 
SELECT name, category, price FROM products 
WHERE category IN ('furniture','electronics');


-- Except furniture and electronics category 
SELECT name, category, price FROM products 
WHERE category NOT IN ('furniture','electronics');



-- BETWEEN 2000 AND 5000 / It includes 2000 and 5000 as well like >=2000 to <=5000
SELECT name, category, price FROM products 
WHERE price BETWEEN 2000 AND 5000;