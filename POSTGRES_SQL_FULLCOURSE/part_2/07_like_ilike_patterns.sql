-- like case sensitive pattern match
-- ilike - case insensitive pattern match
-- %means any no of chars
-- exactly one character


-- anything can after the % But Start with No. and case sensitive

SELECT name, category, price FROM products
WHERE name LIKE 'No%';

-- Ilike it is NOT case insensitive others same
SELECT name, category, price FROM products
WHERE name ILIKE 'No%';

-- NOW NO CASE SENSITIVE AND NOT ONLY CHECK STARING OR ENDING .
-- Anywhere "no" is there in the name it takes it 
SELECT name, category, price FROM products
WHERE name ILIKE '%No%'

SELECT name, category, price FROM products 
WHERE name LIKE 'Off%';

SELECT name, category, price, description FROM products
WHERE name ILIKE '%No%' OR description ILIKE '%NO%';