const { MongoClient } = require("mongodb");

async function main() {
    // Read https://docs.mongodb.com/drivers/node/current/quick-start/ to setup
    // Documentation: https://mongodb.github.io/node-mongodb-native/4.0/
    
    // TODO: Replace the uri string with your MongoDB deployment's connection string. DONE!
    const uri = "mongodb+srv://danielcwq:password@cluster0.kck2i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    await client.connect()

    // TODO: create a database called yourname_attendance DONE!
    const database = client.db('daniel_attendance')

    // TODO: create a collection called students
    const students = database.collection('students')

    // Example for how to add a student. You can check the documentation at https://docs.mongodb.com/manual/reference/method/db.collection.insert/#mongodb-method-db.collection.insert
    // Here's another example: https://docs.mongodb.com/drivers/node/usage-examples/insertOne/
    let studentDocument = {
        // this is a document (or object)
        name: "Jeb",
        regNum: 14,
        age: 17,
        favColour: "Orange"
    }
    await students.insertOne(studentDocument)
    await students.insertOne({
        // this is a document (or object)
        name: "Jan",
        regNum: 6,
        age: 16,
        favColour: "Yellow"
    })
    await students.insertOne({
        // this is a document (or object)
        pi: 3.14
    })

    // Documentation: https://mongodb.github.io/node-mongodb-native/markdown-docs/queries.html
    // Documentation 2: https://mongodb.github.io/node-mongodb-native/4.0/classes/collection.html#findone
    // Usage example: https://docs.mongodb.com/drivers/node/usage-examples/findOne/
    // TODO: find (obtain data for) the student with the age 17
    let query = { age: 17 }
    let student = await students.findOne(query) // Recap: Lesson 1 Example 7
    console.log(student)

    // TODO: obtain data for the student with the name Jan
    query = { name: "Jan" }
    student = await students.findOne(query) // Recap: Lesson 1 Example 7
    console.log(student)

    // You can check out https://docs.mongodb.com/drivers/node/current/usage-examples/ to learn more too.
}

main()