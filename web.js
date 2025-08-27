import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8000;

// Permet de servir le dossier public
app.use(express.static(path.join(__dirname, "public")));

// Route par défaut → index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Serveur web REL-MD-BOT lancé sur le port ${PORT}`);
});
