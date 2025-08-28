const { default: makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion, makeCacheableSignalKeyStore } = require('@whiskeysockets/baileys')
const P = require('pino')
const readline = require('readline')

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('./session')
    const { version } = await fetchLatestBaileysVersion()

    const sock = makeWASocket({
        version,
        logger: P({ level: 'silent' }),
        printQRInTerminal: true, // Affiche le QR directement dans le terminal
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, P({ level: 'silent' }))
        }
    })

    // Affiche QR code ou Pairing code
    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update

        if (qr) {
            console.log('🔑 Scannez ce QR Code avec WhatsApp !')
        }

        if (connection === 'open') {
            console.log('✅ Bot connecté avec succès !')
        } else if (connection === 'close') {
            console.log('❌ Connexion fermée, reconnexion...')
            startBot()
        }
    })

    // Mode Pairing Code (optionnel)
    if (!state.creds.registered) {
        const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
        rl.question('📱 Entrez votre numéro WhatsApp (ex: 229XXXXXXXX) : ', async (phoneNumber) => {
            try {
                const code = await sock.requestPairingCode(phoneNumber.trim())
                console.log(`📌 Votre code de jumelage est : ${code}`)
                rl.close()
            } catch (err) {
                console.error('Erreur lors du jumelage :', err)
                rl.close()
            }
        })
    }

    sock.ev.on('creds.update', saveCreds)
}

startBot()
