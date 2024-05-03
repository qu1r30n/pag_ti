const listaDeProductos = document.getElementById('listaDeProductos');

let productos = [];
const productos_a_mover = [
  { id: 1, nombre: 'Producto 1', imagen: 'https://via.placeholder.com/150', cantidad: 0, precio: 10, extra: "" },
  { id: 2, nombre: 'Producto 2', imagen: 'https://via.placeholder.com/150', cantidad: 0, precio: 15, extra: "" },
  { id: 1, nombre: 'Producto 1', imagen: 'https://via.placeholder.com/150', cantidad: 0, precio: 10, extra: "" },
  { id: 2, nombre: 'Producto 2', imagen: 'https://via.placeholder.com/150', cantidad: 0, precio: 15, extra: "" },
  { id: 1, nombre: 'Producto 1', imagen: 'https://via.placeholder.com/150', cantidad: 0, precio: 10, extra: "" },
  { id: 2, nombre: 'Producto 2', imagen: 'https://via.placeholder.com/150', cantidad: 0, precio: 15, extra: "" },
  { id: 1, nombre: 'Producto 1', imagen: 'https://via.placeholder.com/150', cantidad: 0, precio: 10, extra: "" },
  { id: 2, nombre: 'Producto 2', imagen: 'https://via.placeholder.com/150', cantidad: 0, precio: 15, extra: "" },
  // Agrega más productos con sus precios y extras aquí
];

document.addEventListener("DOMContentLoaded", function() 
{
  for (let i = 0; i < productos_a_mover.length; i++) 
  {
    agregarProducto(productos_a_mover[i].id +"|"+productos_a_mover[i].nombre+"|"+productos_a_mover[i].imagen+"|"+productos_a_mover[i].cantidad+"|"+productos_a_mover[i].precio+"|"+productos_a_mover[i].extra);
  }  
  renderizarProductos(productos);
});

function actualizarCantidad(idProducto, cantidad) 
{
  const producto = buscarProductoPorId(productos, idProducto);
  if (producto) 
  {
    producto.cantidad += cantidad;
    limpiarListaDeProductos();
    fila = document.createElement('div');
    renderizarProductos(productos);
  }
}

function buscarProductoPorId(productos, idProducto) 
{
  for (let i = 0; i < productos.length; i++) 
  {
    if (productos[i].id === idProducto) 
    {
      return productos[i];
    }
  }
  return null; // Devolver null si el producto no se encuentra
}

function limpiarListaDeProductos() 
{
  while (listaDeProductos.firstChild) 
  {
    listaDeProductos.removeChild(listaDeProductos.firstChild);
  }
  fila=null
  fila = document.createElement('div');

}

function renderizarProductos(productos) 
{
  listaDeProductos.innerHTML = '';
  j = 0;
  for (let i = 0; i < productos.length; i++) 
  {
    const { id, nombre, imagen, cantidad, precio, extra } = productos[i];
    if (j > 3) 
    {
      renderizarProducto(id, nombre, imagen, cantidad, precio, extra, true);
      j = 0;
    } 
    else 
    {
      renderizarProducto(id, nombre, imagen, cantidad, precio, extra, false);
    }
    j++;
  }
}

let fila = document.createElement('div');
function renderizarProducto(id, nombre, imagen, cantidad, precio, extra, hacerNuevoDiv = false) 
{
  fila.style.display = 'flex';
  if (hacerNuevoDiv) 
  {
    fila = document.createElement('div');
    fila.style.display = 'flex';
  }
  
  const productoDiv = document.createElement('div');
  productoDiv.classList.add('producto');

  const img = document.createElement('img');
  img.src = imagen;
  productoDiv.appendChild(img);

  const nombreElemento = document.createElement('p');
  nombreElemento.textContent = nombre;
  productoDiv.appendChild(nombreElemento);

  const precioElemento = document.createElement('p');
  precioElemento.textContent = `Precio: $${precio.toFixed(2)}`;
  productoDiv.appendChild(precioElemento);


  const botonMenos = document.createElement('button');
  botonMenos.textContent = '-';
  botonMenos.addEventListener('click', () => actualizarCantidad(id, -1));
  productoDiv.appendChild(botonMenos);

  const inputCantidad = document.createElement('input');
  inputCantidad.type = 'text';
  inputCantidad.value = cantidad;
  inputCantidad.addEventListener('input', (event) => {
    const nuevaCantidad = parseInt(event.target.value);
    const producto = buscarProductoPorId(productos, id);
    if (!isNaN(nuevaCantidad) && producto) {
      producto.cantidad = nuevaCantidad;
    }
  });
  productoDiv.appendChild(inputCantidad);

  const botonMas = document.createElement('button');
  botonMas.textContent = '+';
  botonMas.addEventListener('click', () => actualizarCantidad(id, 1));
  productoDiv.appendChild(botonMas);
  
  const inputextra = document.createElement('input');
  inputextra.type = 'text';
  inputextra.value = extra; // Asigna el valor de extra al campo de entrada
  inputextra.addEventListener('input', (event) => {
    const nuevoValorExtra = event.target.value;
    const producto = buscarProductoPorId(productos, id);
    if (producto) {
      producto.extra = nuevoValorExtra; // Actualiza la propiedad extra del producto
    }
  });
  productoDiv.appendChild(inputextra);

  fila.appendChild(productoDiv);
  listaDeProductos.appendChild(fila);
}

function agregarProducto(datos) 
{
  const datosSeparados = datos.split('|');
  
  const nuevoProducto = {
    id: parseInt(datosSeparados[0]),
    nombre: datosSeparados[1],
    imagen: datosSeparados[2],
    cantidad: parseInt(datosSeparados[3]),
    precio: parseFloat(datosSeparados[4]),
    extra: datosSeparados[5]
  };

  window.addEventListener('load', function() {
    const botonProcesar = document.getElementById('procesar');
  
    // Verificar si se encontró el botón "procesar"
    if (botonProcesar) 
    {
      // Escuchar el evento de clic en el botón "procesar"
      botonProcesar.addEventListener('click', function() {
        // Recopilar la información de los productos en el formato requerido
        let textoPedido = '';
        for (let i = 0; i < productos.length; i++) {
          const { id, cantidad, extra } = productos[i];
          if (cantidad>0) 
          {
            if (extra=="") 
            {
              textoPedido += `${id}:${cantidad}\n`;
            } 
            else 
            {
              textoPedido += `${id}:${cantidad}\next: ${extra}\n`;
            }
            
          }
          
        }
        // Mostrar el texto del pedido en el contenedor de contenido
        document.getElementById('contenido').innerText = textoPedido;
      });
    } else {
      console.error('El botón "procesar" no se encontró en el DOM.');
    }
  });

  productos.push(nuevoProducto);
}
function copiarContenido() 
  {
    var contenidoDiv = document.getElementById('contenido');
    var rangoSeleccion = document.createRange();
    rangoSeleccion.selectNode(contenidoDiv);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(rangoSeleccion);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    alert('Contenido copiado al portapapeles.');
  }
  
  document.addEventListener("DOMContentLoaded", function() {
    // Otro código de inicialización aquí...
  
    const buscarProducto = document.getElementById('buscarProducto');
  
    buscarProducto.addEventListener('input', function(event) 
    {
      limpiarListaDeProductos()

      const idBuscado = parseInt(event.target.value);
      if (!isNaN(idBuscado)) {
        const productosFiltrados = productos.filter(producto => producto.id === idBuscado);
        renderizarProductos(productosFiltrados);
      } else 
      {
        renderizarProductos(productos);
      }
    });
  });
