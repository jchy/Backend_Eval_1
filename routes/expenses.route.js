const express = require('express');
const {body , validationResult} = require('express-validator');
const { type } = require('express/lib/response');

const router= express.Router();

const Expenses = require('../models/expenses.model');
const validateExpenses = require("../utils/validateExpenses");

// ? pagination
// ? limit, skip

router.get("/", async (req,res)=>{
    try{
        const per_page = req.query.per_page || 2;
        const page = req.query.page || 1;
        const skip = page < 0 ? 0 : (page - 1)*per_page;
        // (page - 1)*per_page
        const expenses = await Expenses.find().skip(skip).limit(per_page);
        if(!expenses) return res.status(400).json({msg: "No Expense is found"}) 
        res.status(200).json(expenses);
    }
    catch(err){
        return res.status(400).json({msg: "Something went wrong!"})
    }
})

router.get("/groupbytype", async (req,res)=>{
    try{
        const per_page = req.query.per_page || 2;
        const page = req.query.page || 1;
        const skip = page < 0 ? 0 : (page - 1)*per_page;
        // (page - 1)*per_page
        const expenses = await Expenses.aggregate([
            {
              $group: {
                _id : { type : "$type" }, count: { $count:{}}
              }
            }, { $sort :  { count : 1}}
          ])
        if(!expenses) return res.status(400).json({msg: "No Expense is found"}) 
        res.status(200).json(expenses);
    }
    catch(err){
        return res.status(400).json({msg: "Something went wrong!"})
    }
})

router.get("/avgeexpensereimburse", async (req,res)=>{
    try{
        const per_page = req.query.per_page || 2;
        const page = req.query.page || 1;
        const skip = page < 0 ? 0 : (page - 1)*per_page;
        // (page - 1)*per_page
        const expenses = await Expenses.aggregate([{$match: {}},{$group: { _id: "$reimbursed_date" }}])
         
        if(!expenses) return res.status(400).json({msg: "No Expense is found"}) 
        res.status(200).json(expenses);
    }
    catch(err){
        return res.status(400).json({msg: "Something went wrong!"})
    }
})

router.get("/sortbydate/:asc", async (req,res)=>{
    try{
        const per_page = req.query.per_page || 2;
        const page = req.query.page || 1;
        const skip = page < 0 ? 0 : (page - 1)*per_page;
        // (page - 1)*per_page
        const date1 = req.query.date1 ;
        const date2 = req.query.date2 ;
        console.log(date1, date2);
        const expenses = await Expenses.find({date_of_expense:{$gt:Number(date1),$lt:Number(date2)}}).sort({date_of_expense : req.params.asc }).skip(skip).limit(per_page);
        if(!expenses) return res.status(400).json({msg: "No Expense is found"}) 
        res.status(200).json(expenses);
    }
    catch(err){
        return res.status(400).json({msg: "Something went wrong!"})
    }
})




router.get("/:user_id", async (req,res)=>{
    try{
        const expenses = await Expenses.findOne({_id: req.params.user_id});
        if(!expenses) return res.status(400).json({msg: "Expenses not found"})        
        res.status(200).json(expenses);
    }
    catch(err){
        return res.status(400).json({msg: "Something went wrong!"})
    }
})


router.post("/", ...validateExpenses() ,async (req,res)=>{
    try{
        // * Validate
        const errors = validationResult(req);
        if(!errors.isEmpty())
        {
            return res.status(400).json({errors: errors.array()});
        }

        // * Create User
        const doesExpensesExist= await Expenses.findOne({employee_id : req.body.employee_id})
        if(doesExpensesExist) return res.status(400).json({msg: "Duplicate Expense found"})
        const expenses = await Expenses.create({
            type: req.body.type,
            date_of_expense: req.body.date_of_expense,
            employee_id: req.body.employee_id,
            reimbursed: req.body.reimbursed,
            reimbursed_date: req.body.reimbursed_date
        })

        if(!expenses) return res.status(400).json({msg: "Expense not created"})

        //200 ok
        return res.status(200).json(expenses)
    }
    catch(err){
        return res.status(400).json({msg: "Something went wrong!"})
    }
})

router.delete("/:employee_id", async (req,res)=>{
    try{
        const expenses = await Expenses.findOneAndDelete({ _id: req.params.employee_id })
        if(!expenses) return res.status(404).json({msg: "Expenses is not found"})
        res.status(200).json(expenses)
    }
    catch(err){
        return res.status(400).json({msg: "Something went wrong!"})
    }
})

router.patch("/:employee_id", async (req,res)=>{
    try{
        if(!req.body.title) return res.status(400).json({msg: "Title is required"});
        const expenses = await Expenses.findOneAndUpdate({ 
            _id: req.params.employee_id 
        },{
            $set: {
                type: req.body.type,
                date_of_exppense: req.body.date_of_exppense,
                employee_id: req.body.employee_id,
                reimbursed: req.body.reimbursed,
                reimbursed_date: req.body.reimbursed_date,
            }
        },{
            returnOriginal: false
        }
            )
        if(!expenses) return res.status(404).json({msg: "Expenses is not found"})
        res.status(200).json(expenses)
    }
    catch(err){
        return res.status(400).json({msg: "Something went wrong!"})
    }
})


module.exports = router;
