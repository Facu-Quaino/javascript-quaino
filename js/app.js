let productos = [    
    {
    id: "buzo-1",
    titulo: "buzo 1",
    imagen: "./img/producto-placeholder.png",
    categoria: {
        nombre: "Abrigos",
        id: "abrigos"
        },
    precio: 1000
    },
    {
    id: "buzo-2",
    titulo: "buzo 2",
    imagen: "./img/producto-placeholder.png",
    categoria: {
        nombre: "Abrigos",
        id: "abrigos"
        },
    precio: 1000
    },
    {
    id: "buzo-3",
    titulo: "buzo 3",
    imagen: "./img/producto-placeholder.png",
    categoria: {
        nombre: "Abrigos",
        id: "abrigos"
        },
    precio: 1000
    },
    {
    id: "camiseta-1",
    titulo: "camiseta 1",
    imagen: "./img/producto-placeholder.png",
    categoria: {
        nombre: "Camisetas",
        id: "camisetas"
        },
    precio: 1000
    },
    {
    id: "camiseta-2",
    titulo: "camiseta 2",
    imagen: "./img/producto-placeholder.png",
    categoria: {
        nombre: "Camisetas",
        id: "camisetas"
        },
    precio: 1000
    },
    {
    id: "camiseta-3",
    titulo: "camiseta 3",
    imagen: "./img/producto-placeholder.png",
    categoria: {
        nombre: "Camisetas",
        id: "camisetas"
        },
    precio: 1000
    },
    {
    id: "pantalon-1",
    titulo: "pantalon 1",
    imagen: "./img/producto-placeholder.png",
    categoria: {
        nombre: "Pantalones",
        id: "pantalones"
        },
    precio: 1000
    },
    {
    id: "pantalon-2",
    titulo: "pantalon 2",
    imagen: "./img/producto-placeholder.png",
    categoria: {
        nombre: "Pantalones",
        id: "pantalones"
        },
    precio: 1000
    },
    {
    id: "pantalon-3",
    titulo: "pantalon 3",
    imagen: "./img/producto-placeholder.png",
    categoria: {
        nombre: "Pantalones",
        id: "pantalones"
        },
    precio: 1000
    },
]

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
                <p class="producto-precio">${producto.precio}</p>
                <button class="producto-agregar" id ="${producto.id}">AGREGAR</button>
            </div>
        `;

        contenedorProductos.append(div)
    })

    actualizarProductoAgregar()
}
cargarProductos(productos);

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
