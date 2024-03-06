const express = require('express');
const app = express();
const port = 3000;
function middleware1(req, res, next){
    console.log("hi iam middleware for \\middle");
    next();
}
function middleware2(req, res, next){
    console.log("hi iam middleware for \\");
    next();
}
app.use(middleware2);
app.use("/middle",middleware1);
app.get('/', (req, res) => {
    res.send(`<h1> nothing here</h1>`);
});
app.get('/middle',(req, res)=>{
    res.send(`<h1> something here</h1>`);
});
app.listen(port,(req,res)=>{
    console.log(`Server is running on port ${port}`)
});