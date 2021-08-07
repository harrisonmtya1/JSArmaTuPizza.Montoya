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

// codigo para llenar tabla con informacion de la carta de pizzas y menu desplegable - seléction
let tablaBody = document.getElementById("tablaBody")
let seleccionPizza = document.querySelector("#seleccionPizza");

for (pizza of carta) {
    let nuevaFila = document.createElement("tr");
    let nuevaOpcion = document.createElement("option");

    nuevaFila.innerHTML = `<td> ${pizza.nombre}</td>
    <td>${pizza.descripcion}</td>
    <td>${pizza.precio[0]}</td>   
    <td>${pizza.precio[1]}</td>
    <td>${pizza.precio[2]}</td> `;
    tablaBody.appendChild(nuevaFila);

    nuevaOpcion.innerHTML = `${pizza.nombre}`;
    seleccionPizza.appendChild(nuevaOpcion);
}

// codigo que añade pizza en la seccion de confirmacion del pedido

let formOrdenarCarta = document.getElementById("ordenarCarta");

formOrdenarCarta.addEventListener("submit", ordenarCarta);

function ordenarCarta(e) {
    var precioTotal;
    e.preventDefault();
    var datosFormulario= e.target;
    nuevoDiv=document.createElement("div");

    nuevoDiv.setAttribute("class","container");
    nuevoDiv.setAttribute("class","row");

    nuevoDiv.innerHTML=`<div class="col-md-2">${datosFormulario.children[0].value}</div>`;
    for(pizza of carta){
        if(pizza.nombre== datosFormulario.children[0].value){
            nuevoDiv.innerHTML+=`<div class="col-md-4">${pizza.descripcion}</div>`;
            debugger
            if(datosFormulario.children[2].value==""){
                datosFormulario.children[2].value=1;
            }
            switch(datosFormulario.children[1].value){
              case "Personal":
                  precioTotal=datosFormulario.children[2].value * pizza.precio[0];
              break;
              case "Mediana":
                precioTotal=datosFormulario.children[2].value * pizza.precio[1];
              break;
              case "Familiar":
                precioTotal=datosFormulario.children[2].value * pizza.precio[2];
              break;
            }  
        }
    }    
    nuevoDiv.innerHTML+=`<div class="col-md-2">${datosFormulario.children[1].value}</div>`;
    nuevoDiv.innerHTML+=`<div class="col-md-2">${datosFormulario.children[2].value}</div>`; 
    nuevoDiv.innerHTML+=`<div class="col-md-2">${precioTotal}</div>`;

    
    document.getElementById("listaPedidos").insertBefore(nuevoDiv,document.getElementById("listaPedidos").getElementsByTagName("button")[0]);
    document.getElementById("btnConfirmarCompra").style.display = "block";
}

