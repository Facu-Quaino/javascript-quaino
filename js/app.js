let productos = [    
    {
    id: "buzo-1",
    titulo: "Buzo negro",
    imagen: "./img/buzo1.png",
    categoria: {
        nombre: "Abrigos",
        id: "abrigos"
        },
    precio: 10000
    },
    {
    id: "buzo-2",
    titulo: "Buzo azul",
    imagen: "./img/buzo2.png",
    categoria: {
        nombre: "Abrigos",
        id: "abrigos"
        },
    precio: 10000
    },
    {
    id: "buzo-3",
    titulo: "Buzo rojo",
    imagen: "./img/buzo3.png",
    categoria: {
        nombre: "Abrigos",
        id: "abrigos"
        },
    precio: 10000
    },
    {
    id: "camiseta-1",
    titulo: "Camiseta roja",
    imagen: "./img/camiseta1.png",
    categoria: {
        nombre: "Camisetas",
        id: "camisetas"
        },
    precio: 4000
    },
    {
    id: "camiseta-2",
    titulo: "Camiseta purpura",
    imagen: "./img/camiseta2.png",
    categoria: {
        nombre: "Camisetas",
        id: "camisetas"
        },
    precio: 4000
    },
    {
    id: "camiseta-3",
    titulo: "Camiseta celeste",
    imagen: "./img/camiseta3.png",
    categoria: {
        nombre: "Camisetas",
        id: "camisetas"
        },
    precio: 4000
    },
    {
    id: "pantalon-1",
    titulo: "Pantalon jean azul",
    imagen: "./img/pantalon1.png",
    categoria: {
        nombre: "Pantalones",
        id: "pantalones"
        },
    precio: 7000
    },
    {
    id: "pantalon-2",
    titulo: "Pantalon cargo oliva",
    imagen: "./img/pantalon2.png",
    categoria: {
        nombre: "Pantalones",
        id: "pantalones"
        },
    precio: 7000
    },
    {
    id: "pantalon-3",
    titulo: "Pantalon cargo marron",
    imagen: "./img/pantalon3.png",
    categoria: {
        nombre: "Pantalones",
        id: "pantalones"
        },
    precio: 7000
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
                <p class="producto-precio">$${producto.precio}</p>
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
