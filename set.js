// Charge les variables d'environnement
const dotenv = require('dotenv');
dotenv.config();

// Export des constantes de configuration
module.exports = {
  PREFIXE: process.env.PREFIXE || '.',          // Préfixe des commandes
  NOM_OWNER: process.env.NOM_OWNER || "Euloge",
  NUMERO_OWNER: process.env.NUMERO_OWNER || '',
  MODE: process.env.MODE || "public",           // Mode : public ou privé
  SESSION_ID: process.env.SESSION_ID || "rel", // Identifiant de session
  LEVEL_UP: process.env.LEVEL_UP || "non",     // Gestion du level up
  STICKER_PACK_NAME: process.env.STICKER_PACK_NAME || "Wa-sticker",
  STICKER_AUTHOR_NAME: process.env.STICKER_AUTHOR_NAME || "REL-MD",
  DATABASE: process.env.DATABASE,              // Connexion DB
  RENDER_API_KEY: process.env.RENDER_API_KEY,  // API key Render (si utilisée)
  REL_LANGUE: process.env.REL_LANGUE || 'fr',  // Langue du bot
  THEME: '1'                                   // Thème par défaut
};
