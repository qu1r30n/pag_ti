const productList = document.getElementById('product-list');

let products=[];
const products_a_mover = [
  { id: 1, name: 'Product 1', image: 'https://via.placeholder.com/150', quantity: 0 },
  { id: 2, name: 'Product 2', image: 'https://via.placeholder.com/150', quantity: 0 },
  { id: 3, name: 'Product 3', image: 'https://via.placeholder.com/150', quantity: 0 },
  { id: 4, name: 'Product 4', image: 'https://via.placeholder.com/150', quantity: 0 },
  { id: 5, name: 'Product 5', image: 'https://via.placeholder.com/150', quantity: 0 },
  { id: 6, name: 'Product 6', image: 'https://via.placeholder.com/150', quantity: 0 },
  { id: 7, name: 'Product 7', image: 'https://via.placeholder.com/150', quantity: 0 },
  { id: 8, name: 'Product 8', image: 'https://via.placeholder.com/150', quantity: 0 },
  { id: 9, name: 'Product 9', image: 'https://via.placeholder.com/150', quantity: 0 },
  { id: 10, name: 'Product 10', image: 'https://via.placeholder.com/150', quantity: 0 },
  { id: 11, name: 'Product 11', image: 'https://via.placeholder.com/150', quantity: 0 },
  { id: 12, name: 'Product 12', image: 'https://via.placeholder.com/150', quantity: 0 }
];

document.addEventListener("DOMContentLoaded", function() 
{
  for (let i = 0; i < products_a_mover.length; i++) 
  {
    // Llamar a la función con los datos proporcionados
    agregarProducto(products_a_mover[i].id +"|"+products_a_mover[i].name+"|"+products_a_mover[i].image+"|"+products_a_mover[i].quantity);

  }  
  
  

  renderProducts(products);
});

function updateQuantity(productId, amount) 
{
  const product = findProductById(products, productId);
  if (product) 
  {
    product.quantity += amount;
    clearProductList();
    fila = document.createElement('div');
    renderProducts(products);
  }
}

function findProductById(products, productId) 
{
  for (let i = 0; i < products.length; i++) 
  {
    if (products[i].id === productId) 
    {
      return products[i];
    }
  }
  return null; // Devolver null si el producto no se encuentra
}

function clearProductList() 
{
  // Elimina todos los hijos del elemento productList
  while (productList.firstChild) 
  {
    productList.removeChild(productList.firstChild);
  }
}

function renderProducts(products) 
{
  productList.innerHTML = '';
  j=0;
  for (let i = 0; i < products.length; i++) 
  {
    const { id, name, image, quantity } = products[i];
    
    if (j>3) 
    {
      renderProduct(id, name, image, quantity,true);
      j=0;
    } 
    else 
    {
      renderProduct(id, name, image, quantity,false);
    }
    j++
  }
}

let fila = document.createElement('div');
function renderProduct(id, name, image, quantity,hacer_nuevo_div=false) 
{
  fila.style.display = 'flex'; // Cambiar a flexbox para alinear elementos en horizontal
  if (hacer_nuevo_div) 
  {
    fila = document.createElement('div');
    fila.style.display = 'flex'; // Cambiar a flexbox para alinear elementos en horizontal
  }
  
  const productDiv = document.createElement('div');
  productDiv.classList.add('product');
  

  const img = document.createElement('img');
  img.src = image;
  productDiv.appendChild(img);

  const nameElement = document.createElement('p');
  nameElement.textContent = name;
  productDiv.appendChild(nameElement);

  const quantityDiv = document.createElement('div');
  quantityDiv.classList.add('quantity');

  const minusButton = document.createElement('button');
  minusButton.textContent = '-';
  minusButton.addEventListener('click', () => updateQuantity(id, -1));
  quantityDiv.appendChild(minusButton);

  const quantityInput = document.createElement('input');
  quantityInput.type = 'text';
  quantityInput.value = quantity;
  quantityDiv.appendChild(quantityInput);

  const plusButton = document.createElement('button');
  plusButton.textContent = '+';
  plusButton.addEventListener('click', () => updateQuantity(id, 1));
  quantityDiv.appendChild(plusButton);

  productDiv.appendChild(quantityDiv);
  fila.appendChild(productDiv);
  productList.appendChild(fila);
}

function agregarProducto(datos) 
{
  
  // Dividir la cadena por el carácter '|'
  const datosSeparados = datos.split('|');
  
  // Crear un objeto con los datos divididos
  const nuevoProducto = 
  {
    id: parseInt(datosSeparados[0]),
    name: datosSeparados[1],
    image: datosSeparados[2],
    quantity: parseInt(datosSeparados[3])
  };
  
  // Agregar el objeto al arreglo
  products.push(nuevoProducto);
  
  // Aquí puedes hacer cualquier otra operación con el arreglo products si lo necesitas
}

