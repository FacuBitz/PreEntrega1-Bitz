const productos = [
    { nombre: "shampoo", precio: 1500},
    { nombre: "cera", precio: 800},
    { nombre: "guante", precio: 500},
];

function buscarPrecio(productos){
    return productos.nombre == producto;
}
let carrito = []

let seleccion = prompt("*****CARRITO DE COMPRAS*****\nBienvenido! Desea comprar algun producto?\nPresione 'si' para ver el catalogo o 'no' para salir.").toLowerCase();

while (seleccion != "si" && seleccion != "no"){
    alert("Por favor ingrese si o no para continuar")
    seleccion = prompt("*****CARRITO DE COMPRAS*****\nBienvenido! Desea comprar algun producto?\nPresione 'si' para ver el catalogo o 'no' para salir.").toLowerCase();
}

if (seleccion == "si"){
    alert("A continuacion nuestro catalogo...")
    let catalogo = productos.map((producto) => producto.nombre+" "+"$"+producto.precio);
    alert(catalogo.join("\n"))
    do{
        producto = prompt("Agregue el nombre del producto que quiere comprar\nPresione 1 para salir").toLowerCase();
            if(producto!="1"){
                switch (producto){
                    case "shampoo":
                        precio = productos.find(buscarPrecio).precio;
                        console.log("shampoo = $"+precio);
                        break;
                    case "cera":
                        precio = productos.find(buscarPrecio).precio;
                        console.log("cera = $"+precio);
                        break;
                    case "guante":
                        precio = productos.find(buscarPrecio).precio;
                        console.log("guante = $"+precio);
                        break;
                    default:
                        console.log("Producto sin stock");
                        precio = 0;
                        break;
                }
                if(precio != 0){
                    let unidades = parseInt(prompt("Ingrese cantidad de unidades"));
                    if(isNaN(unidades)){
                        alert("Ingrese un numero valido!")
                        console.log("Cantidad no definida")
                    }else{
                        carrito.push({producto, unidades, precio});
                        console.log(carrito);
                    }
                }else{
                    alert("Producto no encontrado")
                }
            }
    } while (producto!="1")
    carrito.forEach((carritoFinal) => {
        console.log(`producto: ${carritoFinal.producto}, unidades: ${carritoFinal.unidades},
        total a pagar por producto ${carritoFinal.unidades * carritoFinal.precio}`)
    })

    const total = carrito.reduce((acc, el) => acc + el.precio * el.unidades, 0);
    console.log("El total a pagar por su compra es: "+total);

    function sumarIva(precio){
        return precio * 1.21;
    }
    let precioConIva = sumarIva(total);
    console.log("El precio final con iva es: $"+precioConIva);
    
    function descontar(precio){
        return precio * 0.90;
    }
    let precioDescuento = descontar(precioConIva);
    
    let metodoPago = prompt("Que metodo de pago quiere utilizar?\n1-Efectivo\n2-Tarjeta de credito\nAbonando en efectivo tiene un 10% de descuento."); 
    while (metodoPago != 1 && metodoPago != 2){
        alert("Por favor ingrese 1 o 2 para continuar")
        metodoPago = prompt("Que metodo de pago quiere utilizar?\n1-Efectivo\n2-Tarjeta de credito\nAbonando en efectivo tiene un 10% de descuento.");
    }
    if(metodoPago == "1"){
        precioFinal = precioDescuento;
    }else{
        precioFinal = precioConIva;
    }
    console.log("El total a abonar es de $ "+Math.round(precioFinal));
    alert("Gracias por su compra!");

} else if (seleccion == "no"){
    alert("Gracias por venir, vuelva pronto!")
}