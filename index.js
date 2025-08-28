const {
    default: makeWASocket,
    useMultiFileAuthState,
    fetchLatestBaileysVersion,
    makeCacheableSignalKeyStore
} = require('@whiskeysockets/baileys')
const P = require('pino')
const readline = require('readline')

async function startBot(mode = "qr") {
    const { state, saveCreds } = await useMultiFileAuthState('./session')
    const { version } = await fetchLatestBaileysVersion()

    const sock = makeWASocket({
        version,
        logger: P({ level: 'silent' }),
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, P({ level: 'silent' }))
        }
    })

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update

        if (mode === "qr" && qr) {
            console.log("📸 Scannez ce QR Code avec WhatsApp :")
            console.log(qr) // Le QR sera affiché une seule fois proprement
        }

        if (connection === 'open') {
            console.log("✅ Bot connecté avec succès !")
        } else if (connection === 'close') {
            console.log("❌ Connexion fermée. Reconnexion...")
            startBot(mode)
        }
    })

    // Mode Pairing Code uniquement
    if (mode === "code" && !state.creds.registered) {
        const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
        rl.question("📱 Entrez votre numéro WhatsApp (ex: 229XXXXXXXX) : ", async (phoneNumber) => {
            try {
                const code = await sock.requestPairingCode(phoneNumber.trim())
                console.log(`🔑 Votre code de jumelage est : ${code}`)
                rl.close()
            } catch (err) {
                console.error("⚠️ Erreur lors du jumelage :", err)
                rl.close()
            }
        })
    }

    sock.ev.on('creds.update', saveCreds)
}

// --- Choix du mode ---
const mode = process.argv[2] || "qr" // par défaut QR
startBot(mode)
