async function notifyAdmin(message) {
  const webhookUrl = "";
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

// export if needed elsewheremodule.exports = { notifyAdmin };
