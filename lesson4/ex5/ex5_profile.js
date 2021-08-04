// npm i -S express
const path = require('path');
const express = require('express')
const crypto = require("crypto")
// TODO: what to require here? - crypto, mongodb and express
const jwt = require("jsonwebtoken") // npm i jsonwebtoken
const app = express() // creates an instance of an express app
const port = 3000 // defines the port that your backend is exposed on. Don't change this

const JWTkey = "somerandomstringforencryption1234"

app.use(express.json({ extended: true })) // allows you to parse POST request data in JSON format

// TODO: connect to your MongoDB client here
// define your ACCOUNTS database and ATTENDANCE database and collection variables
// Hint: Example 1

app.get("/", (req, res) => {
    let options = {
        root: path.join(__dirname)
    }
    res.sendFile("ex5_create.html", options) // sendFile is similar to send, but it sends a file to the user instead.
    // the file can contain html like this one does.
    // the above options sets it such that express looks for the file you are sending in your current directory
})

app.get("/attendance", (req, res) => { // this file is served instead when users visit the /attendance path instead of the default / path
    let options = {
        root: path.join(__dirname)
    };
    res.sendFile("ex5_attendance.html", options)
})

app.post("/api/createaccount", (req, res) => {
    // Extension: Can you check that it is a unique name/username before creating the account?
    // TODO: get the accountType, name, username and password values from this POST request
    // Hint: accountType is either "student" or "teacher"

    // Hashing the password
    let password = req.body.password // the user's password
    let hash = crypto.createHash("sha256") // we use the crypto library to hash our password
    // we first create a hash object
    hash.update(password) // then we set its value to the user's plaintext password
    password = hash.digest("hex") // finally we encrypt it with sha256 and store the output in a hex(adecimal) format
    // extra info on hashing: https://docs.oracle.com/cd/E26180_01/Platform.94/ATGPersProgGuide/html/s0506passwordhashing01.html
    // you can also find out more about sha256 online

    // console.log(password)  // What does this output?

    // Assigning a JSON Web Token (JWT)
    const token = jwt.sign(
        { name: req.body.name, username: req.body.username },
        JWTkey, // the key we use to encrypt our JWT. This key should be kept private.
        {
            expiresIn: "2h",
        }
    )

    // TODO: create an account document (with the name, username, password, accountType AND jwt)
    // and insert the document into the ACCOUNTS database
    res.json({
        token: token
    }) // return the token to the user so they can store it and use it for future authorization
})

app.get("/login", (req, res) => {
    let options = {
        root: path.join(__dirname)
    };
    res.sendFile("ex5_login.html", options)
})

app.post("/api/login", (req, res) => {
    // TODO: get the username and password values from this POST request
    // Hint: Lesson 2 Example 2
    // TODO: verify that the username and password corresponds to an existing user
    // Remember to first convert the plaintext password in the request to its hashed version
    // before running a check on the users in the database (see the createaccount endpoint)

    // TODO: if this is a registered user, assign him a JWT token
    // and tell him what his name and account type are
    if (true /* check if the user is registered here */) {
        // TODO: also update the account's JWT token in the database
        // Hint: Use updateone https://docs.mongodb.com/drivers/node/usage-examples/updateOne/
        // More details: https://docs.mongodb.com/manual/reference/operator/update/#update-operators
        const token = "" // what goes in here?
        res.json({
            token: token,
            name: "",
            accountType: ""
        })
    } else {
        // if this is not a registered user, don't return anything
        res.json({
            token: null
        })
    }
})

app.post("/api/add", (req, res) => {
    // TODO: get the jwt token value from this POST request (stored in the token property)
    // verify that the jwt corresponds to an existing user
    // Hint: Find users in the ACCOUNTS database with that jwt
    // Extension: check that the existing user is a student (not a teacher)

    // TODO: create a student document
    // and insert the student into the ATTENDANCE database
    // Hint: What details of the student (name/username/password) do you include in the attendance list?
    res.send("success")
})

app.post("/api/remove", (req, res) => {
    // TODO: get the teacher's jwt value and student's removeName from this POST request


    // TODO: verify that the jwt corresponds to an existing user
    // Extension: check that the existing user is a teacher (not a student)

    // TODO: remove the student document with the specified removeName
    // Hint: https://docs.mongodb.com/drivers/node/usage-examples/deleteOne/
    res.send("success")
})

app.get("/api/attendance", (req, res) => {
    // TODO: get the value of the jwt
    // and verify that (1) it is an existing user
    // and (2) it is a teacher, before returning the students

    // TODO: Return a list of students
    // https://docs.mongodb.com/manual/tutorial/query-documents/#select-all-documents-in-a-collection
    // Be sure to select Node.JS as the language (top right) for the above link
    // Cursors: http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#find
    let students = []
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