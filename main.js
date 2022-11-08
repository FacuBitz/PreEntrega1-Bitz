let totalCarrito;
let productoEliminado;
let contenedor = document.getElementById("misProd");
let infoTotal = document.getElementById("total");
let botonFinalizar = document.getElementById("finalizar");
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
// si el length del carrito es distinto de 0 es decir que quedo algun producto guardado en el local llama a la funcion para que imprima la tabla con esos productos
if(carrito.length != 0){
    console.log ("Recuperando carrito, no ha finalizado su compra!")
    recuperarTabla();
    console.table(carrito);
}

function recuperarTabla(){
    for(const producto of carrito){
        document.getElementById("tablabody").innerHTML += `
        <tr id="id${producto.id}">
            <td><img src="${producto.foto}" width="40px" height="40px" alt="..."></td>
            <td class="align-middle">${producto.nombre}</td>
            <td class="align-middle restar" id="restar${producto.id}"> - </td>
            <td class="align-middle" id="cantidad${producto.id}">${producto.cantidad}</td>
            <td class="align-middle sumar" id="sumar${producto.id}"> + </td>
            <td class="align-middle">${producto.precio}</td>
            <td class="align-middle"><button type="button" class="btn" id="eliminar${producto.id}">x</button></td>
        </tr>
    `;
    }
    habilitarBtn();
    sumarCantidad();
    restarCantidad();
    totalAPagar();
    eliminar();
}

function renderizarProd(){
    for (const producto of productos){
        contenedor.innerHTML += `
        <div class="card productos">
            <img src="${producto.foto}" class="card-img-top" alt="...">
            <div class="card-body">
                <h4 class="card-title">${producto.nombre}</h4>
                <p class="card-text h5">$ ${producto.precio}</p>
                <button id="btn${producto.id}" class="btn btn-primary mt-2">Comprar</button>
            </div>
        </div>
        `;
    }
    productos.forEach(producto => {
        document.getElementById(`btn${producto.id}`).addEventListener("click", function(){
            agregarAlCarrito(producto);
        });
    })
}

renderizarProd();

// actualiza el local storage
function guardarLocal(){
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// recorre el carrito para detectar si esta repetido, si encuentra un id repetido crea un nuevo array verificando el id e incrementa su cantidad, sin el .map si reinicio la pagina e intento agregar un producto repetido vuelve a tomar las cantidades del productos.js. Si no esta repetido mete el producto en el carrito y lo dibuja en el DOM
function agregarAlCarrito(producto){
    const repetido = carrito.some((el) => el.id === producto.id);
    if (repetido) {
        carrito.map((prod) => {
            if (prod.id === producto.id) {
                prod.cantidad++;
                console.table(carrito);
                document.getElementById(`cantidad${prod.id}`).innerHTML = `
                <td class="align-middle" id="cantidad${prod.id}">${prod.cantidad}</td>
                `;
            }
        });
    } else {
        carrito.push(producto);
        console.table(carrito);
        // alert("Producto: "+producto.nombre+" agregado al carrito!");
        document.getElementById("tablabody").innerHTML += `
        <tr id="id${producto.id}">
            <td><img src="${producto.foto}" width="40px" height="40px" alt="..."></td>
            <td class="align-middle">${producto.nombre}</td>
            <td class="align-middle restar" id="restar${producto.id}"> - </td>
            <td class="align-middle" id="cantidad${producto.id}">${producto.cantidad}</td>
            <td class="align-middle sumar" id="sumar${producto.id}"> + </td>
            <td class="align-middle">${producto.precio}</td>
            <td class="align-middle"><button type="button" class="btn" id="eliminar${producto.id}">x</button></td>
        </tr>
    `;
    habilitarBtn();
    sumarCantidad();
    restarCantidad();
    eliminar();
    }

    guardarLocal();
    totalAPagar();
}

// disminuye la cantidad del producto tomando su id y actualiza el valor en el DOM
function restarCantidad(){
    for (const producto of carrito){
        let restar = document.getElementById(`restar${producto.id}`);
        restar.addEventListener("click", () => {
            if (producto.cantidad !== 1) {
                producto.cantidad--;
                console.table(carrito);
            }
            document.getElementById(`cantidad${producto.id}`).innerHTML = `
                <td class="align-middle" id="cantidad${producto.id}">${producto.cantidad}</td>
            `;

            guardarLocal();
            totalAPagar();
        });
    }
}

// aumenta la cantidad del producto tomando su id y actualiza el valor en el DOM
function sumarCantidad(){
    for (const producto of carrito){
        let sumar = document.getElementById(`sumar${producto.id}`);
        sumar.addEventListener("click", () => {
            producto.cantidad++;
            console.table(carrito);
            document.getElementById(`cantidad${producto.id}`).innerHTML = `
                <td class="align-middle" id="cantidad${producto.id}">${producto.cantidad}</td>
            `;

            guardarLocal();
            totalAPagar();
        });
    }
}

// calcula el precio segun la cantidad del producto y actualiza el total en el DOM
function totalAPagar(){
    totalCarrito = carrito.reduce((acumulador,producto)=> acumulador + producto.precio * producto.cantidad,0);
    infoTotal.innerText="Total a pagar: $"+totalCarrito;
}

function eliminar(){
    for (const producto of carrito){
        productoEliminado = document.getElementById(`eliminar${producto.id}`).addEventListener("click", function(){
            eliminarDelCarrito(producto);
            document.getElementById(`id${producto.id}`).remove();
            totalAPagar();
            guardarLocal();
            habilitarBtn();
        });
    }
}

// obtiene el index del producto y con el .splice lo elimina del carrito
function eliminarDelCarrito(productoEliminado){
    let eliminado = carrito.indexOf(productoEliminado);
    carrito.splice(eliminado, 1);
    console.table(carrito);
}

// activa el btn si hay productos en el carrito, llamo a esta funcion cada vez que agrego un producto o lo elimino para que verifique si el btn debe estar activado o no
function habilitarBtn(){
    if(carrito.length != 0){
        finalizar.classList.remove("btn-secondary");
        finalizar.classList.add("btn-success");
        botonFinalizar.removeAttribute("disabled");
    } else {
        finalizar.classList.remove("btn-success");
        finalizar.classList.add("btn-secondary");
        botonFinalizar.setAttribute("disabled", "");
    }
}

// el forEach sirve para volver a 1 las cantidades de los productos porque sino cuando termino la compra y vuelvo a agregar un producto que ya tenia se agrega con las cantidades anteriores por mas de que se este borrando el carrito. Luego vacia el carrito, lo borra del DOM y del local
botonFinalizar.onclick = () => {
    carrito.forEach(producto => {
        producto.cantidad = 1;
    })
    carrito = [];
    document.getElementById("tablabody").innerHTML="";
    totalAPagar();
    habilitarBtn();

    localStorage.removeItem("carrito");
    }