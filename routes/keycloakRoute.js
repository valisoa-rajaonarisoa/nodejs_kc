import express from 'express';

import authenticateAdmin from '../../back/authenticateAdmin.js';

import { getChangeUserGroup, getGroups, getUser, getUsers } from '../controllers/keycloakController.js';
// import authenticateAdmin from '../middleware/authenticateAdmin.js';

const routeKeycloak = express.Router();


routeKeycloak.get('/users', authenticateAdmin, getUsers);//RECUPERER TOUT LES UTILISATEURS 

routeKeycloak.get('/users/:id', authenticateAdmin, getUser); //RECUPERER UN SEUL UTILISATEURS


routeKeycloak.get('/groups', authenticateAdmin, getGroups); //RECUPERER TOUT LES GROUPES


// *******CHANGER LE GROUPES D'UN USERS 
routeKeycloak.get('/users/:userId/groups/:groupId', authenticateAdmin, getChangeUserGroup); //RECUPERER TOUT LES GROUPES




export default routeKeycloak;
