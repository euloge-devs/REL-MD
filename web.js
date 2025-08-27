const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

// Sert le dossier public (quel que soit le nom/casse)
app.use(express.static(path.resolve(__dirname, 'public')));

// Route d'accueil robuste
app.get("/", (req, res) => {
  const indexPath = path.resolve(__dirname, "public/index.html");
  console.log("Chemin index.html :", indexPath); // Debug
  res.sendFile(indexPath);
});

app.listen(port, () => {
  console.log("Serveur web REL-MD-BOT lancé sur le port " + port);
});