
-- limit =>  how many rows you want to return
-- Offset => How many rows we want to skip


-- limit is 5 so only show the first 5 rows
SELECT name, price, category FROM products
ORDER BY name ASC
LIMIT 5;


-- offset -> SKIP FIRST 5 ROWS AND GIVE THE NEXT 5 ROWS
-- used for pagination

SELECT name, price, category FROM products
ORDER BY name ASC
LIMIT 5 OFFSET 5;