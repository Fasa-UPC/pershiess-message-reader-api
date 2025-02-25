const MessagesServices = require("../../services/v1/messages.services");

class MessagesController {
  static async getAllMessages(req, res) {
    const { username, password } = req.query;
    
    try {
      const messages = await MessagesServices.getAllMessages(
        username,
        password
      );

      res.status(200).json(messages);
    } catch (error) {
      // TODO: Log errors
      res.status(500).json({});
    }
  }
}

module.exports = MessagesController;
