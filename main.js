let totalCarrito;
let productoEliminado;
let contenedor = document.getElementById("misProd");
let infoTotal = document.getElementById("total");
let botonFinalizar = document.getElementById("finalizar");
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
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
    sumarr();
    restarr();
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


// recorre el carrito para detectar si esta repetido, si encuentra un id repetido crea un nuevo array,
// verifica denuevo el id repetido e incrementa su cantidad, 
// sin el .map cuando reinicio la pagina e intento agregar un producto repetido
// vuelve a tomar las cantidades del products.js 
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
    sumarr();
    restarr();
    eliminar();
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    
    totalAPagar();
}

function restarr(){
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

            localStorage.setItem("carrito", JSON.stringify(carrito));
            totalAPagar();
        });
    }
}

function sumarr(){
    for (const producto of carrito){
        let sumar = document.getElementById(`sumar${producto.id}`);
        sumar.addEventListener("click", () => {
            producto.cantidad++;
            console.table(carrito);
            document.getElementById(`cantidad${producto.id}`).innerHTML = `
                <td class="align-middle" id="cantidad${producto.id}">${producto.cantidad}</td>
            `;

            localStorage.setItem("carrito", JSON.stringify(carrito));
            totalAPagar();
        });
    }
}

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
                localStorage.setItem("carrito", JSON.stringify(carrito));
            });
    }
}

function eliminarDelCarrito(productoEliminado){
    let eliminado = carrito.indexOf(productoEliminado);
    carrito.splice(eliminado, 1);
    console.table(carrito);
}

botonFinalizar.onclick = () => {
    // if (carrito.lenght != 0){
        carrito = [];
        document.getElementById("tablabody").innerHTML="";
        let infoTotal = document.getElementById("total");
        infoTotal.innerText="Total a pagar: $";

        localStorage.removeItem("carrito");
    // }
    }