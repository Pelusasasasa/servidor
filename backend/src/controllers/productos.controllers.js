const productosCTRL = {};

const Productos = require("../models/producto");

productosCTRL.traerProductos = async(req,res)=>{
    const {texto,tipoBusqueda} = req.params;
    console.log(texto,tipoBusqueda)
    if(texto[0] === "*"){
            const contenga = texto.substr(1);
            const re = new RegExp(`${contenga}`)
            productos = await Productos.find({[tipoBusqueda]: {$regex: re, $options: 'i'}}).sort({descripcion: 1}).limit(50)
    }else if(texto !== "textoVacio"){
        console.log("b")
               const re = new RegExp(`^${texto}`)
            productos = await Productos.find({[tipoBusqueda]: {$regex: re,$options:'i'}}).sort({descripcion: 1}).limit(50)
    }else if(tipoBusqueda === "dolar"){
            productos = await Productos.find({costodolar: {$not:{$eq:0}}});
    }else{
            productos = await Productos.find().sort({descripcion: 1}).limit(50);

    }
    res.send(productos)
}

productosCTRL.getproducto = async(req,res)=>{
    const {id} = req.params
    let producto
    if(id === "stockNegativo"){
        productos = await Productos.find({stock:{$lt: 0}})
        res.send(productos)
    }else{
        producto = await Productos.find({ _id: id })
        // producto[0].imgURL = `../../Imagenes/${id}.jpg`;
        res.send(producto[0])
    }

}

productosCTRL.crearProducto = async(req,res)=>{
    const productonuevo = new Productos(req.body);
    await productonuevo.save();
    console.log(`Producto ${req.body.descripcion} Creado`)
    res.send("Producto Cargado")
}

productosCTRL.modificarProducto = async(req,res)=>{
    const {id} = req.params;
    const productoModificado = await Productos.findByIdAndUpdate({_id:id},req.body);
    console.log(`Producto ${req.body.descripcion} modificado`)
    res.send("Producto Modificado")
}

productosCTRL.borrarProducto = async(req,res)=>{
    const {id} = req.params;
    await Productos.findByIdAndDelete({_id:id})
    console.log(`Producto ${id} borrado`)
    res.send("Producto Borrado")
}

productosCTRL.traerProductosPorRango = async(req,res)=>{
    const {desde,hasta} = req.params;
    const productos = await Productos.find({$and: [{_id:{$gte: desde}},{_id:{$lte: hasta}}]});
    res.send(productos);
}

productosCTRL.traerMarcas = async(req,res)=>{
    const productos = await Productos.find({},{_id:0 , marca:1})
    let marcas = []
    productos.filter((ele)=>{
        if(!marcas.includes(ele.marca)){
            marcas.push(ele.marca)
        }
    })
    res.send(marcas)
}


productosCTRL.productosPorMarca = async(req,res)=>{
    const {marca} = req.params;
    console.log(marca)
    const productos = await Productos.find({marca:marca});
    res.send(productos)
}

module.exports = productosCTRL;