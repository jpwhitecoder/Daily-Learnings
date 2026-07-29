
DROP TABLE IF EXISTS basics.products_basic;

CREATE TABLE basics.products_basic(

    id SERIAL PRIMARY KEY,

    -- STRING  => MAX LENGTH OF 100 CHARACTERS
    name VARCHAR(100) NOT NULL,

    description TEXT,

    stock INTEGER DEFAULT 0,

    -- STORE LARGER WHOLE NUMBER THAN INTEGER
    total_views BIGINT DEFAULT 0,

    -- EXACT DECIMAL VALUES 
    -- 10 ==> MEANS TOTAL DIGITS
    -- 2 MEANS ==> DIGITS AFTER THE DECIMAL POINT , 99999.99

    price NUMERIC(10,2),

    is_active BOOLEAN DEFAULT true

);

--queries 

INSERT INTO basics.products_basic (name, description, stock, total_views, price, is_active)
VALUES 
('product 1','product description of product 1',45,2543234, 100.50,true),
('product 2', 'description of product 2', 20, 6766, 25, false);

SELECT * FROM basics.products_basic;

SELECT id,name, description FROM basics.products_basic
WHERE is_active;

