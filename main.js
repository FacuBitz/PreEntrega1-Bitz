let totalCarrito;
let productoEliminado;
let contenedor = document.getElementById("misProd");
let infoTotal = document.getElementById("total");
let botonFinalizar = document.getElementById("finalizar");
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
if(carrito.length != 0){
    console.log ("Recuperando carrito, no ha finalizado su compra!")
    recuperarTabla();
}

function recuperarTabla(){
    for(const producto of carrito){
        document.getElementById("tablabody").innerHTML += `
        <tr  id="id${producto.id}">
            <td><img src="${producto.foto}" width="40px" height="40px" alt="..."></td>
            <td class="align-middle">${producto.nombre}</td>
            <td class="align-middle">${producto.precio}</td>
            <td class="align-middle"><button type="button" class="btn" id="eliminar${producto.id}">x</button></td>
        </tr>
    `;
    }
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

function agregarAlCarrito(producto){
    carrito.push(producto);
    console.table(carrito);
    alert("Producto: "+producto.nombre+" agregado al carrito!");
    document.getElementById("tablabody").innerHTML += `
        <tr id="id${producto.id}">
            <td><img src="${producto.foto}" width="40px" height="40px" alt="..."></td>
            <td class="align-middle">${producto.nombre}</td>
            <td class="align-middle">${producto.precio}</td>
            <td class="align-middle"><button type="button" class="btn" id="eliminar${producto.id}">x</button></td>
        </tr>
    `;

    localStorage.setItem("carrito", JSON.stringify(carrito));

    totalAPagar();
    eliminar();
}

function totalAPagar(){
    totalCarrito = carrito.reduce((acumulador,producto)=> acumulador + producto.precio,0);
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
    carrito = [];
    document.getElementById("tablabody").innerHTML="";
    let infoTotal = document.getElementById("total");
    infoTotal.innerText="Total a pagar: $";

    localStorage.removeItem("carrito");
    }