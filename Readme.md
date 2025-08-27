<h1 align="center">REL-MD-BOT</h1>

<p align="center">
  <img alt="rel-md-banner" src="https://files.catbox.moe/4vhd5w.png" />
</p>

<p align="center">
  Bot WhatsApp multi-appareil, rapide à déployer, stylé et prêt pour la prod.  
  ⭐ Laisse une étoile pour soutenir le projet !
</p>

<p align="center">
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-green.svg?style=flat-square" alt="MIT License" />
  </a>
  <a href="https://github.com/WhiskeySockets/Baileys">
    <img src="https://img.shields.io/badge/Baileys-Web%20API-orange?style=flat-square" alt="Using Baileys Web API" />
  </a>
  <a href="https://github.com/euloge-devs/REL-MD-BOT/stargazers">
    <img src="https://img.shields.io/github/stars/euloge-devs/REL-MD-BOT?style=flat-square" alt="Stars" />
  </a>
  <a href="https://github.com/euloge-devs/REL-MD-BOT/network/members">
    <img src="https://img.shields.io/github/forks/euloge-devs/REL-MD-BOT?style=flat-square" alt="Forks" />
  </a>
</p>

---

## ⚡ Fonctionnalités

- 🔄 Multi-device avec Baileys
- 📸 Scan QR rapide et sécurisé
- 🧠 Session logic personnalisée
- 🧼 Branding Carrel-devs intégré
- 🚀 Déploiement instantané (Koyeb, Render, Heroku, Panel)
- 🛡️ Sécurité renforcée via `.env` et gestion des variables
- 📦 Base de données Supabase ou autre
- 🎨 Stickers personnalisés avec nom d’auteur

---

<details>
  <summary>🚀 Déploiement rapide</summary>

### 🧬 Étape 1 : Fork du dépôt  
👉 [Fork ici](https://github.com/euloge-devs/REL-MD/fork)

### 🔐 Étape 2 : Générer une SESSION ID  
Conserve-la dans un endroit sécurisé.

- [Session ID 1]()
- [Session ID 2]()
- [Session ID 3]()

### 🗄️ Étape 3 : Créer une base de données  
👉 [Supabase](https://supabase.com) ou autre

### 🚀 Étape 4 : Déployer

#### Koyeb  
[Déployer sur Koyeb](https://app.koyeb.com/deploy?type=git&name=rel-md&repository=https%3A%2F%2Fgithub.com%2Feuloge-devs%2FREL-MD-BOT&branch=main&builder=dockerfile&env%5BPREFIXE%5D=%F0%9F%97%BF&env%5BNOM_OWNER%5D=Carrel%20Euloge&env%5BNUMERO_OWNER%5D=229xxxxxxxx&env%5BMODE%5D=public&env%5BSESSION_ID%5D=rel-md-session&env%5BDATABASE%5D=&env%5BLEVEL_UP%5D=non&env%5BSTICKER_PACK_NAME%5D=Wa-sticker&env%5BSTICKER_AUTHOR_NAME%5D=REL-MD&instance_type=free)

#### Render  
👉 [Déployer sur Render](https://dashboard.render.com/web/new)

#### Heroku  
👉 [Déployer sur Heroku](https://dashboard.heroku.com/new?template=https://github.com/euloge-devs/REL-MD)

#### Panel / VPS  
- Clone le repo
- Ajoute ton fichier `.env`
- Lance `index.js` ou `main.js`

#### GitHub Actions  
- Ajoute `.env`
- Crée `.github/workflows/deploy.yml`

</details>

---

<details>
  <summary>📝 Exemple de fichier .env</summary>

```env
PREFIXE=🗿
NOM_OWNER=Carrel Euloge
NUMERO_OWNER=229xxxxxxxx
MODE=public
SESSION_ID=rel-md-session
DATABASE=
LEVEL_UP=non
STICKER_PACK_NAME=Wa-sticker
STICKER_AUTHOR_NAME=REL-MD-BOT
RENDER_API_KEY=
