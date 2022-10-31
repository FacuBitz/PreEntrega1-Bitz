let totalCarrito;
let contenedor = document.getElementById("misProd");
let botonFinalizar = document.getElementById("finalizar");
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
if(carrito.length != 0){
    console.log ("Recuperando carrito, no ha finalizado su compra!")
    recuperarTabla();
}

function recuperarTabla(){
    for(const producto of carrito){
        document.getElementById("tablabody").innerHTML += `
        <tr>
            <td><img src="${producto.foto}" width="40px" height="40px" alt="..."></td>
            <td class="align-middle">${producto.nombre}</td>
            <td class="align-middle">${producto.precio}</td>
        </tr>
    `;
    }
    totalCarrito = carrito.reduce((acumulador,producto)=> acumulador + producto.precio,0);
    let infoTotal = document.getElementById("total");
    infoTotal.innerText="Total a pagar $: "+totalCarrito;
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

function agregarAlCarrito(productoComprado){
    carrito.push(productoComprado);
    console.table(carrito)
    alert("Producto: "+productoComprado.nombre+" agregado al carrito!");
    document.getElementById("tablabody").innerHTML += `
        <tr>
            <td><img src="${productoComprado.foto}" width="40px" height="40px" alt="..."></td>
            <td class="align-middle">${productoComprado.nombre}</td>
            <td class="align-middle">${productoComprado.precio}</td>
        </tr>
    `;
    totalCarrito = carrito.reduce((acumulador,producto) => acumulador + producto.precio, 0);
    let infoTotal = document.getElementById("total");
    infoTotal.innerText = "Total a pagar: $"+totalCarrito;

    localStorage.setItem("carrito", JSON.stringify(carrito));
}

botonFinalizar.onclick = () => {
    carrito = [];
    document.getElementById("tablabody").innerHTML="";
    let infoTotal = document.getElementById("total");
    infoTotal.innerText="Total a pagar $: ";

    localStorage.removeItem("carrito");
    }