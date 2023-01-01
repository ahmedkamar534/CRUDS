let title = document.getElementById("title");
let price = document.getElementById("price");
let texas = document.getElementById("texas");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let catogary = document.getElementById("catogary");
let submit = document.getElementById("submit");
// total

let mood = "creat";
let tmp;

function getTotal() {
  if (price.value !== "") {
    let result = +price.value + +texas.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#4caf50";
  } else {
    total.innerHTML = "";
    total.style.background = "red";
  }
}

// creat

let dataPro;
if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}

submit.onclick = function () {
  let newPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    texas: texas.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    catogary: catogary.value.toLowerCase(),
  };
  if (
    title.value !== "" &&
    price.value !== "" &&
    catogary.value !== "" &&
    count.value <= 100
  ) {
    if (mood === "creat") {
      if (newPro.count > 1) {
        for (let j = 0; j < newPro.count; j++) {
          dataPro.push(newPro);
        }
      } else {
        dataPro.push(newPro);
      }
    } else {
      dataPro[tmp] = newPro;
      mood = "creat";
      count.style.display = "block";
      submit.innerHTML = "CREAT";
    }
    clearData();
  }

  localStorage.setItem("product", JSON.stringify(dataPro));

  readData();
};

// clear
function clearData() {
  title.value = "";
  price.value = "";
  texas.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  catogary.value = "";
}

// read
function readData() {
  getTotal();
  let table = "";

  for (let i = 0; i < dataPro.length; i++) {
    table += `
<tr>
<td>${i + 1}</td>
<td>${dataPro[i].title}</td>
<td>${dataPro[i].price}</td>
<td>${dataPro[i].texas}</td>
<td>${dataPro[i].ads}</td>
<td>${dataPro[i].discount}</td>
<td>${dataPro[i].total}</td>
<td>${dataPro[i].catogary}</td>
<td><button onclick="updateData(${i})" id="update">update</button></td>
<td><button onclick="deleteData(${i})" id="delete">delete</button></td>
</tr>`;
  }
  document.getElementById("tBody").innerHTML = table;

  if (dataPro.length > 0) {
    document.getElementById("deleteAll").innerHTML = `
        <button onclick="deleteAll()" id="delted">delete all (${dataPro.length})</button>
        `;
  } else {
    document.getElementById("deleteAll").innerHTML = "";
  }
}
readData();

// delete
function deleteData(i) {
  dataPro.splice(i, 1);
  localStorage.product = JSON.stringify(dataPro);
  readData();
  console.log(i);
}

function deleteAll() {
  localStorage.clear();
  dataPro.splice(0);
  readData();
}
//update
function updateData(i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  texas.value = dataPro[i].texas;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  getTotal();
  count.style.display = "none";
  catogary.value = dataPro[i].catogary;
  submit.innerHTML = "UPDATE";
  mood = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}
// search
let searchMood = "title";
function search(id) {
  let ser = document.getElementById("search");
  if (id === "title") {
    searchMood = "title";
    ser.placeholder = "search By title...";
  } else {
    searchMood = "category";
    ser.placeholder = "search By category...";
  }
  ser.focus();
}

function dataSearch(value) {
  let table = "";
  if (searchMood === "title") {
    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].title.includes(value.toLowerCase())) {
        table += `
        <tr>
        <td>${i + 1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].texas}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].catogary}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>`;
      }
    }
  } else {
    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].catogary.includes(value.toLowerCase())) {
        table += `
        <tr>
        <td>${i + 1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].texas}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].catogary}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>`;
      }
    }
  }
  document.getElementById("tBody").innerHTML = table;
}
