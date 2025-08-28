const express = require("express");
const path = require("path");
const { default: makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion, makeCacheableSignalKeyStore } = require("@whiskeysockets/baileys");
const P = require("pino");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

async function generateSession(method, phone) {
  const { state, saveCreds } = await useMultiFileAuthState("./session");
  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, P({ level: "silent" })),
    },
    logger: P({ level: "silent" }),
  });

  return new Promise((resolve, reject) => {
    sock.ev.on("connection.update", async (update) => {
      const { qr, connection } = update;
      if (method === "qr" && qr) {
        resolve({ qr });
      }
      if (connection === "open") {
        resolve({ success: true });
      }
    });

    if (method === "code" && phone) {
      sock.requestPairingCode(phone)
         .then((code) => resolve({ code }))
         .catch(reject);
    }

    sock.ev.on("creds.update", saveCreds);
  });
}

app.get("/generate", async (req, res) => {
  const { method, phone } = req.query;
  try {
    const session = await generateSession(method, phone);
    res.json(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
