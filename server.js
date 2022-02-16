const express=require('express');
const app = express();
const cors= require('cors');
const connect= require('./src/config/db');
const employeesRouter= require('./src/routes/employees.routes');
const expensesRouter= require('./src/routes/expenses.route');

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