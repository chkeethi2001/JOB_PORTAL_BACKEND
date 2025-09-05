import ChatMessage from "../models/ChatMessage.js";

// Send message
export const sendMessage = async (req, res) => {
  try {
    const { applicationId, message } = req.body;
    const senderId = req.user._id; // coming from auth middleware

    const newMessage = await ChatMessage.create({
      applicationId,
      senderId,
      message,
    });

    res.status(201).json({ success: true, data: newMessage });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get messages for an application
export const getMessages = async (req, res) => {
  try {
    const { applicationId } = req.params;

    const messages = await ChatMessage.find({ applicationId })
      .populate("senderId", "name email")
      .sort({ createdAt: 1 });

    res.status(200).json({ success: true, data: messages });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
