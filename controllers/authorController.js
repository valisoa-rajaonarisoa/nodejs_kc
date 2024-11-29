import { getAllAuthors, createAuthor, updateAuthor, deleteAuthor, getUniqueAuthor } from '../models/authorModel.js';
  
  export const getAuthors = async (req, res) => {
    try {
      const [rows] = await getAllAuthors();
      res.json(rows);
    } catch (err) {
      console.error('Erreur lors de la récupération des auteurs :', err.message);
      res.status(500).json({ error: 'Erreur interne du serveur' });
    }
  };

  export const getAuthor = async (req, res) => {
    
      const { id } = req.body;

      if (!id) {
        return req.status(400).json({error: 'Id introuvable'});

      }

      try {
        const [result] = await getUniqueAuthor();
        res.status(200).json({message: 'Auteur affiché avec succès'});
      } catch(err) {
        console.error("Erreur lors de la récupération de l'auteur :", err.message);
        res.status(500).json({ error: 'Erreur interne du serveur' });
      }

    }
  
  export const addAuthor = async (req, res) => {
    const { name, profile } = req.body;
  
    if (!name || !profile) {
      return res.status(400).json({ error: 'Tous les champs sont obligatoires' });
    }
  
    try {
      const [result] = await createAuthor({ name, profile });
      res.status(201).json({ message: 'Auteur créé avec succès' });
    } catch (err) {
      console.error('Erreur lors de l’ajout de l’auteur :', err.message);
      res.status(500).json({ error: 'Erreur interne du serveur' });
    }
  };
  
  export const updateAuthorById = async (req, res) => {
    const { id } = req.params;
    const { name, profile } = req.body;
  
    if (!name || !profile) {
      return res.status(400).json({ error: 'Tous les champs sont obligatoires' });
    }
  
    try {
      const [result] = await updateAuthor(id, { name, profile });
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Auteur introuvable' });
      }
      res.json({ message: 'Auteur mis à jour avec succès' });
    } catch (err) {
      console.error('Erreur lors de la mise à jour de l’auteur :', err.message);
      res.status(500).json({ error: 'Erreur interne du serveur' });
    }
  };
  
  export const deleteAuthorById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const [result] = await deleteAuthor(id);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Auteur introuvable' });
      }
      res.json({ message: 'Auteur supprimé avec succès' });
    } catch (err) {
      console.error('Erreur lors de la suppression de l’auteur :', err.message);
      res.status(500).json({ error: 'Erreur interne du serveur' });
    }
  };
  