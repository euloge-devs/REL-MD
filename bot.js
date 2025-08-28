const {
  default: makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  makeCacheableSignalKeyStore
} = require('@whiskeysockets/baileys')
const P = require('pino')

async function generateSession(method, phoneNumber = null) {
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

  return new Promise((resolve, reject) => {
    sock.ev.on('connection.update', async (update) => {
      const { connection, qr } = update
      if (method === "qr" && qr) {
        resolve({ qr })
      }
      if (connection === 'open') resolve({ success: true })
    })

    if (method === "code" && !state.creds.registered) {
      sock.requestPairingCode(phoneNumber).then(code => {
        resolve({ code })
      }).catch(reject)
    }

    sock.ev.on('creds.update', saveCreds)
  })
}

module.exports = { generateSession }
