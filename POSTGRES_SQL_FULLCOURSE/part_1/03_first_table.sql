

DROP TABLE IF EXISTS basics.students;

CREATE TABLE basics.students(
    -- SERIAL create an auto increment integer
    -- primary key ==> this cols uniquely identify each row 
    id SERIAL PRIMARY KEY,
    -- TEXT STRING DATA
    -- not null means this col requuired 
    -- if text value not present postgres going to reject
    name TEXT NOT NULL,
    -- UNIQUE MEANS NO  DUPLICATE OR ALL EMAILS OR UNIQUE , SAME EMAILS NOT PRESENT
    email TEXT NOT NULL UNIQUE,

    age INTEGER CHECK (age >= 18),
    
    -- TIMESTAMP => Stores date and time format 
    -- default means if you give any specific value it will store as default 

    created_at TIMESTAMP DEFAULT NOW ()

);

-- insert some data

INSERT INTO basics.students (name,email,age)
VALUES ('PRASATH','prasath@gmail.com',99),
('ram','ram@gmail.com', 43);

-- SELECT * FROM basics.students;
