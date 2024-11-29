// keycloakService.js
import axios from 'axios';

// Fonction pour  recuper les groupes 
export const getGroupsFromKeycloak = async (token) => {
  try {
 
    // ********************* recuperer les groupe 
    const groups = await axios.get('http://localhost:8080/admin/realms/secure_apk/groups', {
      headers: {
        Authorization: `Bearer ${token}`, // Ajoute le token à l'en-tête d'autorisation
      },
    });

    // ****** on retoune les deux data dans un tableaux 
    return [groups.data]; // Retourne les données des utilisateurs
  } catch (error) {
    throw new Error('Erreur lors de la récupération des utilisateurs de Keycloak'); // Gère les erreurs
  }
};