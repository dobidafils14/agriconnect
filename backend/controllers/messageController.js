const Message = require("../models/Message");

const sendMessage = (req, res) => {
  const { receiver_id, product_id, contenu } = req.body;
  if (!receiver_id || !contenu) {
    return res.status(400).json({ success: false, message: "Destinataire et message obligatoires." });
  }
  Message.create({ sender_id: req.user.id, receiver_id, product_id, contenu }, (err) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    res.json({ success: true, message: "Message envoyé." });
  });
};

const getMessages = (req, res) => {
  Message.findByUser(req.user.id, (err, results) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    res.json({ success: true, data: results });
  });
};

module.exports = { sendMessage, getMessages };