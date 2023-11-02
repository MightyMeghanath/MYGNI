const https = require('https');
const hostname = 'idyllic-cendol-9b186f.netlify.app';
const express = require('express');
const path = require('path');
const app = express();
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const session = require('express-session');
const port = process.env.PORT || 3000; // Use environment variable for port

const cors = require('cors');
app.use(cors()); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: true }));

// Set the template engine as pug


// Function to create a database connection
const createDbConnection = async () => {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12082711',
    database: 'MYGNI',
  });
  return connection;
};

// Middleware to create a new database connection for each request
app.use(async (req, res, next) => {
  req.db = await createDbConnection();
  next();
});

// Register a new user
app.post('/register', async (req, res) => {
  const { username, password,tel} = req.body;
  const connection = req.db;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await connection.execute('INSERT INTO mygniusers (username, password) VALUES (?,?)', [username, hashedPassword]);
    res.status(200).render('successful-login.html')
  } catch (error) {
    console.error('Error inserting data: ' + error.stack);
    res.status(500).json({ error: 'Error registering user' });
  } finally {
    connection.end();
  }
});

// Login user
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const connection = req.db;

  try {
    // Your login code here...

    const [rows] = await connection.execute('SELECT * FROM mygniusers WHERE username = ?', [username]);

    if (rows.length === 1) {
      const user = rows[0];
      const hashedPassword = user.password;

      const validPassword = await bcrypt.compare(password, hashedPassword);

      if (validPassword) {
        req.session.authenticated = true;
        res.redirect('/home');
        return;
      }
    }

    res.status(401).send('Login failed. Invalid username or password.');

  } catch (error) {
    // Error handling...
    console.error('Error querying data: ' + error.stack);
    res.status(500).json({ error: 'Error querying data' });

  } finally {
    connection.end();
  }
});



// Contact page
app.post('/contact', async (req, res) => {
  const { firstname, lastname, institution, branch, message } = req.body;
  const connection = req.db;

  try {
    // SQL query to insert data into the 'contacts' table
    await connection.execute('INSERT INTO contacts (firstname, lastname, institution, branch, message) VALUES (?, ?, ?, ?, ?)', [firstname, lastname, institution, branch, message]);
    res.status(201).send('Contact form submitted successfully');
  } catch (error) {
    console.error('Error inserting contact data: ' + error.stack);
    res.status(500).json({ error: 'Error submitting contact form' });
  } finally {
    connection.end();
  }
});

// Your other routes...
// Home page
app.get('/home', (req, res) => {
  if (req.session.authenticated) {
    res.render('home.html');
  } else {
    res.redirect('/login');
  }
});

app.get("/login", (req, res) => {
  res.status(200).render("login.html");
});

app.get('/register',(req,res)=>{
  res.status(200).render('register.html')
})

app.post("/home", (req, res)=>{ 
  res.status(200).render('home.html')
});

app.post("/home", (req, res)=>{ 
  res.status(200).render('home.html')
});

app.get("/about", (req, res)=>{ 
  res.status(200).render('about.html')
});

app.get("/attendance", (req, res)=>{ 
  res.status(200).render('attendance.html')
});

app.get("/resources", (req, res)=>{ 
  res.status(200).render('resources.html')
});

app.get("/updates", (req, res)=>{ 
  res.status(200).render('updates.html')
});

app.get("/contact", (req, res)=>{ 
  res.status(200).render('contact.html')
});

app.listen(port, () => {
  console.log(`The app is successfully running on ${port}`);
});
