const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

// Sert tout le dossier public
app.use(express.static(path.join(__dirname, 'public')));

// ...tes routes API...

// Route d'accueil (optionnelle si tu utilises express.static)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
  console.log("Serveur web REL-MD-BOT lancé sur le port " + port);
});