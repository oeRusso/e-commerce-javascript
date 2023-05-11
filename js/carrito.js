const productosEnCarrito = JSON.parse(localStorage.getItem('productosEnCarrito'));

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonEliminar = document.querySelectorAll(".carrito-producto-eliminar");


function cargarProductosCarrito(){
    if (productosEnCarrito) {
    
        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    
        contenedorCarritoProductos.innerHTML='';
    
        productosEnCarrito.forEach(producto=>{
    
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
        
            div.innerHTML = `<img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
    
            <div class="carrito-producto-titulo">
                <small>Titulo</small>
                <h3>${producto.imagen}</h3>
            </div>
    
            <div class="carrito-producto-cantidad">
                <small>Cantidad</small>
                <p>${producto.cantidad}</p>
            </div>
    
            <div class="carrito-producto-precio">
                <small>precio</small>
                <P>${producto.precio}</P>
            </div>
            <div class="carrito-producto-subtotal">
                <small>Subtotal</small>
                <p>${producto.precio * producto.cantidad}</p>
            </div>
            <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash-fill"></i></button>` ;
    
            contenedorCarritoProductos.append(div);
        
        });
        
    }else{
    
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }
    actualizarBotonesEliminar();
}


cargarProductosCarrito();




function actualizarBotonesEliminar(){
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
         });

}

function eliminarDelCarrito(e){
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);

    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();

    localStorage.setItem('productosEnCarrito',JSON.stringify(productosEnCarrito));

}



// TODO: min 2hs 10min.

// FIXME: fijate las modificaciones que hice con el localstorage en el codigo, para vos no fue necesaria pero hay que ver si para lo proximo que va ser si es necesario hacer esos cambios