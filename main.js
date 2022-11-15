let totalCarrito;
let productoEliminado;
let contenedor = document.getElementById("misProd");
let contador = document.getElementById("contador");
let infoTotal = document.getElementById("total");
let botonFinalizar = document.getElementById("finalizar");
let botonConfirmar = document.getElementById("confirmar");
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
    contadorCarrito();
}

function renderizarProdJSON(){
    const URLJSON = "./productos.json";
    fetch(URLJSON)
        .then(respuesta => respuesta.json())
        .then(datos => {
            let productosJSON = datos.productos;
            for (const producto of productosJSON){
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
            productosJSON.forEach(producto => {
                document.getElementById(`btn${producto.id}`).addEventListener("click", function(){
                    agregarAlCarrito(producto);
                });
            })
        })
}

renderizarProdJSON();

// actualiza el local storage
function guardarLocal(){
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// recorre el carrito para detectar si esta repetido, si encuentra un id repetido crea un nuevo array verificando el id e incrementa su cantidad, sin el .map si reinicio la pagina e intento agregar un producto repetido vuelve a tomar las cantidades del productos.json. Si no esta repetido mete el producto en el carrito y lo dibuja en el DOM
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
    Swal.fire({
        title: producto.nombre,
        text: 'Agregado al carrito',
        icon: 'success',
        imageAlt: producto.nombre,
        showConfirmButton: false,
        timer: 1500
    })

    contadorCarrito();
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

            contadorCarrito();
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

            contadorCarrito();
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
            contadorCarrito();
        });
    }
}

// obtiene el index del producto y con el .splice lo elimina del carrito
function eliminarDelCarrito(productoEliminado){
    productoEliminado.cantidad = 1;
    let eliminado = carrito.indexOf(productoEliminado);
    carrito.splice(eliminado, 1);
    console.table(carrito);
}

// activa el btn si hay productos en el carrito, llamo a esta funcion cada vez que agrego un producto o lo elimino para que verifique si el btn debe estar activado o no
function habilitarBtn(){
    if(carrito.length != 0){
        botonFinalizar.classList.remove("btn-secondary");
        botonFinalizar.classList.add("btn-success");
        botonFinalizar.removeAttribute("disabled");
    } else {
        botonFinalizar.classList.remove("btn-success");
        botonFinalizar.classList.add("btn-secondary");
        botonFinalizar.setAttribute("disabled", "");
    }
}

// si el largo del carrito es distinto a 0 muestra el contador y lo incrementa cada vez que agrego un producto nuevo tomando el largo del mismo
function contadorCarrito(){
    if(carrito.length != 0){
        contador.classList.remove("visually-hidden");
        let cantidadTotal = 0;
        carrito.forEach((producto) => {
            cantidadTotal += producto.cantidad;
        })
        contador.innerText = cantidadTotal;
    } else {
        contador.classList.add("visually-hidden");
    }
}

function enviarDatos(){
    const URLPOST = "https://jsonplaceholder.typicode.com/posts";
    const nuevaCompra = {
        userId: infoComprador,
        title: "Nueva compra",
        body: carrito
    }
    fetch(URLPOST,
        {
            method: "POST",
            body:JSON.stringify(nuevaCompra),
            headers:{
                'Content-type': 'application/json; charset=UTF-8',
            }
        }
    )
        .then(respuesta => respuesta.json())
        .then(datos => {
            console.log(datos);
        })
}


let infoComprador = {};
let nombre = document.getElementById("nombre");
let apellido = document.getElementById("apellido");
let numeroCasa = document.getElementById("numeroCasa");
let calle = document.getElementById("calle");
let provincia = document.getElementById("provincia");
let email = document.getElementById("email");


nombre.onchange = () => {
    if(isNaN(nombre.value)){
        nombre.style.color="black";
        infoComprador.nombre = nombre.value;
        console.table(infoComprador);
    } else {
        nombre.style.color="red";
    }
}
apellido.onchange = () => {
    if(isNaN(apellido.value)){
        apellido.style.color="black";
        infoComprador.apellido = apellido.value;
        console.table(infoComprador);
    } else {
        apellido.style.color="red";
    }
}
numeroCasa.onchange = () => {
    infoComprador.numeroCasa = numeroCasa.value;
    console.table(infoComprador);
}
calle.onchange = () => {
    if(isNaN(calle.value)){
        calle.style.color="black";
        infoComprador.calle = calle.value;
        console.table(infoComprador);
    } else {
        calle.style.color="red";
    }
}
provincia.onchange = () => {
    if(isNaN(provincia.value)){
        provincia.style.color="black";
        infoComprador.provincia = provincia.value;
        console.table(infoComprador);
    } else {
        provincia.style.color="red";
    }
}
email.onchange = () => {
    infoComprador.email = email.value;
    console.table(infoComprador);
}
notasEspeciales.onchange = () => {
    infoComprador.notasEspeciales = notasEspeciales.value;
    console.table(infoComprador);
}

let form = document.getElementById("formulario");
form.addEventListener("submit", validarForm);

function validarForm(ev){
    if((nombre.value!="")&&(isNaN(nombre.value))&&(apellido.value!="")&&(isNaN(apellido.value))&&
    (numeroCasa.value!="")&&(calle.value!="")&&(isNaN(calle.value))&&
    (provincia.value!="")&&(isNaN(provincia.value))&&(email.value!="")){
        Swal.fire({
            icon: 'success',
            title: 'Su pedido se esta procesando!',
            text: 'Recibira un mail de confirmacion a la brevedad'
            })
            ev.preventDefault();
            console.clear();
                enviarDatos();
                // el forEach sirve para volver a 1 las cantidades de los productos porque sino cuando termino la compra y vuelvo a agregar un producto que ya tenia se agrega con las cantidades anteriores por mas de que se este borrando el carrito
                carrito.forEach(producto => {
                    producto.cantidad = 1;
                })
                carrito = [];
                document.getElementById("tablabody").innerHTML="";
                totalAPagar();
                habilitarBtn();
                contadorCarrito();
                botonConfirmar.setAttribute("disabled", "");
            
                localStorage.removeItem("carrito");
    } else {
        ev.preventDefault();
        Swal.fire({
            icon: 'warning',
            title: 'Por favor ingrese datos validos',
            })
    }
} 

botonFinalizar.onclick = () => {
    console.clear();
    botonConfirmar.removeAttribute("disabled");
    }