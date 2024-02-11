const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const ClientController = require('../controllers/ClientController');
const CompanyController = require('../controllers/CompanyController');
const authMiddleware = require('../middlewares/authMiddleware');

// User routes
router.get('/users', UserController.listUsers);
router.put('/users/:id', UserController.replaceUserFields);
router.post('/users', UserController.createUser);

// Client routes
router.post('/clients', authMiddleware, ClientController.createClient);
router.put('/clients/:id', authMiddleware, ClientController.updateClient);
router.patch('/clients/:id', authMiddleware, ClientController.changeClientField);
router.get('/clients', ClientController.listClients);
router.get('/clients/search/user', ClientController.searchClientsByUser);
router.get('/clients/search/name', ClientController.searchClientsByName);

// Company routes
router.get('/companies/search/employees', CompanyController.searchCompaniesByEmployeesRange);
router.get('/companies/search/users', CompanyController.searchCompaniesByUsers);
router.get('/companies/search/name', CompanyController.searchCompaniesByName);
router.get('/companies/max-revenue-industry', CompanyController.companiesWithMaxRevenueInIndustry);

module.exports = router;