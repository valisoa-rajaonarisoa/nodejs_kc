
import dotenv from 'dotenv'; // Importer dotenv

import axios from 'axios';

// Fonction pour obtenir les utilisateurs depuis Keycloak
export const getUsersFromKeycloak = async (token) => {
  try {
    // *********************recuperer tout les users , sans role et groupe 
    const users = await axios.get(`${process.env.SERVER_KC}/admin/realms/${process.env.REALM}/users`, {
      headers: {
        Authorization: `Bearer ${token}`, // Ajoute le token à l'en-tête d'autorisation
      },
    });



    // *******assossier chaque user a un groupe , le groupe avec son id 
    let utilisateurs=[];

    for(let userObject of users.data)
    {
      // *****************enregistrement des info neccessaires 
      let person={
        id:userObject.id,
        username:userObject.username,
        firstname:userObject.firstName,
        lastname:userObject.lastName,
        email:userObject.email,
        status:userObject.enabled,
        group:null
      }

      // *********je parcours chaque user pour voir son groupe 

      // ********************* recuperer les groupe 
      const groups = await axios.get(`${process.env.SERVER_KC}/admin/realms/${process.env.REALM}/users/${userObject.id}/groups`, {
        headers: {
        Authorization: `Bearer ${token}`, // Ajoute le token à l'en-tête d'autorisation
      },
      });

      //si il y a un groupes, il va retourner un tableaux, si non il retourne un tableaux vide, si c'est vide alors le person.group rester null

      for(let group of groups.data)
      {
        person.group={
          id: group.id,
          name: group.name
        }
      }

      
      // *********je l'ajoute dans le tableaux utilisateurs
      utilisateurs.push(person);
    }



    // Retourne les données des utilisateurs
    return  utilisateurs; 
  } catch (error) {
    throw new Error('Erreur lors de la récupération des utilisateurs de Keycloak'); // Gère les erreurs
  }
};
