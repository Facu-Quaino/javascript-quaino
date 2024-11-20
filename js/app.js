let productos = []

fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data
        cargarProductos(productos)
    })

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonCategoria = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal")
let productoAgregar = document.querySelectorAll(".producto-agregar")
const contador = document.querySelector("#contador")


function cargarProductos(productosElegidos){

    contenedorProductos.innerHTML="";

    productosElegidos.forEach(producto => {
        const div = document.createElement("div")

        div.classList.add("producto")
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-descripcion">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id ="${producto.id}">AGREGAR</button>
            </div>
        `;

        contenedorProductos.append(div)
    })

    actualizarProductoAgregar()
}

botonCategoria.forEach(boton=>{
    boton.addEventListener("click", (e)=>{
        botonCategoria.forEach(boton=>boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if(e.currentTarget.id != "todos"){
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id)
            tituloPrincipal.innerText = productoCategoria.categoria.nombre

            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id)
            cargarProductos(productosBoton)
        } else{
            tituloPrincipal.innerText = "Todos los productos"
            cargarProductos(productos);
        }
    })
})

function actualizarProductoAgregar (){
    productoAgregar = document.querySelectorAll(".producto-agregar")

    productoAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito)
    })
}

let carrito;
const carritoLocalStorage = localStorage.getItem("carrito")

if(carritoLocalStorage){
    carrito = JSON.parse(carritoLocalStorage)
    aumentarContador()
} else{
    carrito = []
}

function agregarAlCarrito(e) {

    Toastify({
        text: "Producto agregado al carrito!",
        duration: 3000,
        close: false,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, rgb(51,51,51,255), rgb(102,102,102,255)",
            borderRadius: "1rem"
        },
        onClick: function(){} // Callback after click
    }).showToast();

    const idBoton = e.currentTarget.id
    const productoAgregado = productos.find(producto => producto.id === idBoton)

    if (carrito.some(producto => producto.id === idBoton)) {
        const index = carrito.findIndex(producto => producto.id === idBoton)
        carrito[index].cantidad++
    }else{
        productoAgregado.cantidad = 1
        carrito.push(productoAgregado)
    }

    aumentarContador()

    localStorage.setItem("carrito", JSON.stringify(carrito))
}

function aumentarContador(){
    let contadorCarrito = carrito.reduce((acc, producto) => acc + producto.cantidad, 0)
    contador.innerText = contadorCarrito
}
