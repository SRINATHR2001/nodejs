const express = require('express');
const app = express();
const port = 3000;
// app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send(`<h1> nothing here</h1>`);
});
app.get('/user',(req, res)=>{
    res.send(`<h1>name=${req.query.username}</h1><br><h1>ID=${req.query.userID}</h1>`);
});
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '/public/index.html'));
// });
app.listen(port,(req,res)=>{
    console.log(`Server is running on port ${port}`)
});
