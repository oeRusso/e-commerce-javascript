// PRODUCTOS
const productos = [
    // nike
    {
        id: "nike-01",
        titulo: "nike 01",
        imagen: "img-zapa/nike/01.jpg",
        categoria: {
            nombre: "nike",
            id: "nike"
        },
        precio: 1000
    },
    {
        id: "nike-02",
        titulo: "nike 02",
        imagen: "img-zapa/nike/02.jpg",
        categoria: {
            nombre: "nike",
            id: "nike"
        },
        precio: 1000
    },
    {
        id: "nike-03",
        titulo: "nike 03",
        imagen: "img-zapa/nike/03.jpg",
        categoria: {
            nombre: "nike",
            id: "nike"
        },
        precio: 1000
    },
    {
        id: "nike-04",
        titulo: "nike 04",
        imagen: "img-zapa/nike/04.jpg",
        categoria: {
            nombre: "nike",
            id: "nike"
        },
        precio: 1000
    },
    {
        id: "nike-05",
        titulo: "nike 05",
        imagen: "img-zapa/nike/05.jpg",
        categoria: {
            nombre: "nike",
            id: "nike"
        },
        precio: 1000
    },
    // adidas
    {
        id: "adidas-01",
        titulo: "adidas 01",
        imagen: "img-zapa/adidas/01.jpg",
        categoria: {
            nombre: "adidas",
            id: "adidas"
        },
        precio: 1000
    },
    {
        id: "adidas-02",
        titulo: "adidas 02",
        imagen: "img-zapa/adidas/02.jpg",
        categoria: {
            nombre: "adidas",
            id: "adidas"
        },
        precio: 1000
    },
    {
        id: "adidas-03",
        titulo: "adidas 03",
        imagen: "img-zapa/adidas/03.jpg",
        categoria: {
            nombre: "adidas",
            id: "adidas"
        },
        precio: 1000
    },
    {
        id: "adidas-05",
        titulo: "adidas 05",
        imagen: "img-zapa/adidas/05.jpg",
        categoria: {
            nombre: "adidas",
            id: "adidas"
        },
        precio: 1000
    },
    {
        id: "adidas-06",
        titulo: "adidas 06",
        imagen: "img-zapa/adidas/06.jpg",
        categoria: {
            nombre: "adidas",
            id: "adidas"
        },
        precio: 1000
    },
    // dc
    {
        id: "dc-01",
        titulo: "dc 01",
        imagen: "img-zapa/dc/06.jpg",
        categoria: {
            nombre: "dc",
            id: "dc"
        },
        precio: 1000
    },
    {
        id: "dc-02",
        titulo: "dc 02",
        imagen: "img-zapa/dc/02.jpg",
        categoria: {
            nombre: "dc",
            id: "dc"
        },
        precio: 1000
    },
    {
        id: "dc-03",
        titulo: "dc 03",
        imagen: "img-zapa/dc/03.jpg",
        categoria: {
            nombre: "dc",
            id: "dc"
        },
        precio: 1000
    },
    {
        id: "dc-04",
        titulo: "dc 04",
        imagen: "img-zapa/dc/04.jpg",
        categoria: {
            nombre: "dc",
            id: "dc"
        },
        precio: 1000
    },
    {
        id: "dc-05",
        titulo: "dc 05",
        imagen: "img-zapa/dc/05.jpg",
        categoria: {
            nombre: "dc",
            id: "dc"
        },
        precio: 1000
    },
    {
        id: "dc-06",
        titulo: "dc 06",
        imagen: "img-zapa/dc/07.jpg",
        categoria: {
            nombre: "dc",
            id: "dc"
        },
        precio: 1000
    }
];


const contenedorProductos = document.querySelector("#contenedor-productos");
const tituloPrincipal = document.querySelector("#titulo-principal");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");



function cargarProductos(productosElegidos){

    contenedorProductos.innerHTML = '';
    productosElegidos.forEach(producto =>{

        const div = document.createElement('div');
        div.classList.add("producto");
        div.innerHTML = `
                <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}"> 
                 <div class="producto-detalles">
                    <h3 class="producto-titulo">${producto.titulo}</h3>
                    <p class="producto-precio">${producto.precio}</p>
                    <button class="producto-agregar" id="${producto.id}">Agregar</button>
                 </div> `;

         contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();  
    

    
    
}

cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener('click', (e) => {  

        botonesCategorias.forEach(boton=> boton.classList.remove('active'));
       e.currentTarget.classList.add('active');

       if (e.currentTarget.id != 'todos') {
           const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
           tituloPrincipal.innerText = productoCategoria.categoria.nombre;
           
           const productoBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
           cargarProductos(productoBoton);
       }else{
            tituloPrincipal.innerText = 'Todos los productos';
            cargarProductos(productos);
       }

     });
});

function actualizarBotonesAgregar(){
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
         });

}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem('productosEnCarrito');
if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
}else{
    productosEnCarrito = [];
}

function agregarAlCarrito(e){

    const idBoton = e.currentTarget.id; //e.currentarget te saca la equiquete q seleccionas con todas sus propiedades, ene ste caso te saca button con una calse y un id, q son los atributos q tiene, y como nosotros queres el id, entonces por eso ponemos e.currentarget.id
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if (productosEnCarrito.some(producto => producto.id === idBoton)) {
       const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
       productosEnCarrito[index].cantidad++;
        
    }else{
            productoAgregado.cantidad = 1;
            productosEnCarrito.push(productoAgregado);
    }
    actualizarNumerito()
    
    localStorage.setItem('productosEnCarrito',JSON.stringify(productosEnCarrito));
}

function actualizarNumerito(){
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc+producto.cantidad, 0);
    numerito.innerHTML = nuevoNumerito;

}




