const {Schema,model} = require('mongoose');

const MovCaja = new Schema({

    fecha:{
        type:Date,
        default:Date.now,
    },
    tMov:String,
    tPago:String,
    nro_comp:String,
    desc:{
        type:String,
        default:""
    },
    imp:{
        type:Number,
        default:0
    },
    cuenta:String,
    obs:{
        type:String,
        default:""
    }

});

module.exports = model('MovCaja',MovCaja);