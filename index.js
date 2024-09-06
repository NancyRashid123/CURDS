const title = document.getElementById("title");
const price = document.getElementById("price");
const taxes = document.getElementById("taxes");
const ads = document.getElementById("ads");
const discount = document.getElementById("discount");
const total = document.getElementById("total");
const count = document.getElementById("count");
const category = document.getElementById("category");
const submit = document.getElementById("submit");
const updateProductBtn = document.getElementById("updateProductBtn");
const delete_All = document.getElementById("deleteAll");
const search = document.getElementById("search");
let product_container = [];

// function get total
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.backgroundColor = "#055705";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "#af0510";
  }
}

if (localStorage.getItem("product")) {
  product_container = JSON.parse(localStorage.getItem("product"));
  display();
}

// create function

function CreateProduct() {
  const newProduct = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };

  if(title.value != '' && price.value != '' && category.value != '' && newProduct.count <= 100){
    if (newProduct.count > 1) {
      for (let i = 0; i < newProduct.count; i++) {
        product_container.push(newProduct);
      }
    } else {
      product_container.push(newProduct);
    }
  
    localStorage.setItem("product", JSON.stringify(product_container));
    display();
    clear();
  }else{
    alert('sorry');
  }
  }



submit.addEventListener("click", CreateProduct);

// display function
function display() {
  let cartoona = "";
  for (let i = 0; i < product_container.length; i++) {
    cartoona += `     <tr>
                        <td>${i+1}</td>
                        <td>${product_container[i].title}</td>
                        <td>${product_container[i].price}</td>
                        <td>${product_container[i].taxes}</td>
                        <td>${product_container[i].ads}</td>
                        <td>${product_container[i].discount}</td>
                        <td>${product_container[i].total}</td>
                        <td>${product_container[i].category}</td>
                        <td><button id="update" onclick = setForm(${i})>update</button></td>
                        <td><button id="delete" onclick = deleteProduct(${i})>delete</button></td>
                    </tr>`;
  }
  document.getElementById("table").innerHTML = cartoona;

  if (product_container.length > 0) {
    delete_All.innerHTML = `<button onclick = deleteAll()>Delete All (${product_container.length})</button>`;
  } else {
    delete_All.innerHTML = "";
  }
}

//clear function

function clear() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  category.value = "";
  count.value = "";
}

// delete function

function deleteProduct(i) {
  product_container.splice(i, 1);
  localStorage.setItem("product", JSON.stringify(product_container));
  display();
}

// deleteALL function

function deleteAll() {
  product_container.splice(0);
  localStorage.clear();
  display();
}

// set Data
let x = 0;
function setForm(productIndex) {
  x = productIndex;
  title.value = product_container[productIndex].title;
  price.value = product_container[productIndex].price;
  taxes.value = product_container[productIndex].taxes;
  ads.value = product_container[productIndex].ads;
  discount.value = product_container[productIndex].discount;
  getTotal();
  count.style.display = "none";
  category.value = product_container[productIndex].category;
  submit.style.display = "none";
  updateProductBtn.style.display = "block";
}
// update Product

function updateProduct() {
  product_container[x].title = title.value;
  product_container[x].price = price.value;
  product_container[x].taxes = taxes.value;
  product_container[x].ads = ads.value;
  product_container[x].discount = discount.value;
  product_container[x].category = category.value;
  submit.style.display = "block";
  updateProductBtn.style.display = "none";
  localStorage.setItem("product", JSON.stringify(product_container));
  count.style.display = "block";
  display();
  clear();
  getTotal();
}
updateProductBtn.addEventListener("click", updateProduct);

// search mood function
let mood = "title";
function searchMood(id) {
  if (id == "searchTitle") {
    mood = "title";
  } else {
    mood = "category";
  }

  search.placeholder = "Search By " + mood;
  search.focus();
  search.value = "";
  display();
}

function searchData(value) {
  let temp = '';
  for (let i = 0; i < product_container.length; i++) {
    if (mood == "title") {
      if(product_container[i].title.toLowerCase().includes(value.toLowerCase())){;
      temp += `     <tr>
    <td>${i}</td>
    <td>${product_container[i].title}</td>
    <td>${product_container[i].price}</td>
    <td>${product_container[i].taxes}</td>
    <td>${product_container[i].ads}</td>
    <td>${product_container[i].discount}</td>
    <td>${product_container[i].total}</td>
    <td>${product_container[i].category}</td>
    <td><button id="update" onclick = setForm(${i})>update</button></td>
    <td><button id="delete" onclick = deleteProduct(${i})>delete</button></td>
</tr>`;
      }
    }
    else{
     if( product_container[i].category.toLowerCase().includes(value.toLowerCase())){;
      temp += `     <tr>
    <td>${i}</td>
    <td>${product_container[i].title}</td>
    <td>${product_container[i].price}</td>
    <td>${product_container[i].taxes}</td>
    <td>${product_container[i].ads}</td>
    <td>${product_container[i].discount}</td>
    <td>${product_container[i].total}</td>
    <td>${product_container[i].category}</td>
    <td><button id="update" onclick = setForm(${i})>update</button></td>
    <td><button id="delete" onclick = deleteProduct(${i})>delete</button></td>
</tr>`;
     }
    }
  }

  document.getElementById("table").innerHTML = temp;
}

search.addEventListener('input', ()=>{
  searchData(search.value);
})

// validation
