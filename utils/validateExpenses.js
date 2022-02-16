const {body} = require('express-validator');

const validateExpenses = ()=>([
    body("type")
    .not()
    .isEmpty()
    .withMessage("Type should not be empty!")
    .isString()
    .withMessage("Type should be a string!")
    ,
 body("date_of_expense")
   .not().isEmpty().withMessage("date should not be empty!")
   .isString().withMessage("Date should be a string"),
 body("employee_id")
   .not().isEmpty().withMessage("Employee id should not be empty!")
   .isString().withMessage("Employee id should be a String!"),
   body("reimbursed")
   .not().isEmpty().withMessage("Reinbursed should not be empty!")
   .isBoolean().withMessage("Reimbursed should an Boolean"),
  body("reimbursed_date")
   .not().isEmpty().withMessage("reimbursed date should not be empty!")
   .isString().withMessage("reimbursed date should be a string"),
]
)

module.exports = validateExpenses;