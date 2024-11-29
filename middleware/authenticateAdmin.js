import dotenv from 'dotenv'; // Importer dotenv
dotenv.config(); // Charger les variables d'environnement

import jwtmod from "jsonwebtoken"; // Importation du module 'jsonwebtoken'.

export default async (req, res, next) => { // Export d'une fonction middleware asynchrone
    const bearerHeader = req.headers["Authorization"]; // Extraction de l'en-tête 'Authorization' de la requête.

    const token = bearerHeader && bearerHeader.split(" ")[1]; // Récupérer le token JWT.
    
    if (token === null) return res.sendStatus(401); // Si le token est `null`, renvoie un statut 401.
    
    const public_key = process.env.PUBLIC_KEY.replace(/\\n/g, '\n'); // Format correct de la clé publique



    console.log(token); //******************voir token 
    
    try {
        // Vérification du token
        const decodedToken = jwtmod.verify(token, public_key, {
            algorithms: ["RS256"]
        });

       // Vérifier si l'utilisateur a le rôle 'role-admin'
       if (decodedToken.realm_access && decodedToken.realm_access.roles.includes('role-admin')) {
        next(); // L'utilisateur a le rôle 'membre', passe à la prochaine middleware ou route
    } else {
        return res.sendStatus(401); // L'utilisateur n'a pas le rôle 'membre', renvoie un statut 401
    }
    } catch (err) {
        console.error(err); // Affiche l'erreur dans la console
        res.sendStatus(403); // Si la vérification échoue, renvoie un statut 403 (Forbidden)
    }
};
