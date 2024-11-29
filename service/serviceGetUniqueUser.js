// keycloakService.js
import axios from 'axios';

// Fonction pour obtenir les utilisateurs depuis Keycloak
export const getUniqueUser = async (token,UserId) => {
  try {

    // ********************* recuperer les groupe 
    const user = await axios.get(`http://localhost:8080/admin/realms/secure_apk/users/${UserId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Ajoute le token à l'en-tête d'autorisation
      },
    });

    
    return user.data; 
  } catch (error) {
    throw new Error('Erreur lors de la récupération des utilisateurs de Keycloak'); // Gère les erreurs
  }
};
