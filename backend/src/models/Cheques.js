const {model,Schema} = require('mongoose');

const Cheque = new Schema({
    f_recibido:{
        type:Date,
    },
    n_cheque:{
        type:Number,
        default:00000000
    },
    banco:{
        type:String,
        default:""
    },
    plaza:{
        type:String,
        default:""
    },
    f_cheque:{
        type:Date
    },
    i_cheque:{
        type:Number,
        default:0
    },
    ent_por:{
        type:String,
        default:""
    },
    entreg_a:{
        type:String,
        default:""
    },
    dom:{
        type:String,
        default:""
    },
    tel:{
        type:String,
        default:""
    },
    tipo:{
        type:String,
        default:""
    },
    f_entragado:{
        type:Date
    }
});

module.exports = model('Cheque',Cheque)
