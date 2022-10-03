let producto;
let acumulador = 0;
let precio


do{
    producto = prompt("*****CARRITO DE COMPRAS*****\nIngrese el numero del producto que desea comprar\nLos productos disponibles son:\n1-shampoo\n2-cera\n3-guante\nEscriba 4 para salir.");
        if(producto!="4"){
            switch (producto){
                case "1":
                    precio = 1500;
                    console.log("shampoo = $1500");
                    break;
                case "2":
                    precio = 800;
                    console.log("cera = $800");
                    break;
                case "3":
                    precio = 500;
                    console.log("guante = $500");
                    break;
                default:
                    console.log("Producto sin stock");
                    break;
            }
            acumulador = acumulador + precio;
            precio = 0;
        }
}while(producto!="4")
console.log("Precio total de los productos: "+acumulador);


function sumarIva(precio){
    return precio * 1.21;
}
let precioConIva = sumarIva(acumulador);
console.log("El precio final con iva es: "+precioConIva);

let metodoPago = prompt("Que metodo de pago quiere utilizar?\n1-Efectivo\n2-Tarjeta de credito\nAbonando en efectivo tiene un 10% de descuento.");
if(metodoPago == "1"){
    precioFinal = precioConIva * 0.90;
}else{
    precioFinal = precioConIva;
}
console.log("El total a abonar es de $ "+precioFinal);