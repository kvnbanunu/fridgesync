require('dotenv').config();  // Load environment variables
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Routes go here

app.listen(PORT, () => {
    console.log(`Server is running on port:{PORT}`);
});
