const itemCTRL = {};
const {DBFFile} = require('dbffile');
const fs = require('fs')
const path = "C://Users//Electro Avenida//Desktop//Fiscal//"


itemCTRL.informacionItem = async(req,res)=>{
    const {fieldDescriptors,datosAGuardar} = req.body
    if (fs.existsSync(`${path}Item.dbf`)) {
        let dbf = await DBFFile.open(`${path}Item.dbf`);
        await dbf.appendRecords(datosAGuardar);
    }else{
        let dbf = await DBFFile.create( `${path}Item.dbf`,fieldDescriptors);
        await dbf.appendRecords(datosAGuardar);
    }    
}

module.exports = itemCTRL