const express = require('express');
const {body , validationResult} = require('express-validator');

const router= express.Router();

const Employee= require('../models/employees.model');
const validateEmployee = require("../utils/validateEmployee");

// ? pagination
// ? limit, skip

router.get("/", async (req,res)=>{
    try{
        const per_page = req.query.per_page || 2;
        const page = req.query.page || 1;
        const skip = page < 0 ? 0 : (page - 1)*per_page;
        // (page - 1)*per_page

        const employees = await Employee.find().skip(skip).limit(per_page);

        if(!employees) return res.status(400).json({msg: "No employees found"}) 
        res.status(200).json(employees);
    }
    catch(err){
        return res.status(400).json({msg: "Something went wrong!"})
    }
})

router.get("/:name", async (req,res)=>{
    try{
        const employees = await Employee.findOne({ name: req.params.name});
        if(!employees) return res.status(400).json({msg: "Employees not found"})        
        res.status(200).json(employees);
    }
    catch(err){
        return res.status(400).json({msg: "Something went wrong!"})
    }
})


router.post("/", ...validateEmployee() ,async (req,res)=>{
    try{
        // * Validate
        const errors = validationResult(req);
        if(!errors.isEmpty())
        {
            return res.status(400).json({errors: errors.array()});
        }
        // * Create Employee
        const doesEmployeeExist = await Employee.findOne({name: req.body.name})
        console.log("jhgjfdghjkgfdx");
        if(doesEmployeeExist) return res.status(400).json({msg: "Duplicate Employee found"})
        const employees = await Employee.create({
            employee_id : req.body.employee_id,
            name: req.body.name,
            gender : req.body.gender
        })
        console.log(employees);
        if(!employees) return res.status(400).json({msg: "Employee not created"})

        //200 ok
        return res.status(200).json(employees)
    }
    catch(err){
        return res.status(400).json({msg: "Something went wrong!"})
    }
})

router.delete("/:employees_id", async (req,res)=>{
    try{
        const employees = await Employee.findOneAndDelete({ _id: req.params.employees_id })
        if(!employees) return res.status(404).json({msg: "Employee not found"})
        res.status(200).json(employees)
    }
    catch(err){
        return res.status(400).json({msg: "Something went wrong!"})
    }
})

router.patch("/:employees_id", async (req,res)=>{
    try{
        if(!req.body.name) return res.status(400).json({msg: "Name is required"});
        const employees = await Employee.findOneAndUpdate({ 
            _id: req.params.employees_id 
        },{
            $set: {
                name: req.body.name,
                gender: req.body.gender
            }
        },{
            returnOriginal: false
        }
            )
        if(!employees) return res.status(404).json({msg: "Employee not found"})
        res.status(200).json(employees)
    }
    catch(err){
        return res.status(400).json({msg: "Something went wrong!"})
    }
})


module.exports = router;
