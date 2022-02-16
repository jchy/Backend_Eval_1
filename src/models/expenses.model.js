const app=require("express")();
const mongoose  = require("mongoose");

//Schema
const ExpensesSchema= new mongoose.Schema({
    type: {type: String, required: true},
    date_of_expense: {type: String, required: true},
    employee_id : {type: String, required: true},
    reimbursed: {type: Boolean, required: true},
    reimbursed_date : {type : String, required: true}
},{
    timestamps: { created_at: () => Date.now() }
}
)

//Models
// *or
const Expense= mongoose.model("Tweet",ExpensesSchema);

module.exports = Expense;