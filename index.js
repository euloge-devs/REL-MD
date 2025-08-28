const express = require('express')
const path = require('path')
const { generateSession } = require('./bot')

const app = express()
const PORT = process.env.PORT || 8000

// servir le dossier public
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())

// API pour générer QR ou code
app.get('/generate', async (req, res) => {
  const { method, phone } = req.query
  try {
    const session = await generateSession(method, phone)
    res.json(session)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.listen(PORT, () => {
  console.log(`✅ Serveur en ligne sur le port ${PORT}`)
})
