
-- NOT NULL, UNIQUE , DEFAULT , CHECK 
-- APP

DROP TABLE IF EXISTS basics.accounts;

CREATE TABLE basics.accounts(
    id SERIAL PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    is_active BOOLEAN DEFAULT true,
    age INTEGER CHECK(age >= 18),
    created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO basics.accounts (full_name, email, age)
VALUES ('PRASATH', 'prasath@gmail.com', 20);

-- use duplicate email

-- INSERT INTO basics.accounts (full_name, email, age)
-- VALUES ('another name', 'prasath@gmail.com', 20);

-- below 18 age
INSERT INTO basics.accounts (full_name, email, age)
VALUES ('another name', 'prasath@gmail.com', 17);

-- INSERT INTO basics.accounts (email, age)
-- VALUES ('namemissing@gmail.com', 20);

SELECT * FROM basics.accounts;