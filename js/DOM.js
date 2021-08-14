class pizzasConfirmadas {

    constructor(nombre, descripcion, tamaño, cantidad, precio) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.tamaño = tamaño;
        this.cantidad = cantidad;
        this.precio = precio;
    }
}


let arrayPizzasConfirmadas = [];

let carta = [{
    nombre: "Americana",
    descripcion: "Jamon ahumado, salami y doblequeso",
    precio: [8000, 10000, 12000]
},
{
    nombre: "Americana Especial",
    descripcion: "Salami, champiñón, cábano y doble queso",
    precio: [8600, 10600, 12600]
},
{
    nombre: "Hawaiana",
    descripcion: "Jamón ahumado, piña y doble queso",
    precio: [7000, 9000, 11000]
},
{
    nombre: "Italiana",
    descripcion: "Jamón ahumado, tomate fresco, cebolla, doble queso",
    precio: [10000, 12000, 14000]
}, {
    nombre: "Montañera",
    descripcion: "Cebolla, maíz tierno, tocinitos y doble queso",
    precio: [7500, 9800, 13000]
}]

document.getElementById("btnConfirmarCompra").style.display = "none";

// codigo para llenar tabla con informacion de la carta de pizza y menu desplegable - seléction
let tablaBody = document.getElementById("tablaBody")
let seleccionPizza = document.querySelectorAll(".seleccionPizza");

for (pizza of carta) {
    let nuevaFila = document.createElement("tr");
    let nuevaOpcion1 = document.createElement("option");
    let nuevaOpcion2 = document.createElement("option");

    nuevaFila.innerHTML = `<td> ${pizza.nombre}</td>
    <td>${pizza.descripcion}</td>
    <td>${pizza.precio[0]}</td>   
    <td>${pizza.precio[1]}</td>
    <td>${pizza.precio[2]}</td> `;
    tablaBody.appendChild(nuevaFila);

    nuevaOpcion1.innerHTML = `${pizza.nombre}`;
    nuevaOpcion2.innerHTML = `${pizza.nombre}`;

    seleccionPizza[0].appendChild(nuevaOpcion1);
    seleccionPizza[1].appendChild(nuevaOpcion2);
}

// codigo que añade pizza en la seccion de confirmacion del pedido

let formOrdenarCarta = document.getElementById("ordenarCarta");

formOrdenarCarta.addEventListener("submit", ordenarCarta);

function ordenarCarta(e) {
    let objPizzasConfirmadas = new pizzasConfirmadas();
    var precioTotal;
    e.preventDefault();
    var datosFormulario = e.target;
    nuevoDiv = document.createElement("div");
    nuevoDiv.setAttribute("class", "row pizzaConfirmar");

    nuevoDiv.innerHTML = `<div class="col-md-2">${datosFormulario.children[0].value}</div>`;
    objPizzasConfirmadas.nombre = datosFormulario.children[0].value;
    for (pizza of carta) {
        if (pizza.nombre == datosFormulario.children[0].value) {
            nuevoDiv.innerHTML += `<div class="col-md-4">${pizza.descripcion}</div>`;
            objPizzasConfirmadas.descripcion = pizza.descripcion;
            if (datosFormulario.children[2].value == "") {
                datosFormulario.children[2].value = 1;
                objPizzasConfirmadas.cantidad = datosFormulario.children[2].value;
            }
            switch (datosFormulario.children[1].value) {
                case "Personal":
                    precioTotal = datosFormulario.children[2].value * pizza.precio[0];
                    break;
                case "Mediana":
                    precioTotal = datosFormulario.children[2].value * pizza.precio[1];
                    break;
                case "Familiar":
                    precioTotal = datosFormulario.children[2].value * pizza.precio[2];
                    break;
            }
        }
    }
    nuevoDiv.innerHTML += `<div class="col-md-2">${datosFormulario.children[1].value}</div>`;
    objPizzasConfirmadas.tamaño = datosFormulario.children[1].value;
    nuevoDiv.innerHTML += `<div class="col-md-2">${datosFormulario.children[2].value}</div>`;
    objPizzasConfirmadas.cantidad = datosFormulario.children[2].value;
    nuevoDiv.innerHTML += `<div class="col-md-2">${precioTotal}</div>`;
    objPizzasConfirmadas.precio = precioTotal;
    arrayPizzasConfirmadas.push(objPizzasConfirmadas);

    document.getElementById("listaPedidos").insertBefore(nuevoDiv, document.getElementById("listaPedidos").getElementsByTagName("button")[0]);
    document.getElementById("btnConfirmarCompra").style.display = "block";
    window.scrollBy(0, window.innerHeight);
}

let btnConfirmarCompra = document.getElementById("btnConfirmarCompra");

btnConfirmarCompra.addEventListener("click", confirmarCompra);

function confirmarCompra(e) {
    alert("Tu pedido ha sido confirmado");
    localStorage.clear();
      localStorage.setItem("Pizzas Confirmadas",JSON.stringify(arrayPizzasConfirmadas));
      
}
