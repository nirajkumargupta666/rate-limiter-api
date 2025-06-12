const express = require('express');
const routes = require('./routes');
require('./services/mqConsumer');
const morgan = require('morgan');
const cors = require('cors');



const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api', routes);

app.listen(3000, () => console.log('API server running on port 3000'));
