const {body} = require('express-validator');
// const validateEmployee = require('./validateExpenses');

const validateEmployee = ()=>([
  body("employee_id")
   .not().isEmpty().withMessage("Employee id should not be empty!")
   .isString().withMessage("Employee id should be a String!"),
 body("name")
   .not().isEmpty().withMessage("Name should not be empty!")
   .isString().withMessage("Name should be a String"),
 body("gender")
   .not().isEmpty().withMessage("Gender should not be empty!")
   .isString().withMessage("Please Enter a valid gender address!")
]
)

module.exports = validateEmployee;