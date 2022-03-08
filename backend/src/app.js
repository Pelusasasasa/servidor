const express = require('express');
const cors = require('cors')
const app = express()
const path = require('path')


//settings
app.set('port',process.env.PORT || 4000);

//middlewares
app.use(cors());
app.use(express.json())

//routes
app.use('/api/usuarios',require('./routes/usuarios'))
app.use('/api/clientes',require('./routes/clientes'))
app.use('/api/pedidos',require('./routes/pedidos'))
app.use('/api/productos',require('./routes/productos'))
app.use('/api/tipoVenta',require('./routes/tipoVenta'))
app.use('/api/movProductos',require('./routes/movProductos'))
app.use('/api/cancelados',require('./routes/cancelados'))
app.use('/api/ventas',require('./routes/ventas'))
//Presupuesto
app.use('/api/presupuesto',require('./routes/presupuesto'))
//CuentaComp
app.use('/api/cuentaComp',require('./routes/cueCorrComp'));
//Cuenta Historica
app.use('/api/cuentaHisto',require('./routes/cueCorrHist'));

module.exports = app