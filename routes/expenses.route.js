const express = require('express');
const {body , validationResult} = require('express-validator');
const { type } = require('express/lib/response');

const router= express.Router();

const Expenses = require('../models/expenses.model');
const validateExpenses = require("../utils/validateExpenses");
const { getAllExpenses,
    getExpensesByUserId,
    getExpenses_Bw_Date1_and_Date2_sortby_asc,
    getAvgeExpenseReimburse,
    groupExpenseByTypeAndSort,
    createExpenses,
    removeExpenseByEmployeeId,
    updateExpenses} = require('../controller/expenses.controller');
// ? pagination
// ? limit, skip

router.get("/", getAllExpenses);

router.get("/groupbytype", groupExpenseByTypeAndSort);

router.get("/avgeexpensereimburse", getAvgeExpenseReimburse);

router.get("/sortbydate/:asc", getExpenses_Bw_Date1_and_Date2_sortby_asc);




router.get("/:user_id", getExpensesByUserId);


router.post("/", ...validateExpenses() , createExpenses);

router.delete("/:employee_id", removeExpenseByEmployeeId)

router.patch("/:employee_id", updateExpenses)

module.exports = router;
