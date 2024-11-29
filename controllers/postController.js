import { createAuthor, getUniqueAuthor } from '../models/authorModel.js';
import { getAllPosts, createPost, updatePost, deletePost, getAllPostsAdmin } from '../models/postModel.js';
import jwtmod from "jsonwebtoken"; // Importation du module 'jsonwebtoken'.

  
  export const getPosts = async (req, res) => {
    try {
      const [rows] = await getAllPosts();
      res.json(rows);
    } catch (err) {
      console.error('Erreur lors de la récupération des posts :', err.message);
      res.status(500).json({ error: 'Erreur interne du serveur' });
    }
  };

  export const getPostsAllAdmin = async (req, res) => {
    try {
      const [rows] = await getAllPostsAdmin();
      
      const post={
        id: rows.id,
        title: rows.title,
        description: rows.description,
        date:rows.date,
        author: {
            id: rows.idAuth,
            name: rows.name,
            profilePic: rows.profile,
        },
        isValide:rows.profile
      }

      res.json(post)
    } catch (err) {
      console.error('Erreur lors de la récupération des posts :', err.message);
      res.status(500).json({ error: 'Erreur interne du serveur' });
    }
  };
  
  export const addPost = async (req, res) => {
    try {
      const bearerHeader = req.headers["authorization"];
      const token = bearerHeader && bearerHeader.split(" ")[1]; // Récupérer le token JWT
  
      const public_key = process.env.PUBLIC_KEY.replace(/\\n/g, "\n"); // Format correct de la clé publique
  
      const decodedToken = jwtmod.verify(token, public_key, {
        algorithms: ["RS256"],
      });
  
      // Vérification du rôle
      const isAuth =
        decodedToken.realm_access &&
        (decodedToken.realm_access.roles.includes("role-admin") ||
          decodedToken.realm_access.roles.includes("role-membre"));
  
      if (!isAuth) {
        return res.sendStatus(401); // L'utilisateur n'a pas les rôles requis
      }
  
      // Vérifier le type de rôle pour "isvalide"
      const isvalide = decodedToken.realm_access.roles.includes("role-admin") ? 1 : 0;
  
      // Récupération des informations de l'auteur
      const author = {
        id: decodedToken.sub,
        name: decodedToken.name,
        profile: decodedToken.email,
      };
  
      // Vérifier si l'utilisateur existe dans la base de données
      const isUserExist = await getUniqueAuthor(author.id);
  
      if (!isUserExist || isUserExist.length === 0) {
        // L'utilisateur n'existe pas, le créer
        const addAuthor = await createAuthor(author);
        if (addAuthor) {
          console.log("Auteur créé avec succès");
        }
      }
  
      // Validation des données du post
      const { title, description } = req.body;
  
      if (!title || !description) {
        return res.status(400).json({ error: "Tous les champs sont obligatoires" });
      }
  
      // Création du post
      const idAuth = decodedToken.sub; // ID de l'utilisateur (auteur)
      await createPost(title, description, idAuth, isvalide);
  
      // Réponse finale
      return res.status(201).json({ message: "Post créé avec succès" });
    } catch (error) {
      console.error("Erreur lors du traitement :", error.message);
      return res.status(500).json({ message: error.message }); // Gérer les erreurs
    }
  };
  
  
  export const updatePostById = async (req, res) => {
    const { id } = req.params;
    const { title, description, date, idAuth } = req.body;
  
    if (!title || !description, !date, !idAuth) {
      return res.status(400).json({ error: 'Tous les champs sont obligatoires' });
    }
  
    try {
      const [result] = await updatePost(id, { title, description, date, idAuth });
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Post introuvable' });
      }
      res.json({ message: 'Post mis à jour avec succès' });
    } catch (err) {
      console.error('Erreur lors de la mise à jour du post :', err.message);
      res.status(500).json({ error: 'Erreur interne du serveur' });
    }
  };
  
  export const deletePostById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const [result] = await deletePost(id);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Post introuvable' });
      }
      res.json({ message: 'Post supprimé avec succès' });
    } catch (err) {
      console.error('Erreur lors de la suppression du post :', err.message);
      res.status(500).json({ error: 'Erreur interne du serveur' });
    }
  };
  