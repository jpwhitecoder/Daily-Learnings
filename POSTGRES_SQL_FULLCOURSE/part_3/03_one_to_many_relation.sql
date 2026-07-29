-- one parent rows can have many child rows
-- one user can write many posts
-- but onepost will always belong to one user

-- users ==> parnt table
-- posts ==> child table

-- post.user_id => user.id
-- users.id is the original user id
-- posts.user_id stores that original user id inside the posts table

SELECT 
    users.name AS author_name,
    posts.title AS post_title,
    post.status
FROM users
INNER JOIN posts ON users.id = posts.user_id 
ORDER BY users.name, posts.title;