const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const port = 3000;
app.use(bodyParser.json());

var user = {
    "user5": {
        "id": 5,
        "firstname": "Liudmyla",
        "lastname": "Nagorna",
        "email": "mila@gmail.com"
    }
};

app.post('/adduser', (req, res) => {
    fs.readFile(path.join(__dirname, "data.json"), "utf-8", (err, data) => {
        if (err) {
            console.log(err);
        } else {
            let jsonData = JSON.parse(data);
            jsonData["user5"] = user['user5'];
            fs.writeFile(path.join(__dirname, "data.json"), JSON.stringify(jsonData), (err) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send(jsonData);
                }
            });
        }
    });
});

app.get('/allusers', (req, res) => {
    fs.readFile(path.join(__dirname, 'data.json'), 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        }
        res.send(JSON.parse(data));
    });
});

app.get('/getuser/:id', (req, res) => {
    fs.readFile(path.join(__dirname, 'data.json'), 'utf8', (err, data) => {
        if(err){
            console.log(err);
        }
        let jsonData = JSON.parse(data);
        res.send(jsonData["user"+req.params.id]);
});});

app.patch('/updateuser/:userId', (req, res) => {
    const userId = "user" + req.params.userId;
    const updatedUserData = req.body;

    fs.readFile(path.join(__dirname, "data.json"), "utf-8", (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error reading data file');
            return;
        }

        let jsonData = JSON.parse(data);

        if (!jsonData[userId]) {
            res.status(404).send('User not found');
            return;
        }

        // Merge the existing user data with the updated data
        jsonData[userId] = { ...jsonData[userId], ...updatedUserData };

        fs.writeFile(path.join(__dirname, "data.json"), JSON.stringify(jsonData), (err) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error updating user data');
            } else {
                res.send(jsonData[userId]);
            }
        });
    });
});


app.put('/updateuser/:userId', (req, res) => {
    const userId = "user"+req.params.userId;
    const updatedUserData = req.body;
    fs.readFile(path.join(__dirname, "data.json"), "utf-8", (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error reading data file');
            return;
        }
        let jsonData = JSON.parse(data);
        if (!jsonData[userId]) {
            res.status(404).send('User not found');
            return;
        }
        jsonData[userId] = updatedUserData;
        fs.writeFile(path.join(__dirname, "data.json"), JSON.stringify(jsonData), (err) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error updating user data');
            } else {
                res.send(jsonData[userId]);
            }
        });
    });
});

app.delete('/deleteuser/:userId', (req, res) => {
    const userId = "user" + req.params.userId;
    fs.readFile(path.join(__dirname, "data.json"), "utf-8", (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error reading data file');
            return;
        }

        let jsonData = JSON.parse(data);

        if (!jsonData[userId]) {
            res.status(404).send('User not found');
            return;
        }

        delete jsonData[userId];

        fs.writeFile(path.join(__dirname, "data.json"), JSON.stringify(jsonData), (err) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error deleting user');
            } else {
                res.send(`User ${userId} deleted successfully`);
            }
        });
    });
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
