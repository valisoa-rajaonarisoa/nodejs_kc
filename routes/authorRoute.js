import express from 'express';
import { getAuthors, addAuthor, updateAuthorById, deleteAuthorById } from '../controllers/authorController.js'
import authenticateAdmin from '../../back/authenticateAdmin.js';
// import authenticateAdmin from '../middleware/authenticateAdmin.js';

const routeAuthor = express.Router();

routeAuthor.get('/', authenticateAdmin, getAuthors);
routeAuthor.post('/', authenticateAdmin, addAuthor);
routeAuthor.put('/:id', authenticateAdmin, updateAuthorById);
routeAuthor.delete('/:id', authenticateAdmin,deleteAuthorById);
export default routeAuthor;
