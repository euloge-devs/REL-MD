const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

// Pour servir le fichier index.html à la racine
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Exemple de route API (à compléter plus tard)
app.get("/api/ping", (req, res) => {
  res.json({ pong: true });
});

app.listen(port, () => {
  console.log("Serveur web REL-MD-BOT lancé sur le port " + port);
});