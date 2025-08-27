const { makeInMemoryStore } = require('@whiskeysockets/baileys');
const { default: Pino } = require('pino');

// 🧠 Store en mémoire avec logs stylisés
const store = makeInMemoryStore({ logger: Pino({ level: 'silent' }) });

// 🔁 Synchronisation avec les événements
store.readFromFile('./session/store.json'); // fichier de persistance
setInterval(() => {
  store.writeToFile('./session/store.json');
}, 10_000); // sauvegarde toutes les 10 secondes

module.exports = { store };
