import express from 'express';
import routeAuthor from './routes/authorRoute.js';
import routePost from './routes/postRoute.js';
import routeKeycloak from './routes/keycloakRoute.js';
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3002', // ORIGIN dans le fichier .env
    methods: ['GET', 'POST'], // Méthodes autorisées
    credentials: true,        // Autorise les cookies dans les requêtes
}));


// Routes
app.use('/api/auteur', routeAuthor);
app.use('/api/post', routePost);

app.use('/api/kc',routeKeycloak);

export default app;
