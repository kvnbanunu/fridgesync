const db = require('../database');

exports.populate = () => {
    db.serialize(() => {
        // Insert dummy users
        db.run(`INSERT INTO user (username, password) VALUES 
            ('alice', 'password123'), 
            ('bob', 'secret456'), 
            ('charlie', 'mypassword789')`
        );

        // Insert dummy items
        db.run(`INSERT INTO item (name, category) VALUES 
            ('Milk', 'Dairy'), 
            ('Bread', 'Grain'), 
            ('Eggs', 'Protein'), 
            ('Apple', 'Fruit'), 
            ('Cheese', 'Dairy')`
        );

        // Insert dummy user items (inventory)
        db.run(`INSERT INTO useritem (userid, itemid, quantity, expirydate) VALUES 
            (1, 1, 2, '2024-10-10'), 
            (1, 2, 1, '2024-10-08'), 
            (2, 3, 12, '2024-10-12'), 
            (3, 4, 5, '2024-10-09'), 
            (2, 5, 3, '2024-10-15')`
        );

        // Insert dummy recipes
        db.run(`INSERT INTO recipe (name) VALUES 
            ('Grilled Cheese Sandwich'), 
            ('Apple Pie'), 
            ('Omelette')`
        );

        // Insert dummy recipe items (ingredients for recipes)
        db.run(`INSERT INTO recipeitems (recipeid, itemid, quantity) VALUES 
            (1, 2, 2),  -- Bread for Grilled Cheese Sandwich
            (1, 5, 1),  -- Cheese for Grilled Cheese Sandwich
            (2, 4, 3),  -- Apple for Apple Pie
            (3, 3, 2),  -- Eggs for Omelette
            (3, 5, 1)   -- Cheese for Omelette`
        );

        // Insert dummy user recipes (users who have these recipes)
        db.run(`INSERT INTO userrecipe (userid, recipeid) VALUES 
            (1, 1),  -- Alice has Grilled Cheese Sandwich recipe
            (2, 3),  -- Bob has Omelette recipe
            (3, 2)   -- Charlie has Apple Pie recipe`
        );
    });
};