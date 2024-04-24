const express = require('express');
const app = express();
const connection = require('./db')

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', (req,res) => {
    console.log('Welcome to my Hotel! How can i help you?');
})


// Import the Routing files
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');


// Use the Routers
app.use('/person',personRoutes);
app.use('/menu',menuItemRoutes);


app.listen(3000, () => {
    console.log('Listning to port 3000...');
})