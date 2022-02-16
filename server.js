// create Users, and Tweets Schema, Models
// create routes, and use validations
// create a CRUD application for a twitter application
// the tweet should have title, body, tags (array), user_id
// also add a users collections, keep username, email, id,
// create CRUD for users, and tweets
// /users - ( list all users ( with pagination) , create, delete, patch )
// /tweets - ( list all tweets ( w pagination), list tweet by user (w pagination), create, delete, patch )
// create an endpoint to search tweets by user_id, filter all tweets by a user
// apply pagination on it with skip and limit
// show total count as well, you can use .count() against the query

const express=require('express');
const app = express();
const cors= require('cors');
const connect= require('./config/db');
const employeesRouter= require('./routes/employees.routes');
const expensesRouter= require('./routes/expenses.route');

const PORT = 5001;

app.use(cors());
app.use(express.json());

app.use("/employees", employeesRouter);
app.use("/expenses", expensesRouter);

const start = async () => {
    await connect();
    app.listen(PORT, ()=>{
        console.log(`Server is running on port ${PORT}`);
    });
}
module.exports = start;