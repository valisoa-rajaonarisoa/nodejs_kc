import express from 'express';
import { getPosts, addPost, updatePostById, deletePostById, getPostsAllAdmin } from '../controllers/postController.js'
import authenticateAdmin from '../../back/authenticateAdmin.js';
import authenticateMembre from '../../back/authenticateMembre.js';
// import authenticateAdmin from '../middleware/authenticateAdmin.js';

const routePost = express.Router();

routePost.get('/', getPosts); //accessible pour tout le monde

routePost.get('/admin', authenticateAdmin, getPostsAllAdmin); //accessible uniquement par l'admin
routePost.post('/admin', authenticateAdmin, addPost);
routePost.put('/admin:id', authenticateAdmin, updatePostById);
routePost.delete('/admin:id', authenticateAdmin, deletePostById);


routePost.post('/membre', authenticateMembre, addPost);
routePost.put('/membre:id', authenticateMembre, updatePostById);
routePost.delete('/membre:id', authenticateMembre, deletePostById);

export default routePost;
