# Backend_Eval_1
ExpensesApp

### To run this project you follow the following steps
1. Clone this repository on your local system

2. Navigate inside the Backend_Eval_1 directory

3. Run the following command in your terminal
```js
  npm install
```

4. Now  run the following command in terminal to start the server
```js
  npm run start
```

5. to get all the expenses goto to the folowing url : 
  - http://localhost:5001/expenses

6. to get all employee go to the following url :
 - http://localhost:5001/employees

7. create an expensee - POST on http://localhost:5001/expenses
8. create an employee - POST on http://localhost:5001/employees
9. get all expenses raised between date 1 and date 2 - GET - sort by desc or asc date
```js
  http://localhost:5001/expenses/sortbydate/1?date1=2012&date2=2016
```

10. get all expenses grouped by type and sort by desc or asc counts- GET
```js
  http://localhost:5001/expenses/groupbytype
```

11. get all expenses by user id - GET
```js
  http://localhost:5001/expenses/< id >
```
12. get average time to reimburse an expense - GET
```js
  http://localhost:5001/expenses/avgeexpensereimburse
```
