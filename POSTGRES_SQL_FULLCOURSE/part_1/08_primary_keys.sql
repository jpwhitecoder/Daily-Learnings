DROP TABLE IF EXISTS basics.sales;

CREATE TABLE basics.sales (

    id SERIAL PRIMARY KEY,

    title TEXT NOT NULL,

    price NUMERIC(10,2) NOT NULL DEFAULT 0,

    created_at TIMESTAMP DEFAULT NOW()

);

INSERT INTO basics.sales (title, price)
VALUES('SALE 1',200),
('SALE 2', 240);



INSERT INTO basics.sales (id, title, price)
VALUES(2,'SALE 2',400);

SELECT * FROM  basics.sales;

