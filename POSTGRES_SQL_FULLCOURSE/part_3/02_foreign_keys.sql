-- foreign key is a col that points to the primary key of another table
-- user.id - parent key
-- posts.user_id - foreign key

SELECT id,name FROM users;

SELECT id,user_id, title FROM posts;