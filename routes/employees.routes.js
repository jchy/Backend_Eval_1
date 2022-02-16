const express = require('express');
const {body , validationResult} = require('express-validator');

const router= express.Router();

const Employee= require('../models/employees.model');
const validateEmployee = require("../utils/validateEmployee");

const { getAllEmployees,
    getEmployeeByName,
    createEmployee,
    removeEmployee,
    updateEmplyeeData} = require('../controller/employees.controller');
const { get } = require('express/lib/request');

// ? pagination
// ? limit, skip

router.get("/", getAllEmployees);

router.get("/:name", getEmployeeByName);


router.post("/", ...validateEmployee(), createEmployee);

router.delete("/:employees_id", removeEmployee);

router.patch("/:employees_id", updateEmplyeeData);


module.exports = router;
