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

let tablaBody=document.getElementById("tablaBody")
let seleccionPizza=document.querySelector("#seleccionPizza");

for (pizza of carta) {
    let nuevaFila = document.createElement("tr");
    let nuevaOpcion=document.createElement("option");

    nuevaFila.innerHTML = `<td> ${pizza.nombre}</td>
    <td>${pizza.descripcion}</td>
    <td>${pizza.precio[0]}</td>   
    <td>${pizza.precio[1]}</td>
    <td>${pizza.precio[2]}</td> `; 
    tablaBody.appendChild(nuevaFila);

    nuevaOpcion.innerHTML=`${pizza.nombre}`;
    seleccionPizza.appendChild(nuevaOpcion);
}



