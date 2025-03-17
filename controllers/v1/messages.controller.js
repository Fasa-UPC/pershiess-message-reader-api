const MessagesServices = require("../../services/v1/messages.services");

class MessagesController {
  static async getAllMessages(req, res) {
    const { username, password } = req.query;

    try {
      const messages = await MessagesServices.getAllMessages(
        username,
        password
      );

      if (!messages) {
        res.status(401).json({});
        return;
      }

      res.status(200).json(messages);
    } catch (error) {
      // TODO: Log errors
      res.status(500).json({});
    }
  }

  static async getMessageById(req, res) {
    const { username, password } = req.query;
    const { id: msgId } = req.params;

    try {
      const message = await MessagesServices.getMessageById(
        username,
        password,
        msgId
      );

      if (!message) {
        res.status(401).json({});
        return;
      }

      res.status(200).json(message);
    } catch (error) {
      // TODO: Log errors
      res.status(500).json({});
    }
  }
}

module.exports = MessagesController;
