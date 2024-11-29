import pool from '../db/db.js';

export const getAllPosts = async () => {
  return pool.query('SELECT * FROM post p INNER JOIN author a ON a.id=p.idAuth WHERE p.isvalide=1');
};

export const getAllPostsAdmin = async () => {
  return pool.query('SELECT * FROM post p INNER JOIN author a ON a.id=p.idAuth');
};

export const createPost = async (title, description, idAuth ,isvalide) => {
  return pool.query(
    'INSERT INTO post (title, description, idAuth, isvalide) VALUES (?, ?, ?, ?)',
    [title, description, idAuth, isvalide]
  );
};

export const updatePost = async (id, { title, profile, idAuth, isvalide }) => {
  return pool.query(
    'UPDATE post SET title = ?, profile = ? , idAuth = ? , isvalide = ? WHERE id = ?',
    [title, profile, idAuth, isvalide]
  );
};

export const deletePost = async (id) => {
  return pool.query('DELETE FROM post WHERE id = ?', [id]);
};


