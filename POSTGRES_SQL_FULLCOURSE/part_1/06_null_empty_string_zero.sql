-- null - unknown/ missig value

-- empty string - Known string value but it contains no character

-- zero - actual numeric value of 0

DROP TABLE IF EXISTS basics.value_examples;

CREATE TABLE basics.value_examples(

    id SERIAL PRIMARY KEY,

    nickname TEXT,

    bio TEXT,

    score INTEGER

);


INSERT INTO basics.value_examples (nickname , bio, score)
VALUES 
(null, 'learning something',10),
('', 'empty nick name',20),
('name','',0),
('john',null,null);

SELECT * FROM basics.value_examples;

-- SELECT * FROM basics.value_examples WHERE nickname IS NULL;

-- SELECT * FROM basics.value_examples WHERE nickname='';

-- SELECT * FROM basics.value_examples WHERE nickname IS NOT NULL;

-- SELECT * FROM basics.value_examples WHERE nickname !='';
-- both are same

-- SELECT * FROM basics.value_examples WHERE nickname <> '';


SELECT * FROM basics.value_examples WHERE score = 0;