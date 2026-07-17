-- AND => Every condition must be true
-- OR ==> atleast one condition must be true
-- NOT ==> reverse/exclude a condition

--AND
SELECT name, category, price FROM products
WHERE category='electronics' AND price > 1000;

--OR
SELECT name, category FROM products
WHERE category='electronics' OR  category='furniture';

--NOT

SELECT name, category, price FROM products
WHERE NOT category = 'stationery';

SELECT name, category,price, stock FROM products
WHERE (category='electronics' OR  category='furniture') AND stock < 10;