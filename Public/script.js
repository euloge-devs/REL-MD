document.addEventListener("DOMContentLoaded", () => {
    const qrContainer = document.getElementById("qr-container");
    const pairingContainer = document.getElementById("pairing-container");
    const pairingCode = document.getElementById("pairing-code");

    // Fonction pour demander le QR au serveur
    async function getQr() {
        qrContainer.innerHTML = "<p>Chargement du QR code...</p>";
        try {
            const res = await fetch("/generate-qr");
            const data = await res.json();

            if (data.qr) {
                qrContainer.innerHTML = `<img src="${data.qr}" alt="QR Code WhatsApp" />`;
            } else {
                qrContainer.innerHTML = "<p>Impossible de générer le QR code.</p>";
            }
        } catch (err) {
            console.error(err);
            qrContainer.innerHTML = "<p>Erreur de connexion au serveur.</p>";
        }
    }

    // Fonction pour demander le Pairing Code au serveur
    async function getPairing() {
        pairingContainer.innerHTML = "<p>Chargement du code...</p>";
        try {
            const res = await fetch("/generate-pairing");
            const data = await res.json();

            if (data.code) {
                pairingCode.textContent = data.code;
            } else {
                pairingContainer.innerHTML = "<p>Impossible de générer le code.</p>";
            }
        } catch (err) {
            console.error(err);
            pairingContainer.innerHTML = "<p>Erreur de connexion au serveur.</p>";
        }
    }

    // Déclenche automatiquement les appels
    getQr();
    getPairing();
});
