const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config()
const PORT = process.env.PORT;
const routes = require('./src/d_routes/routes');
app.use(express.json());
app.use(cors());
const globalMiddlewares = require('./src/middlewares/global_middlewares/global_middlewares');

//GLOBAL MIDDLEWARES
globalMiddlewares(app);

//ROUTES
routes(app);

//PORT LISTEN
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
