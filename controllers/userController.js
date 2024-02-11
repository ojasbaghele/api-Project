const User = require('../models/User');

const UserController = {
  // List all users
  listUsers: async (req, res) => {
    try {
      const { username } = req.query;
      let users;
      if (username) {
        users = await User.findAll({ where: { username } });
      } else {
        users = await User.findAll();
      }
      return res.json({ users });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Replace user fields at once
  replaceUserFields: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedUser = req.body;
      await User.update(updatedUser, { where: { id } });
      const user = await User.findByPk(id);
      return res.json({ user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Ensure that a user with ROLE_USER cannot create a user
  createUser: async (req, res) => {
    try {
      const { role } = req.body;
      if (role === 'ROLE_USER') {
        return res.status(403).json({ error: 'Forbidden: ROLE_USER cannot create users' });
      }
      const newUser = await User.create(req.body);
      return res.status(201).json({ user: newUser });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
};

module.exports = UserController;
