const pdfCTRL = {};
const pdfPrinter = require('pdfmake');
const fs = require('fs');

pdfCTRL.crearPdf = async(req,res)=>{
    const [venta,cliente,{QR,cae,vencimientoCae}] = req.body;

    const fonts = {
        Roboto:{
            normal: Buffer.from(
                require("pdfmake/build/vfs_fonts.js").pdfMake.vfs["Roboto-Regular.ttf"],
                "base64"
            ),
            bold: Buffer.from(
                require("pdfmake/build/vfs_fonts.js").pdfMake.vfs["Roboto-Medium.ttf"],
                "base64"
            ),
        },
    }
     const comprobante = verTipoComp(venta.cod_comp);
     const fechaVenta = new Date(venta.fecha)
     let dia = fechaVenta.getDate()
     let mes = fechaVenta.getMonth()+1;
     let horas = fechaVenta.getHours();
     let minutos = fechaVenta.getMinutes();
     let segundos = fechaVenta.getSeconds();
     dia = dia<10 ? `0${dia}` : dia;
     mes = mes<10 ? `0${mes}` : mes;
     horas = horas<10 ? `0${horas}` : horas;
     let anio = fechaVenta.getFullYear()

    let docDefenition = {


        content:[
            {text:"*ELECTRO AVENIDA*",style:"centro"},
            "GIANOVI MARINA ISABEL",
            "INGRESO BRUTOS: 27165767433",
            "C.U.I.T Nro: 27165767433",
            "AV.9 DE JULION-3380 (3228);CHAJARI E.R.",
            "INICIO DE ACTIVIDADES: 02-03-07",
            "IVA RESPONSABLE INSCRIPTO",
            "------------------------------------------",
            `${comprobante} ${venta.nro_comp}`,
            `FECHA: ${dia}-${mes}-${anio}    Hora:${horas}:${minutos}:${segundos}`,
            "------------------------------------------",
            `${venta.nombreCliente}`,
            `${venta.dnicuit}`,
            `${venta.condIva}`,
            `${cliente.direccion}    ${cliente.localidad}`,
            `${venta.numeroAsocidado ? venta.numeroAsocidado : ""}`,
            "------------------------------------------",
            "CANTIDAD/PRECIO UNIT (%IVA)",
            "DESCRIPCION           (%B.I)       IMPORTE",
            "------------------------------------------",
        ],
        styles: {
            centro: {
                alignment:"center"
            },
            fondo:{
                alignment:"right"
            }
        }
    }
    venta.productos.forEach(({cantidad,objeto}) => {
        if (venta.condIva === "Inscripto") {
            docDefenition.content.push(`${cantidad}/${objeto.iva === "N" ? (parseFloat(objeto.precio_venta)/1.21).toFixed(2) : (parseFloat(objeto.precio_venta)/1.105.toFixed(2))}              ${objeto.iva === "N" ? "(21.00)" : "(10.50)"}\n`);
            docDefenition.content.push(`${objeto.descripcion.slice(0,30)}    ${(parseFloat(cantidad)*parseFloat(objeto.iva === "N" ? parseFloat(objeto.precio_venta)/1.21 : parseFloat(objeto.precio_venta)/1.105)).toFixed(2)}\n`);
        }else{
            docDefenition.content.push(`${objeto.descripcion.slice(0,30)}    ${(parseFloat(cantidad)*parseFloat(objeto.iva === "N" ? parseFloat(objeto.precio_venta)/1.21 : parseFloat(objeto.precio_venta)/1.105)).toFixed(2)}\n`);
            docDefenition.content.push(`${cantidad}/${objeto.precio_venta}              ${objeto.iva === "N" ? "(21.00)" : "(10.50)"}\n`);
            docDefenition.content.push(`${objeto.descripcion.slice(0,30)}    ${(parseFloat(cantidad)*parseFloat(objeto.precio_venta)).toFixed(2)}\n`);
        }
    });
    if (venta.condIva === "Inscripto") {
        if (venta.gravado21 !== 0) {
            docDefenition.content.push("\n");
            docDefenition.content.push("NETO SIN IVA              " + venta.gravado21.toFixed(2) + "\n" );
            docDefenition.content.push("IVA 21.00/                    " +  venta.iva21.toFixed(2) + "\n" );
            docDefenition.content.push("NETO SIN IVA              0.00" + "\n" );
        }
        if (venta.gravado105 !== 0) {
            docDefenition.content.push("\n");
            docDefenition.content.push("NETO SIN IVA              " + venta.gravado105.toFixed(2) + "\n");
            docDefenition.content.push("IVA 10.50/                    " + venta.iva105.toFixed(2) + "\n");
            docDefenition.content.push("NETO SIN IVA              0.00"  + "\n");
        }
    }
    docDefenition.content.push("\n");       
    docDefenition.content.push("TOTAL                             $" + venta.precioFinal);
    docDefenition.content.push("Recibimos(mos)\n");
    docDefenition.content.push(`${venta.tipo_pago === "CD" ? `Efectivo                           $${venta.precioFinal}`  : "Cuenta Corriente"}`);
    docDefenition.content.push("CAMBIO                          $0.00");
    docDefenition.content.push({text:"*MUCHA GRACIAS*",style:"centro"});
    docDefenition.content.push({qr:QR,style:"centro"});
    docDefenition.content.push({text:"CAE:" + cae + "          Vencimiento CAE:"   + vencimientoCae,style:"centro"});

    const printer = new pdfPrinter(fonts);

    let pdfDoc = printer.createPdfKitDocument(docDefenition);
    pdfDoc.pipe(fs.createWriteStream(__dirname + `/pdfs/${venta.nombreCliente}-${venta.nro_comp}.pdf`));
    pdfDoc.end();
}



const verTipoComp = (codigoComprobante)=>{
    if (codigoComprobante === 6) {
        return "Cod: 006 - Factura B"
    }else if(codigoComprobante === 1){
        return "Cod: 002 - Factura A"
    }else if(codigoComprobante === 3){
        return "Cod: 003 - Nota Credito A"
    }else if(codigoComprobante === 4){
        return "Cod: 004 - Recibos A"
    }else if(codigoComprobante === 8){
        return "Cod: 008 - Nota Credito B"
    }else if(codigoComprobante === 9){
        return "Cod: 009 - Recibos B"
    }
}

module.exports = pdfCTRL;