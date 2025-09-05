async function notifyAdmin(message) {
  const webhookUrl =
    "https://msggroup.webhook.office.com/webhookb2/9e2af4a9-d92d-4aba-b11a-025076003d5f@763b2760-45c5-46d3-883e-29705bba49b7/IncomingWebhook/dbc74eb7e8c2451a997fed49996baa21/dc3c2c6c-5e76-4c21-b5f2-5d3635b6a3ef/V24hz_PYnyQmMImTDPA6OSwxSdY4rradHH2_bep15IgFo1";
  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: `🔔 Notification:\n${message}` }),
    });
    if (!res.ok) {
      console.error("Failed to send notification:", res.status, res.statusText);
    } else {
      console.log("✅ Notification sent to Teams");
    }
  } catch (err) {
    console.error("Error sending webhook notification:", err);
  }
}