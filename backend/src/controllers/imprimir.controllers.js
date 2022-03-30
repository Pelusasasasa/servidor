const imprimirCTRL = {};
const ConectorPlugin = require('../ConectorPlugin')

imprimirCTRL.imprimir = async(req,res)=>{
    const imprimirVenta = (arreglo)=>{
        const conector = new ConectorPlugin();
        const ponerValores = (cliente,Venta,{QR,cae,vencimientoCae})=>{
            const fechaVenta = new Date(Venta.fecha)
            let dia = fechaVenta.getDate()
            let mes = fechaVenta.getMonth()+1;
            let horas = fechaVenta.getHours();
            let minutos = fechaVenta.getMinutes();
            let segundos = fechaVenta.getSeconds();
            dia = dia<10 ? `0${dia}` : dia;
            mes = mes<10 ? `0${mes}` : mes;
            horas = horas<10 ? `0${horas}` : horas;
            let anio = fechaVenta.getFullYear()
            const comprobante = verTipoComp(Venta.cod_comp)
            conector.cortar()
            conector.establecerTamanioFuente(2,2);
            conector.establecerFuente(ConectorPlugin.Constantes.FuenteC)
            conector.establecerJustificacion(ConectorPlugin.Constantes.AlineacionCentro);
            conector.texto("*ELECTRO AVENIDA*\n")
            conector.establecerJustificacion(ConectorPlugin.Constantes.AlineacionIzquierda);
            conector.establecerTamanioFuente(1,1);
            conector.texto("GIANOVI MARINA ISABEL\n");
            conector.texto("INGRESO BRUTOS: 27165767433\n")
            conector.texto("C.U.I.T Nro: 27165767433\n");
            conector.texto("AV.9 DE JULIO-3380 (3228);CHAJARI E.R.\n");
            conector.texto("INICIO DE ACTIVIDADES: 02-03-07\n");
            conector.texto("IVA RESPONSABLE INSCRIPTO\n");
            conector.texto("------------------------------------------\n");
            conector.texto(`${comprobante}   ${Venta.nro_comp}\n`);
            conector.texto(`FECHA: ${dia}-${mes}-${anio}    Hora:${horas}:${minutos}:${segundos}\n`);
            conector.texto("------------------------------------------\n");
            conector.texto(`${cliente.cliente}\n`);
            conector.texto(`Dni O Cuit: ${cliente.cuit}\n`);
            conector.texto(`${Venta.condIva}\n`);
            conector.texto(`${cliente.direccion}   ${cliente.localidad}\n`);
            Venta.numeroAsociado && conector.texto(`${Venta.numeroAsociado}\n`);
            conector.texto("------------------------------------------\n");
            conector.texto("CANTIDAD/PRECIO UNIT (%IVA)\n")
            conector.texto("DESCRIPCION           (%B.I)       IMPORTE\n")  
            conector.texto("------------------------------------------\n");
            Venta.productos && Venta.productos.forEach(({cantidad,objeto})=>{
                if (Venta.condIva === "Inscripto") {
                    conector.texto(`${cantidad}/${objeto.iva === "N" ? (parseFloat(objeto.precio_venta)/1.21).toFixed(2) : (parseFloat(objeto.precio_venta)/1.105.toFixed(2))}              ${objeto.iva === "N" ? "(21.00)" : "(10.50)"}\n`);
        
                    conector.texto(`${objeto.descripcion.slice(0,30)}    ${(parseFloat(cantidad)*parseFloat(objeto.iva === "N" ? parseFloat(objeto.precio_venta)/1.21 : parseFloat(objeto.precio_venta)/1.105)).toFixed(2)}\n`);
                }else{
                    conector.texto(`${cantidad}/${objeto.precio_venta}              ${objeto.iva === "N" ? "(21.00)" : "(10.50)"}\n`);
                    conector.texto(`${objeto.descripcion.slice(0,30)}    ${(parseFloat(cantidad)*parseFloat(objeto.precio_venta)).toFixed(2)}\n`);
                }
        
            })
        
            if (Venta.condIva === "Inscripto") {
                if (venta.gravado21 !== 0) {
                    conector.feed(2);
                    conector.texto("NETO SIN IVA              " + Venta.gravado21.toFixed(2) + "\n" );
                    conector.texto("IVA 21.00/              " +  Venta.iva21.toFixed(2) + "\n" );
                    conector.texto("NETO SIN IVA              0.00" + "\n" );
                }
                if (venta.gravado105 !== 0) {
                    conector.feed(2);
                    conector.texto("NETO SIN IVA              " + Venta.gravado105.toFixed(2) + "\n");
                    conector.texto("IVA 10.50/              " + Venta.iva105.toFixed(2) + "\n");
                    conector.texto("NETO SIN IVA              0.00"  + "\n");
                }
            }
            conector.feed(2);
            conector.establecerTamanioFuente(2,1);
            conector.texto("TOTAL        $" +  Venta.precioFinal + "\n");
            conector.establecerTamanioFuente(1,1);
            conector.texto("Recibimos(mos)\n");
            conector.texto(`${Venta.tipo_pago === "CD" ? `Efectivo                  ${Venta.precioFinal}`  : "Cuenta Corriente"}` + "\n");0
            conector.establecerTamanioFuente(2,1);
            conector.texto("CAMBIO         $0.00\n");
            conector.establecerJustificacion(ConectorPlugin.Constantes.AlineacionCentro);
            conector.texto("*MUCHA GRACIAS*\n")
            conector.qrComoImagen(QR);
            conector.establecerJustificacion(ConectorPlugin.Constantes.AlineacionIzquierda);
            conector.establecerTamanioFuente(1,1);
            conector.texto("CAE:" + "                  " + "Vencimiento CAE:" + "\n")
            conector.texto(cae + "           " + vencimientoCae + "\n")
            conector.feed(3)
            conector.cortar()
        
            conector.imprimirEn("SAM4S GIANT-100")
                .then(respuestaAlImprimir => {
                    if (respuestaAlImprimir === true) {
                        console.log("Impreso correctamente");
                    } else {
                        console.log("Error. La respuesta es: " + respuestaAlImprimir);
                    }
                });
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
        
        const [Venta,Cliente,valoresQR] = arreglo;
        ponerValores(Cliente,Venta,valoresQR)
        }
        imprimirVenta(req.body);
        res.send("impreso")
}

module.exports = imprimirCTRL;