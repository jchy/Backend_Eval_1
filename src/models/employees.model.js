const mongoose  = require("mongoose");

//Schema
const EmployeeSchema= new mongoose.Schema({
    employee_id : {type: String, required: true},
    name: {type: String, required: true},
    gender: {type: String, required: true},
})

const Employee = mongoose.model("Employee",EmployeeSchema);

module.exports = Employee;