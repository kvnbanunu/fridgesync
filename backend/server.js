// Dependencies
require("dotenv").config(); // Load environment variables
const express = require("express");
const bodyParser = require("body-parser"); // Could remove
const session = require("express-session"); // Sessions middleware
const bcrypt = require("bcryptjs"); // For password hashing
const cors = require("cors");
const OAuth = require("oauth");
const request = require("request"); // For fatsecret
const { z } = require("zod");
const { zodResponseFormat } = require("openai/helpers/zod");

const app = express();

// Modules
const openai = require("./openai");
const db = require("./database");
const userModel = require("./models/userModel");
const itemModel = require("./models/itemModel");
const dummy = require("./models/dummydata");

const PORT = process.env.PORT;
const SESSION_SECRET = process.env.NODE_SESSION_SECRET;

//OAuth 2.0
const FS_CLIENTID = process.env.FAT_SECRET_CLIENTID;
const FS_CLIENT_SECRET = process.env.FAT_SECRET_CLIENT_SECRET;

//OAuth 1.0
const FS_KEY = process.env.FAT_SECRET_CONSUMER_KEY;
const FS_SECRET = process.env.FAT_SECRET_CONSUMER_SECRET;
const oauth = new OAuth.OAuth(
  null,
  null,
  FS_KEY,
  FS_SECRET,
  "1.0",
  null,
  "HMAC-SHA1"
);

// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(
  session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
  })
);

// Auth middleware
function isAuthenticated(req, res, next) {
  if (req.session.userId) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
}

// Basic prompt function
const generateText = async (prompt) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        {
          role: "user",
          content: prompt,
        },
      ],
    });
    // TODO: Change this
    console.log("Generated Text:", response.choices[0].message.content);
    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error with OpenAI API:", error);
  }
};

// Example for searching food USAGE: searchFood('apple')
const searchFood = (searchTerm) => {
  const url = `https://platform.fatsecret.com/rest/server.api?method=foods.search&format=json&search_expression=${encodeURIComponent(
    searchTerm
  )}`;
  oauth.get(url, null, null, (err, data, response) => {
    if (err) {
      console.error("Error: ", err);
    } else {
      // Change to return I guess
      console.log("Response: ", JSON.parse(data));
      return JSON.parse(data);
    }
  });
};

app.get("/", (req, res) => {
  res.send("OK");
});

// Get all your items in the fridge
app.get("/fridgeitems", (req, res) => {
  const query = `SELECT * FROM useritem
    INNER JOIN item ON item.id = useritem.itemid
    WHERE userid = ?
    ORDER BY quantity ASC`;
  db.all(query, [1], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
});

app.get("/recipeswithingredients", (req, res) => {
  const query = `SELECT recipe.name recipe, recipeid, quantity, item.name item 
    FROM userrecipe
    LEFT JOIN recipe ON recipe.id = userrecipe.recipeid
    LEFT JOIN recipeitems ON recipeitems.recipeid = userrecipe.recipeid
    LEFT JOIN item ON item.id = recipeitems.itemid
    WHERE userid = ?`;
  db.all(query, [1], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
});

app.get("/recipes", (req, res) => {
  const query = `SELECT * FROM userrecipe
    INNER JOIN recipe ON recipe.id = userrecipe.recipeid
    WHERE userid = ?`;
  db.all(query, [1], (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
});

// So the idea for this is a button on either your fridge or recipes that says "Recommend me a recipe!"
// And this will take into consideration what you got then populate the your recipes.
app.get("/recommendrecipes", async (req, res) => {
  try {
    let itemprompt = "";
    const query = `SELECT item.name name, quantity
        FROM useritem
        INNER JOIN item ON item.id = useritem.itemid
        WHERE userid = ?`;
    db.each(query, [1], (err, row) => {
      if (err) {
        throw err;
      }
      itemprompt += `Item: ${row.name} Quantity: ${row.quantity}, `;
    });
    console.log(itemprompt);

    const prompt = `Recommend me 3 recipes that I can make with the following ingredients: ${itemprompt}.
        `;

    const Ingredient = z.object({
      item: z.string(),
      quantity: z.number(),
    });
    const Recipe = z.object({
      name: z.string(),
      ingredients: z.array(Ingredient),
    });
    const RecipeResponse = z.object({
      recipes: z.array(Recipe),
    });

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You give me recipes in JSON data." },
        {
          role: "user",
          content: prompt,
        },
      ],
      response_format: zodResponseFormat(RecipeResponse, "recipe_response"),
    });

    console.log(
      "Generated Text:",
      JSON.parse(response.choices[0].message.content)
    );
    res.json(JSON.stringify(response.choices[0].message.content));
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "Failed to retrieve data or error with OPENAI API" });
  }
});

app.get("/insertdummydata", (req, res) => {
  dummy.populate();
  res.send("Hopefully the database was populated");
});

app.post("/insertitem", (req, res) => {
  db.run(`INSERT OR IGNORE INTO item (name, category) VALUES (?, ?)`, [
    req.body.name,
    req.body.category,
  ]);
  db.get(`SELECT id FROM item WHERE name = ?`, [req.body.name], (err, id) => {
    if (err) {
      res.status(500).json({ message: "Error inserting item" });
    } else {
      const itemid = id.id;
      db.run(
        `INSERT INTO useritem (userid, itemid, quantity, expirydate) VALUES (?, ?, ?, ?)`,
        [1, itemid, req.body.quantity, req.body.expirydate]
      );
      res.json({ message: "Added item successfully" });
    }
  });
});

app.post("/prompt", async (req, res) => {
  const prompt = req.body.message;
  console.log(prompt); // delete this
  const message = await generateText(JSON.stringify(prompt));
  res.json(message);
});

// This kinda works
app.post("/food", (req, res) => {
  const prompt = req.body.message;
  const food = searchFood(prompt);
  res.json(food);
});

app.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  // Hash the password using bcryptjs
  const hashedPassword = await bcrypt.hash(password, 10);

  userModel.addUser(username, hashedPassword, (err, result) => {
    if (err) {
      res.status(500).json({ error: "Failed to sign up user" });
    } else {
      res.json({ message: "User signed up successfully", userId: result.id });
    }
  });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Find the user by username
  userModel.getUserByUsername(username, async (err, user) => {
    if (err || !user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    req.session.userId = user.id;
    res.json({ message: "Login successful" });
  });
});

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to log out" });
    }
    res.json({ message: "Logged out successfully" });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`);
});
