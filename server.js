import app from './app.js';

const PORT = process.env.PORT || 7007;

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});

