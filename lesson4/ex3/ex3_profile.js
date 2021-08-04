// npm i -S express
const path = require('path');
const express = require('express')
// TODO: what to require here?
const app = express() // creates an instance of an express app
const port = 3000 // defines the port that your backend is exposed on. Don't change this

app.use(express.json({ extended: true })) // allows you to parse POST request data in JSON format

// TODO: connect to your MongoDB client here
// define your database and ACCOUNTS and ATTENDANCE collection variables
// Hint: Example 1
const uri = "";
const client = new MongoClient(uri);
await client.connect()

// TODO: create a database called yourname_attendance
const database = client.db('gerrard_attendance')

// TODO: create a collection called students
const accounts = database.collection('accounts')
const attendance = database.collection('attendance')

app.get("/", (req, res) => {
    let options = {
        root: path.join(__dirname)
    }
    res.sendFile("ex3_create.html", options) // sendFile is similar to send, but it sends a file to the user instead.
    // the file can contain html like this one does.
    // the above options sets it such that express looks for the file you are sending in your current directory
})

app.get("/attendance", (req, res) => { // this file is served instead when users visit the /attendance path instead of the default / path
    let options = {
        root: path.join(__dirname)
    };
    res.sendFile("ex3_attendance.html", options)
})

app.post("/api/createaccount", (req, res) => {
    // TODO: get the name, username and password values from this POST request
    // Hint: Lesson 2 Example 2
    // TODO: create a student document (similar to creating an object last lesson)
    // and insert the student into the ACCOUNTS database
    res.send("success")
})

app.post("/api/add", (req, res) => {
    // TODO: get the name, username and password values from this POST request
    // Hint: Lesson 2 Example 2
    let query = {
        username: req.body.username,
        password: req.body.password
    }
    let student = await students.findOne(query) // Recap: Lesson 1 Example 7
    console.log(student)
    // TODO: verify that the username and password corresponds to an existing user
    // Hint: Example 1/2
    if (student != undefined) {
        // insert 
    } else {
        // nth
    }
    // TODO: create a student document (similar to creating an object last lesson)
    // and insert the student into the ATTENDANCE database
    // Hint: What details of the student (name/username/password) do you include in the attendance list?
    res.send("success")
})

app.get("/api/attendance", (req, res) => {
    // TODO: Return a list of students
    // https://docs.mongodb.com/manual/tutorial/query-documents/#select-all-documents-in-a-collection
    // Be sure to select Node.JS as the language (top right) for the above link
    // Cursors: http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#find
    const cursor = attendance.find({});
    let students = cursor
    attendance.find().toArray(function(err, documents) {
        
        test.equal(3, documents.length);
  
        db.close();
      });
    res.json({ // res.json sends a JSON response.
        // \JSON stands for Javascript Object Notation. These are the objects we learnt earlier in example 5.
        // they are enclosed in curly braces as shown
        // res.json is a function that accepts an object as its parameter.
        listOfStudents: students,
        numberOfStudents: students.length
    })
})

app.listen(port, () => {
    console.log(`Your app is listening at http://localhost:${port}`) // Exposes your backend on the port 3000
}) // Typically, the backend would be exposed across the Internet
// But for simplicity, we'll run it locally first (only WE can check it out)