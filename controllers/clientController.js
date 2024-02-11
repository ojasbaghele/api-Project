const Client = require('../models/Client');

const ClientController = {
  // Create a new client
  createClient: async (req, res) => {
    try {
      const { name, email, phone, companyId } = req.body;
      // Check if the company exists
      const existingClient = await Client.findOne({ where: { companyId } });
      if (existingClient) {
        return res.status(400).json({ error: 'Company already has a client' });
      }
      const client = await Client.create({ name, email, phone, companyId });
      return res.status(201).json({ client });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Update a client
  updateClient: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedFields = req.body;
      await Client.update(updatedFields, { where: { id } });
      const updatedClient = await Client.findByPk(id);
      return res.json({ client: updatedClient });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Get all clients
  getAllClients: async (req, res) => {
    try {
      const clients = await Client.findAll();
      return res.json({ clients });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Get clients by user
  getClientsByUser: async (req, res) => {
    try {
      const { userId } = req.params;
      const clients = await Client.findAll({
        where: { userId },
      });
      return res.json({ clients });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Get clients by name
  getClientsByName: async (req, res) => {
    try {
      const { name } = req.query;
      const clients = await Client.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`, // Case-insensitive search
          },
        },
      });
      return res.json({ clients });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
};

module.exports = ClientController;
