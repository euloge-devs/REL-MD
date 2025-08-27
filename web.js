const express = require("express");
const QRCode = require("qrcode");
const path = require("path");
const pino = require("pino");
const NodeCache = require("node-cache");
const {
  default: makeWASocket,
  makeCacheableSignalKeyStore,
  Browsers,
  fetchLatestBaileysVersion,
  useMultiFileAuthState
} = require("@whiskeysockets/baileys");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const qrCodes = new Map(); // Map numéro => dernier QR code
const sessions = new Map(); // Map numéro => socket instance

// Page d'accueil stylisée
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Génération de session WhatsApp réelle et QR code via Baileys
app.post("/generate-session", async (req, res) => {
  let numero = req.body.numero || req.query.numero;
  if (!numero) {
    return res.json({ success: false, message: "Numéro manquant" });
  }
  numero = numero.trim();

  // Si une session existe déjà, on ne la relance pas
  if (sessions.has(numero)) {
    return res.json({ success: true, sessionId: numero });
  }

  // Dossier d'auth dédié par numéro
  const sessionDir = path.join(__dirname, "auth", numero);
  const msgRetryCounterCache = new NodeCache();

  // Création de la session WhatsApp
  try {
    const { state, saveCreds } = await useMultiFileAuthState(sessionDir);
    const { version } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({
      version,
      auth: {
        creds: state.creds,
        keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "silent" }))
      },
      logger: pino({ level: "silent" }),
      keepAliveIntervalMs: 10000,
      browser: Browsers.ubuntu('Chrome'),
      msgRetryCounterCache,
      syncFullHistory: false,
      getMessage: async () => undefined
    });

    // Gestion du QR code
    sock.ev.on("connection.update", async update => {
      if (update.qr) {
        qrCodes.set(numero, update.qr);
      }
      if (update.connection === "open") {
        console.log(`✅ Session WhatsApp connectée pour ${numero}`);
      }
    });
    sock.ev.on("creds.update", saveCreds);

    sessions.set(numero, sock);

    // On attend que le QR soit généré (max 10s)
    let tries = 0;
    while (!qrCodes.get(numero) && tries < 20) {
      await new Promise(r => setTimeout(r, 500));
      tries++;
    }

    if (qrCodes.get(numero)) {
      return res.json({ success: true, sessionId: numero });
    } else {
      return res.json({ success: false, message: "QR code non généré, réessayez." });
    }
  } catch (err) {
    return res.json({ success: false, message: "Erreur Baileys : " + err.message });
  }
});

// Affichage du QR code pour un numéro donné
app.get("/qr", async (req, res) => {
  const numero = req.query.numero;
  if (!numero || !qrCodes.has(numero)) {
    return res.send(`<html><body style="color:#fff;background:#121212;text-align:center;">Aucun QR code pour ce numéro.<br><a href="/">Retour</a></body></html>`);
  }
  const qr = qrCodes.get(numero);
  const qrDataUrl = await QRCode.toDataURL(qr);
  res.send(`
    <html><body style="background:#121212;color:#fff;text-align:center;">
    <h2>Scannez ce QR code avec WhatsApp</h2>
    <img src="${qrDataUrl}" style="width:250px;height:250px;" />
    <p>Code brut : <code>${qr}</code></p>
    <a href="/">Retour</a>
    </body></html>
  `);
});

app.listen(port, () => {
  console.log("Serveur web REL-MD-BOT lancé sur le port " + port);
});