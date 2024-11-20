let carrito = localStorage.getItem("carrito");
carrito = JSON.parse(carrito);

const contenedorCarritoVacio = document.querySelector("#carrito-vacio")
const contenedorCarritoProductos = document.querySelector("#carrito-productos")
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones")
const contenedorCarritoComprado = document.querySelector("#carrito-comprado")
let botonEliminar = document.querySelectorAll(".carrito-producto-eliminar")
const botonVaciarCarrito = document.querySelector("#carrito-acciones-vaciar")
const precioTotal = document.querySelector("#total")
const botonComprarCarrito = document.querySelector("#carrito-acciones-comprar")

function cargarProductosCarrito () {
    if(carrito && carrito.length > 0){
        contenedorCarritoVacio.classList.add("disabled")
        contenedorCarritoProductos.classList.remove("disabled")
        contenedorCarritoAcciones.classList.remove("disabled")
        contenedorCarritoComprado.classList.add("disabled")
    
        contenedorCarritoProductos.innerHTML = "";
    
        carrito.forEach(producto => {
            const div = document.createElement("div")
            div.classList.add("carrito-producto")
            div.innerHTML = `
                <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="carrito-producto-titulo">
                    <small>Nombre</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>$${producto.cantidad*producto.precio}</p>
                </div>
                <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash3-fill"></i></button>
            `;
    
            contenedorCarritoProductos.append(div)
        });
    }else{
        contenedorCarritoVacio.classList.remove("disabled")
        contenedorCarritoProductos.classList.add("disabled")
        contenedorCarritoAcciones.classList.add("disabled")
        contenedorCarritoComprado.classList.add("disabled")
    }

    actualizarbotonEliminar()
    calcularTotal()
}

cargarProductosCarrito()



function actualizarbotonEliminar (){
    botonEliminar = document.querySelectorAll(".carrito-producto-eliminar")

    botonEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito)
    })
}

function eliminarDelCarrito(e) {

    Toastify({
        text: "El producto ha sido eliminado!",
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
    const index = carrito.findIndex(producto => producto.id === idBoton)

    carrito.splice(index, 1)
    cargarProductosCarrito()

    localStorage.setItem("carrito", JSON.stringify(carrito))
}

botonVaciarCarrito.addEventListener("click", vaciarCarrito)

function vaciarCarrito(){

    Swal.fire({
        title: "Realmente desea vaciar el carrito?",
        text: "Todos los productos seran eliminados!",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "rgb(153,153,153,255)",
        cancelButtonColor: "rgb(51,51,51,255)",
        confirmButtonText: "Si, vacialo!",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Listo!",
                text: "Tu carrito ha sido vaciado.",
                icon: "success",
                confirmButtonColor: "rgb(153,153,153,255)"
            });
            carrito.length = 0
            localStorage.setItem("carrito", JSON.stringify(carrito))
            cargarProductosCarrito()
        }
    });
}

function calcularTotal(){
    const totalCalculado = carrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0)
    total.innerText = `$${totalCalculado}`
}

botonComprarCarrito.addEventListener("click", comprarCarrito)

function comprarCarrito(){

    Swal.fire({
        title: "¡Muchas gracias por su compra!",
        icon: "success",
        confirmButtonColor: "rgb(153,153,153,255)"
    });

    carrito.length = 0
    localStorage.setItem("carrito", JSON.stringify(carrito))
    
    contenedorCarritoVacio.classList.remove("disabled")
    contenedorCarritoProductos.classList.add("disabled")
    contenedorCarritoAcciones.classList.add("disabled")
    contenedorCarritoComprado.classList.remove("disabled")
}