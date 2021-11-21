const express = require('express');
const cors = require('cors')
const app = express()

//settings
app.set('port',process.env.PORT || 4000);

//middlewares
app.use(cors());
app.use(express.json())


//routes
app.use('/api/usuarios',require('./routes/usuarios'))
app.use('/api/clientes',require('./routes/clientes'))
app.use('/api/pedidos',require('./routes/pedidos'))

module.exports = app