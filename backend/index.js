import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

const db = mysql.createConnection({
  host: "bloodbond-db.ce2c72ut25c2.ca-central-1.rds.amazonaws.com",
  user: "admin",
  password: "bloodbonddb",
  database: "bbdb",
});

app.get("/", (req, res) => {
  res.json("hello, this is the backend");
});

app.post("/getBloodInventory", (req, res) => {
  const q = "SELECT * FROM BLOOD_INVENTORY";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/getRecipient", (req, res) => {
  const q = "SELECT * FROM RECIPIENT WHERE HCID = ?";
  const hcid = req.body.hcid;
  console.log(hcid);
  db.query(q, [hcid], (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/getPerson", (req, res) => {
  const q = "SELECT * FROM PERSON WHERE HCID = ?";
  const hcid = req.body.hcid;
  console.log(hcid);
  db.query(q, [hcid], (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    
    return res.json(data);
  });
});

app.post("/bloodRequest", (req, res) => {
  const q = "SELECT * FROM BLOOD WHERE Blood_group = ? AND RH_factor = ? AND Blood_status = 'Available' AND Blood_ID IN (SELECT Blood_ID FROM BLOOD_INVENTORY)";
  const blood_group = req.body.Blood_type;
  const rh_factor = req.body.RH_factor;
  const blood_id = req.body.Blood_ID;
  console.log(blood_group);
  console.log(rh_factor);
  console.log(blood_id);

  db.query(q, [blood_group, rh_factor, blood_id], (err, result) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    console.log(result);
    return res.json(result);
  });
});

//Hello
//Hello
//Hello



app.get('/getBloodtype/:firstname/:lastname', (req, res) => {
  const firstname = req.params.firstname;
  const lastname = req.params.lastname;
  const query = 'SELECT HCID FROM PERSON WHERE First_name = firstname AND Last_name = lastname';

  db.query(query, [firstname, lastname], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
    } else {
      res.status(200).json(result[0]);
    }
  });
});

app.post("/addPerson", (req, res) => {
  console.log("hcid:", req.body.hcid);
  const query = "INSERT INTO PERSON (`HCID`, `First_name`, `Last_name`, `DOB`, `Sex`, `Age`, `Email`) VALUES (?)";

  const values = [
    req.body.hcid,
    req.body.firstname,
    req.body.lastname,
    req.body.dob,
    req.body.sex,
    req.body.age,
    req.body.email,
    
 
  ];


  db.query(query, [values], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        res.status(409).json({ message: 'Data already exists in the database.' });
      } else {
        console.error(err);
        res.status(500).send('Server error');
      }
    } else {
      res.status(201).json({ message: 'Data successfully inserted.' });
    }
  });
});

app.post("/bookAppointment", (req, res) => {
  const query = "INSERT INTO APPOINTMENT (`Confirmation_ID`, `Date`, `HCID`, `Location`, `Status`, `Time`) VALUES (?)";

  const values = [
    req.body.confirmationid,
    req.body.date,
    req.body.hcid,
    req.body.location,
    req.body.status,
    req.body.time,
 
  ];


  db.query(query, [values], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        res.status(409).json({ message: 'Data already exists in the database.' });
      } else {
        console.error(err);
        res.status(500).send('Server error');
      }
    } else {
      res.status(201).json({ message: 'Data successfully inserted.' });
    }
  });
});



// app.post("/addPerson", (req, res) => {
//   const q = "INSERT INTO PERSON(`firstname`, `lastname`, `age`, `sex`, 'dob', 'phone', 'email', 'hcid') VALUES (?)";

//   const values = [
//     req.body.firstname,
//     req.body.lastname,
//     req.body.age,
//     req.body.sex,
//     req.body.dob,
//     req.body.phone,
//     req.body.email,
//     req.body.hcid,
 
//   ];

//   db.query(q, [values], (err, data) => {
//     if (err) return res.send(err);
//     return res.json(data);
//   });
// });

app.post("/addDonor", (req, res) => {
  const q = "INSERT INTO DONOR (HCID, Blood_ID, RH_factor, Donor_stat, Blood_type) VALUES (?, ?, ?, ?, ?)";

  const values = [
    req.body.bloodid,
    req.body.blood_type,
    req.body.donorstat,
    req.body.hcid,
    req.body.rhfactor,
 
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.post("/addRecipient", (req, res) => {
  const q = "INSERT INTO RECIPIENT (HCID, Blood_ID, Blood_type, Health_condition, RH_factor) VALUES (?, ?, ?, ?, ?)";

  const values = [
    req.body.hcid,
    req.body.bloodid,
    req.body.bloodtype,
    req.body.healthcondition,
    req.body.rhfactor,
 
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = " DELETE FROM books WHERE id = ? ";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "UPDATE books SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [...values,bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.post('/verifyDoctor', (req, res) => {
  const valueToCheck = req.body.valueToCheck;
  const query = `SELECT * FROM DOCTOR WHERE Employee_ID = ?`;

  db.query(query, [valueToCheck], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
    } else {
      res.status(200).json({ exists: result.length > 0 });
    }
  });
});

app.post('/checkHcidExists', (req, res) => {
  const valueToCheck = req.body.valueToCheck;
  const query = `SELECT * FROM PERSON WHERE HCID = ?`;

  db.query(query, [valueToCheck], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
    } else {
      res.status(200).json({ exists: result.length > 0 });
    }
  });
});

app.post('/checkDonorExists', (req, res) => {
  const valueToCheck = req.body.valueToCheck;
  const query = `SELECT * FROM DONOR WHERE HCID = ?`;

  db.query(query, [valueToCheck], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
    } else {
      res.status(200).json({ exists: result.length > 0 });
    }
  });
});

app.post('/checkRecipientExists', (req, res) => {
  const valueToCheck = req.body.valueToCheck;
  const query = `SELECT * FROM RECIPIENT WHERE HCID = ?`;

  db.query(query, [valueToCheck], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
    } else {
      res.status(200).json({ exists: result.length > 0 });
    }
  });
});

app.listen(8800, () => {
  console.log("Connected to backend. Listening on port 8800...");
});


