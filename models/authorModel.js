import pool from '../db/db.js';

export const getAllAuthors = async () => {
  return pool.query('SELECT * FROM author');
};

// Fonction pour récupérer un auteur unique par son ID
export const getUniqueAuthor = async (id) => {
  try {
    const [rows] = await pool.query('SELECT * FROM author WHERE id = ?', [id]); // Corrige la requête SQL
    return rows; // Retourne les résultats
  } catch (error) {
    console.error("Erreur lors de la récupération de l'auteur :", error.message);
    throw new Error('Impossible de récupérer l\'auteur.');
  }
};


export const createAuthor = async ({id, name, profile }) => {
  
  return pool.query(
    'INSERT INTO author (id, name, profile) VALUES (?, ?, ?)',
    [id, name, profile]
  );
};

export const updateAuthor = async (id, { name, profile }) => {
  return pool.query(
    'UPDATE author SET name = ?, profile = ? WHERE id = ?',
    [name, profile]
  );
};

export const deleteAuthor = async (id) => {
  return pool.query('DELETE FROM author WHERE id = ?', [id]);
};
