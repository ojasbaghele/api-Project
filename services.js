const { Op } = require('sequelize');
const { Company } = require('./models'); 

const services = {
  // Search for Companies by employees range
  searchCompaniesByEmployeesRange: async (minEmployees, maxEmployees) => {
    try {
      const companies = await Company.findAll({
        where: {
          employees: {
            [Op.between]: [minEmployees, maxEmployees]
          }
        }
      });
      return companies;
    } catch (error) {
      console.error(error);
      throw new Error('Error searching companies by employees range');
    }
  },

  // Search for Companies by users
  searchCompaniesByUsers: async (userId) => {
    try {
      const companies = await Company.findAll({
        include: [
          {
            model: User,
            where: { id: userId }
          }
        ]
      });
      return companies;
    } catch (error) {
      console.error(error);
      throw new Error('Error searching companies by users');
    }
  },

  // Search for Companies by name
  searchCompaniesByName: async (name) => {
    try {
      const companies = await Company.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%` // Case-insensitive search
          }
        }
      });
      return companies;
    } catch (error) {
      console.error(error);
      throw new Error('Error searching companies by name');
    }
  },

  // Get list of companies with max revenue in each industry
  companiesWithMaxRevenueInIndustry: async () => {
    try {
      const [results, metadata] = await sequelize.query(`
        SELECT *
        FROM (
          SELECT *, ROW_NUMBER() OVER (PARTITION BY industry ORDER BY revenue DESC) as row_num
          FROM Companies
        ) ranked
        WHERE row_num = 1;
      `);
      return results;
    } catch (error) {
      console.error(error);
      throw new Error('Error getting companies with max revenue in industry');
    }
  }
};

module.exports = services;