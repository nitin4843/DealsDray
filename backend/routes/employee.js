const express = require('express');

const router = express.Router();

const employeeController = require('../controllers/employee');
const { isAuth } = require('../util/is-auth');


router.get('/employee', isAuth, employeeController.getEmployee);

router.post('/employee', isAuth, employeeController.postEmployee);

router.put('/employee/:employeeId', isAuth, employeeController.putEmployee);

router.delete('/employee/:employeeId', isAuth, employeeController.deleteEmployee);

router.get('/search', isAuth, employeeController.searchEmployees);

module.exports = router;