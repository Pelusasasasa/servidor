const fiscalCTRL = {}
const {DBFFile} = require('dbffile')
const fs = require('fs')
const path = 'C:\\Users\\Electro Avenida\\Desktop\\Fiscal\\'


fiscalCTRL.informacionFiscal = async(req,res) =>{
    const {fieldDescriptors,records} = req.body

    if (fs.existsSync(`${path}fiscal.dbf`)) {
        let dbf = await DBFFile.open(`${path}fiscal.dbf`);
        await dbf.appendRecords(records);
    }else{
        let dbf = await DBFFile.create( `${path}fiscal.dbf`,fieldDescriptors);
        await dbf.appendRecords(records);
    }
}

module.exports = fiscalCTRL