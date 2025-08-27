# On part de l'image Node.js officielle
FROM node:20-bullseye-slim

# Installer ffmpeg et git
RUN apt-get update && apt-get install -y \
    ffmpeg \
    git \
    && rm -rf /var/lib/apt/lists/*

# Copier le projet local dans le conteneur
WORKDIR /rel_bot
COPY . .

# Installer toutes les dépendances du package.json
RUN npm install

# Installer node-cache spécifiquement pour éviter l'erreur
RUN npm install node-cache

# Exposer le port utilisé par ton bot
EXPOSE 8000

# Commande pour lancer ton bot
CMD ["npm", "run", "start"]
