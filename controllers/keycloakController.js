import { getUsersFromKeycloak } from "../service/serviceGetUsers.js";
import { getUniqueUser} from "../service/serviceGetUniqueUser.js";
import { getGroupsFromKeycloak } from "../service/serviceGetGroups.js";
import { changeUserGroupFromKeycloak } from "../service/serviceChangeUserGroup.js";


// ****** recuperation des users 
export const getUsers = async (req, res) => {
    
    try {
        const bearerHeader = req.headers["authorization"]; 
        const token = bearerHeader && bearerHeader.split(" ")[1]; // Récupérer le token JWT.
      

        const users = await getUsersFromKeycloak(token);
        res.json(users); 

    } catch (error) {
        res.status(500).json({ message: error.message }); // Gère les erreurs
    }
}

// ***********recuperer un users 
export const getUser= async(req,res)=>{
    try {
        // Vérification et extraction du token
        const bearerHeader = req.headers["authorization"];
        const token = bearerHeader && bearerHeader.split(" ")[1]; // Récupérer le token JWT.
    
        // Récupération de l'ID utilisateur depuis les paramètres
        const { id } = req.params;
    
        // Fonction pour récupérer un utilisateur de Keycloak
        const user = await getUniqueUser(token, id);
    
        if (!user) {
          return res.status(404).json({ message: "Utilisateur non trouvé." });
        }
    
        res.json(user);
      } catch (error) {
        console.error("Erreur lors de la gestion de l'utilisateur :", error);
        res.status(500).json({ message: error.message }); // Gérer les erreurs
    }
}


// **********recuperer tout les groupes
export const getGroups= async(req,res)=>{
    try {
        const bearerHeader = req.headers["authorization"]; 
        const token = bearerHeader && bearerHeader.split(" ")[1]; // Récupérer le token JWT.
      
        const groupes= await getGroupsFromKeycloak(token);
        res.json(groupes); 
      } catch (error) {
        res.status(500).json({ message: error.message }); // Gère les erreurs
      }
}


// ****************changer le groupe d'un users 
export const getChangeUserGroup= async(req,res)=>{
    try {
        // Vérification et extraction du token
        const bearerHeader = req.headers["authorization"];
        const token = bearerHeader && bearerHeader.split(" ")[1]; // Récupérer le token JWT.
    

        //recuperation des paramatre 
        const { userId, groupId } = req.params;
    
        // Fonction pour récupérer un utilisateur de Keycloak
        const user = await changeUserGroupFromKeycloak(token, userId,groupId);
    
        if (!user) {
          return res.status(404).json({ message: "Utilisateur non trouvé." });
        }
    
        res.json(user);
      } catch (error) {
        console.error("Erreur lors de la gestion de l'utilisateur :", error);
        res.status(500).json({ message: error.message }); // Gérer les erreurs
    }
}