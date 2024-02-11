const Company = require('../models/Company');
const User = require('../models/User');


const CompanyController = {
  // Search for Companies by employees range
  searchCompaniesByEmployeesRange: async (req, res) => {
    try {
      const { minEmployees, maxEmployees } = req.query;
      const companies = await Company.findAll({
        where: {
          employees: {
            [Op.between]: [minEmployees, maxEmployees]
          }
        }
      });
      return res.json({ companies });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Search for Companies by users
  searchCompaniesByUsers: async (req, res) => {
    try {
      const { userId } = req.query;
      const companies = await Company.findAll({
        include: [
          {
            model: User,
            where: { id: userId }
          }
        ]
      });
      return res.json({ companies });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Search for Companies by name
  searchCompaniesByName: async (req, res) => {
    try {
      const { name } = req.query;
      const companies = await Company.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%` // Case-insensitive search
          }
        }
      });
      return res.json({ companies });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Get list of companies with max revenue in each industry
  companiesWithMaxRevenueInIndustry: async (req, res) => {
    try {
      const [results, metadata] = await sequelize.query(`
        SELECT *
        FROM (
          SELECT *, ROW_NUMBER() OVER (PARTITION BY industry ORDER BY revenue DESC) as row_num
          FROM Companies
        ) ranked
        WHERE row_num = 1;
      `);
      return res.json({ companies: results });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
};

module.exports = CompanyController;
