const pdfCTRL = {};

const pdf = require('html-pdf');
const qrcode = require('qrcode');


const fs = require('fs');

const path = require('path');

let html = fs.readFileSync(__dirname + '/pdf.html','utf8');


pdfCTRL.crearPdf = async(req,res)=>{

    const [venta,cliente,{QR,cae,vencimientoCae,texto}] = req.body;
    let trs = "";
    venta.productos.forEach(({objeto,cantidad})=>{
        trs = trs + `<tr>
                            <td>${objeto._id}</td>
                            <td>${objeto.descripcion}</td>
                            <td class="izquierda">${parseFloat(cantidad).toFixed(2)}</td>
                            <td class="izquierda">${objeto.unidad}</td>

                            ${venta.condIva !== "Inscripto" ? `<td class="izquierda">${parseFloat(objeto.precio_venta).toFixed(2)}</td>` : ""}

                            ${(venta.condIva === "Inscripto" && objeto.iva === "N") ? `<td class="izquierda">${(parseFloat(objeto.precio_venta)/1.21).toFixed(2)}</td>` : ""}

                            ${(venta.condIva === "Inscripto" && objeto.iva === "R") ? `<td class="izquierda">${(parseFloat(objeto.precio_venta)/1.105).toFixed(2)}</td>` : ""}
                            
                            ${venta.condIva !== "Inscripto" ? `<td class="izquierda">${(parseFloat(cantidad)*parseFloat(objeto.precio_venta)).toFixed(2)}</td>` : ""}

                            ${(venta.condIva === "Inscripto" && objeto.iva === "N") ? `<td class="izquierda">${((parseFloat(cantidad)*parseFloat(objeto.precio_venta))/1.21).toFixed(2)}</td>`  : ""}

                            ${(venta.condIva === "Inscripto" && objeto.iva === "R") ? `<td class="izquierda">${((parseFloat(cantidad)*parseFloat(objeto.precio_venta))/1.105).toFixed(2)}</td>`  : ""}

                            ${(venta.condIva === "Inscripto" && objeto.iva === "N") ? `<td class="izquierda">21%</td>`  : "" }
                            ${(venta.condIva === "Inscripto" && objeto.iva === "R") ? `<td class="izquierda">10.5%</td>`  : "" }

                            ${(venta.condIva === "Inscripto") ? `<td class="izquierda">${(parseFloat(cantidad)*parseFloat(objeto.precio_venta)).toFixed(2)}</td>`  : "" }
                       </tr>`;
    });

    const date = new Date(venta.fecha);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    day = day < 10 ? `0${day}` : day;
    month = month < 10 ? `0${month}` : month;
    month = month===13 ? 1 : month;
    
    const codigoComprobante = verCodigoComp(venta.cod_comp);
    const tipoCompropobante = verTipoComp(venta.cod_comp);
    
    
    // const qr = (await qrcode.toDataURL(QR)).split('/\r\n|\r|\n/');
    const a = await generarQR(texto);
    
    const img = (await qrcode.toDataURL(a));


    //Generamos el qr
    async function generarQR(texto) {
        const url = `https://www.afip.gob.ar/fe/qr/?p=${texto}`;
        return url
    }


    html = html.replace('{{image}}', img);
    html = html.replace('{{cae}}', cae);
    html = html.replace('{{vencimientoCae}}', vencimientoCae);



    const config = {
         "height": "10.5in", "width": "8in",  "format" : "A4", "type": "pdf", "zoomFactor": "0.65",
         header:{
             "contents":`
                <header>
                    <div class="izquierdo">
                        <p>GIANOVI MARINA ISABEL</p>
                        <p>Razon Social:<span> GIANOVI MARINA ISABEL</span></p>
                        <p>Domicilio Comercial:<span> Av. 9 De Julio 3380 - Chajari, Entre Rios</span></p>
                        <p>Condicion Frente al IVA:<span> IVA Responsable Inscripto</span></p>
                    </div>
                    <div class="tipoFactura">
                        <div class="div">
                            <h2>${tipoCompropobante}</h2>
                            <p>${codigoComprobante}</p>
                        </div>
                    </div>
                    <div class="derecha">
                        <p>FACTURA</p>
                        <p>Punto de Venta:<span> 00004</span> Comp.Nro: <span>${venta.nro_comp.split("-")[1]}</span></p>
                        <p>Fecha de Emision: <span>${day}/${month}/${year}</span></p>
                        <p>CUIT:<span> 27165767433</span></p>
                        <p>Ingresos brutos:<span> 27165767433</span></p>
                        <p>Fecha de Inicio de Actividades:<span>01/09/2007</span></p>
                    </div>
                </header>
                <main class="cliente">
                        <section>
                            <p>Apellido y Nombre / Razon Social:<span>${venta.nombreCliente}</span></p>
                            <p>${venta.dnicuit.length === 8 ? 'DNI' : 'CUIT'}:<span>${venta.dnicuit}</span></p>
                        </section>
                        <section>
                            <p>Condicion frente al IVA:<span>${venta.condIva === "" ? "Consumidor Final" : venta.condIva}</span></p>
                            <p>Domicilio Comercial:<span></span></p>
                        </section>
                        <section class="condicion">
                            <p>Condicion de Venta:<span>${venta.tipo_pago === "CC" ? "Cuenta Corriente" : "Contado"}</span></p>
                        </section>
                </main>
                <main class="productos">
                    <table>
                        <thead>
                            <tr>
                                <td>Codigo</td>
                                <td>Producto/Servicio</td>
                                <td>Cantidad</td>
                                <td>U. Medida</td>
                                <td>Precio Unit.</td>
                                <td>Subtotal</td>
                                ${venta.condIva === "Inscripto" ? `<td>Alicuota IVA</td>` : ""}
                                ${venta.condIva === "Inscripto" ? `<td>Subtotal c/IVA</td>` : ""}
                            </tr>
                        </thead>
                        <tbody>
                            ${trs}
                        </tbody>
                    </table>
                </main>
                <main class="totales">
                    <div>
                        <img src=${img} alt="2" />
                    </div>

                    <div>
                        <p>CAE Nº: <span>${cae}</span></p>
                        <p>Fecha de Vto. de CAE: <span>${vencimientoCae}</span></p>
                    </div>
                    <div>
                        ${venta.condIva === "Inscripto" ? `<p class="IVA neto">Importe Neto Gravado:$<span>${venta.gravado21 + venta.gravado105}</span></p>` : ""}
                        ${venta.condIva === "Inscripto" ? `<p class="IVA iva21">IVA 21%:$<span>${venta.iva21.toFixed(2)}</span></p>` : ""}
                        ${venta.condIva === "Inscripto" ? `<p class="IVA iva105">IVA 10.5%:$<span>${venta.iva105.toFixed(2)}</span></p>` : ""}
                        ${venta.condIva !== "Inscripto" ? `<p class="SinIVA">Subtotal<span>${venta.precioFinal}</span></p>` : ""}
                        <p>Descuento:$ <span>${parseFloat(venta.descuento).toFixed(2)}</span></p>
                        <p class='importeTotal'>Importe Total:$      <span>${venta.precioFinal - parseFloat(venta.descuento)}</span></p>
                    </div>
                </main>
             `
            },        
        };
        pdf.create(html,config).toFile(`pdfs/${venta.nro_comp}.pdf`,(err,res)=>{
            if (err) {
                console.log(err);
            }else{
                console.log(res)
            }
        })
        res.send("a");
}



const verCodigoComp = (codigoComprobante)=>{
    if (codigoComprobante === 6) {
        return "Cod: 006"
    }else if(codigoComprobante === 1){
        return "Cod: 001"
    }else if(codigoComprobante === 3){
        return "Cod: 003"
    }else if(codigoComprobante === 4){
        return "Cod: 004"
    }else if(codigoComprobante === 8){
        return "Cod: 008"
    }else if(codigoComprobante === 9){
        return "Cod: 009"
    }
}

const verTipoComp = (codigo)=>{
    if(codigo === 1 || codigo === 4 ||  codigo === 3){
        return "A"
    }else{
        return "B"
    }
}

module.exports = pdfCTRL;



