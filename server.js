const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "webProj",
    password: "root",
    database: "admindb"
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Endpoint to insert data into admin table
app.post("/admin", (req, res) => {
    const { adminid, admin_name, reports, new_trips } = req.body;
    const sql = "INSERT INTO admin (adminid, admin_name, reports, new_trips) VALUES (?, ?, ?, ?)";
    db.query(sql, [adminid, admin_name, reports, new_trips], (err, result) => {
        if (err) {
            console.error("Error inserting data into admin table:", err);
            return res.status(500).json({ error: "Error inserting data into admin table" });
        }
        console.log("Data inserted successfully into admin table");
        return res.status(200).json({ success: true });
    });
});

// Endpoint to retrieve data from admin table
app.get("/admin", (req, res) => {
    const sql = "SELECT * FROM admin";
    db.query(sql, (err, data) => {
        if (err) {
            console.error("Error retrieving data from admin table:", err);
            return res.status(500).json({ error: "Error retrieving data from admin table" });
        }
        return res.json(data);
    });
});


// Endpoint to insert data into update table
app.post("/update", (req, res) => {
    const { adminid, pick_up_location, drop_off_location, day, time, driver_name, bus_model, bus_capacity } = req.body;
    const sql = "INSERT INTO `update` (adminid, pick_up_location, drop_off_location, day, time, driver_name, bus_model, bus_capacity) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

    db.query(sql, [adminid, pick_up_location, drop_off_location, day, time, driver_name, bus_model, bus_capacity], (err, result) => {
        if (err) {
            console.error("Error inserting data into update table:", err);
            return res.status(500).json({ error: "Error inserting data into update table" });
        }
        console.log("Data inserted successfully into update table");

    });
});


// Endpoint to retrieve data from update table
app.get("/update", (req, res) => {
    const sql = "SELECT * FROM `update`";
    db.query(sql, (err, data) => {
        if (err) {
            console.error("Error retrieving data from update table:", err);
            return res.status(500).json({ error: "Error retrieving data from update table" });
        }
        return res.json(data);

    });
});




const db1 = mysql.createConnection({
    host: "localhost",
    user: "webProj",
    password: "root",
    database: "userdb1"

});

db1.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

app.post('/login', (req, res) => {
    const { userid, password } = req.body;
    console.log('Received:', userid, password);

    if (!userid || !password) {
        return res.status(400).json({ error: 'userid and password are required' });
    }

    const sql = "INSERT INTO `login` (userid, password) VALUES (?, ?)";
    db1.query(sql, [userid, password], (err, result) => {
        if (err) {
            console.error("Error inserting data into login table:", err);
            return res.status(500).json({ error: "Error inserting data into login table" });
        }
        console.log("Data inserted successfully into login table");
        res.status(200).json({ message: "Data inserted successfully" });
    });
});

// Endpoint to retrieve data from login table
app.get("/login", (req, res) => {
    const sql = "SELECT * FROM `login`";
    db.query(sql, (err, data) => {
        if (err) {
            console.error("Error retrieving data from login table:", err);
            return res.status(500).json({ error: "Error retrieving data from login table" });
        }
        return res.json(data);




    });
});



app.get('/homeu', (req, res) => {

});

// Endpoint to insert data into contactform table
app.post("/contactform", (req, res) => {
    const { studentid, name_student, email, message } = req.body;

    // Insert data into the contactform table
    const sql = "INSERT INTO contactform (studentid, name_student, email, message) VALUES (?, ?, ?, ?)";
    db1.query(sql, [studentid, name_student, email, message], (err, result) => {
        if (err) {
            console.error("Error inserting data into contactform table:", err);
            return res.status(500).json({ error: "Error inserting data into contactform table" });
        }
        console.log("Data inserted successfully into contactform table");
        return res.status(200).json({ success: true });
    });
});

// Endpoint to insert data into plantrip table
app.post("/plantrip", (req, res) => {
    const { studentid, name_student, email, trip, pick_up_location, drop_off_location, day, time } = req.body;

    // Insert data into the plantrip table
    const sql = "INSERT INTO plantrip (studentid, name_student, email, trip, pick_up_location, drop_off_location, day, time) VALUES (?, ?, ?, ? ,?, ?, ?, ?)";
    db1.query(sql, [studentid, name_student, email, trip, pick_up_location, drop_off_location, day, time], (err, result) => {
        if (err) {
            console.error("Error inserting data into plantrip table:", err);
            return res.status(500).json({ error: "Error inserting data into plantrip table" });
        }
        console.log("Data inserted successfully into plantrip table");
        return res.status(200).json({ success: true });
    });
});

app.post("/request", (req, res) => {
    const { studentid, name_student, email, pick_up_location, drop_off_location } = req.body;

    // Insert data into the request table
    const sql = "INSERT INTO request (studentid, name_student, email, pick_up_location, drop_off_location) VALUES (?, ?, ?, ?, ?)";
    db1.query(sql, [studentid, name_student, email, pick_up_location, drop_off_location], (err, result) => {
        if (err) {
            console.error("Error inserting data into request table:", err);
            return res.status(500).json({ error: "Error inserting data into request table" });
        }
        console.log("Data inserted successfully into request table");
        return res.status(200).json({ success: true });
    });
});

app.get("/request", (res, req) => {
    const sql = "SELECT * FROM `request`";
    db.query(sql, (err, data) => {
        if (err) {
            console.error("Error retrieving data from request table:", err);
            return res.status(500).json({ error: "Error retrieving data from request table" });
        }
        return res.json(data);
    });
});

app.post("/complaint", (req, res) => {
    const { studentid, name, email, complaint } = req.body;

    // Insert data into the complaint table
    const sql = "INSERT INTO complaint (studentid, name, email, complaint) VALUES (?, ?, ?, ?)";
    db1.query(sql, [studentid, name, email, complaint], (err, result) => {
        if (err) {
            console.error("Error inserting data into complaint table:", err);
            return res.status(500).json({ error: "Error inserting data into complaint table" });
        }
        console.log("Data inserted successfully into complaint table");
        return res.status(200).json({ success: true });
    });
});

app.get("/complaint", (res, req) => {
    const sql = "SELECT * FROM `complaint`";
    db.query(sql, (err, data) => {
        if (err) {
            console.error("Error retrieving data from complaint table:", err);
            return res.status(500).json({ error: "Error retrieving data from complaint table" });
        }
        return res.json(data);
    });
});


app.post("/payment", (req, res) => {
    const { namecard, cardnumber, expirydate, cvv } = req.body;

    // Insert data into the payment table
    const sql = "INSERT INTO payment (namecard, cardnumber, expirydate, cvv ) VALUES (?, ?, ?, ?)";
    db1.query(sql, [namecard, cardnumber, expirydate, cvv], (err, result) => {
        if (err) {
            console.error("Error inserting data into payment table:", err);
            return res.status(500).json({ error: "Error inserting data into payment table" });
        }
        console.log("Data inserted successfully into payment table");
        return res.status(200).json({ success: true });
    });
});


// Serve Payment
app.get('/Payment', (req, res) => {
    res.sendFile(path.join(__dirname, 'Payment.html'));
});

app.post("/confirm-booking", (req, res) => {
    const { seatNumber } = req.body;
    // Assuming you have a database connection named db

    // Update the database with the selected seat information
    const sql = "UPDATE seats SET booked = true WHERE seat_number = ?";
    db.query(sql, [seatNumber], (err, result) => {
        if (err) {
            console.error("Error updating database:", err);
            return res.status(500).json({ success: false, error: "Error updating database" });
        }
        console.log("Seat booked successfully:", seatNumber);
        return res.json({ success: true });
    });
});
app.listen(7000, () => {
    console.log("Listening...");
})