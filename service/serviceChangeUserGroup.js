// keycloakService.js
import axios from 'axios';

// Fonction pour changer le groupe d'un utilisateur dans Keycloak
export const changeUserGroupFromKeycloak = async (token, userId, groupId) => {
  try {
    // Requête PUT pour attribuer un groupe à un utilisateur
    await axios.put(
      `http://localhost:8080/admin/realms/secure_apk/users/${userId}/groups/${groupId}`,
      {}, 
      {
        headers: {
          Authorization: `Bearer ${token}`, // Ajoute le token à l'en-tête d'autorisation
        },
      }
    );

    return { message: 'Groupe attribué avec succès.' };
  } catch (error) {
    console.error('Erreur lors de la modification du groupe dans Keycloak :', error.message);
    throw new Error('Erreur lors de la modification du groupe dans Keycloak'); // Gère les erreurs
  }
};
