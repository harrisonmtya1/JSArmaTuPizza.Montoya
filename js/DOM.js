// codigo para llenar apartir de json la tabla con informacion de la carta de pizza y menu desplegable - seléction

let tablaBody = document.getElementById("tablaBody")
let seleccionPizza = document.querySelectorAll(".seleccionPizza");

let cartaJSON = "carta.json";

$(document).ready(() => {
    
    $.ajax({
        type:"GET",
        url:cartaJSON,
        datatype:"json"
    }).done((data)=>{
        
        for (pizza of data) {
            let nuevaFila = document.createElement("tr");
            let nuevaOpcion = document.createElement("option");
        
            nuevaFila.innerHTML = `<td> ${pizza.nombre}</td>
            <td>${pizza.descripcion}</td>
            <td>${pizza.precio[0]}</td>   
            <td>${pizza.precio[1]}</td>
            <td>${pizza.precio[2]}</td> `;
            tablaBody.appendChild(nuevaFila);
        
            nuevaOpcion.innerHTML = `${pizza.nombre}`;
            seleccionPizza[0].appendChild(nuevaOpcion);
        
        }
    });
})

// //clse para armar objetos de pizzas a confirmar y guardar estos en un array y al momento de confirmarlos los 
// guardamos en el localStore

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

// array con objetos pizza
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
$("#btnOrdenarArmada").attr("style", "display:none");






// codigo que añade pizza en la seccion de confirmacion del pedido

let formOrdenarCarta = document.getElementById("ordenarCarta");

formOrdenarCarta.addEventListener("submit", ordenarCarta);

function ordenarCarta(e) {
    let objPizzasConfirmadas = new pizzasConfirmadas();
    var precioTotal;
    e.preventDefault();
    var datosFormulario = e.target;
    nuevoDiv = document.createElement("div");
    nuevoDiv.setAttribute("class", "row pizzaConfirmar pizzasPedidos__pizzas");

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

// en esta seccion de codigo confirmmos la pizzas a comprar, capturamos el boton y le agregamos evento de click
// el array de pizzasConfirmadas lo guardamos en el localStore y eliminamos las pizzas a confirmar

let btnConfirmarCompra = document.getElementById("btnConfirmarCompra");

btnConfirmarCompra.addEventListener("click", confirmarCompra);

function confirmarCompra(e) {
    alert("Tu pedido ha sido confirmado");
    localStorage.clear();
    localStorage.setItem("Pizzas Confirmadas", JSON.stringify(arrayPizzasConfirmadas));
    $(".pizzasPedidos__pizzas").slideUp("slow", () => {
        $(".pizzasPedidos__pizzas").remove();
    });
}

// seccion de codigo donde vamos armar las pizzas

let precioPizzaArmada = 7000;

$(".botonIngrediente").click((e) => {

    $("#armarPizza_tamaño").attr("disabled", "true");
    $("#armarPizza_cantidad").attr("disabled", "true");
    $("#btnOrdenarArmada").removeAttr("style");
    switch (e.target.value) {
        case "Piña":
            switch ($("#armarPizza_tamaño").val()) {
                case "Personal":
                    precioPizzaArmada += ((800) * ($("#armarPizza_cantidad").val()));
                    $("#tdPrecio").text(precioPizzaArmada);
                    $("#tdIngredientes").text($("#tdIngredientes").text() + "Piña ");
                    break;
                case "Mediana":
                    precioPizzaArmada += ((1300) * ($("#armarPizza_cantidad").val()));
                    $("#tdPrecio").text(precioPizzaArmada);
                    $("#tdIngredientes").text($("#tdIngredientes").text() + "Piña ");
                    break;
                case "Familiar":
                    precioPizzaArmada += ((1800) * ($("#armarPizza_cantidad").val()));
                    $("#tdPrecio").text(precioPizzaArmada);
                    $("#tdIngredientes").text($("#tdIngredientes").text() + "Piña ");
                    break;
            }
            break;
        case "Jamon":
            switch ($("#armarPizza_tamaño").val()) {
                case "Personal":
                    precioPizzaArmada += ((1100) * ($("#armarPizza_cantidad").val()));
                    $("#tdPrecio").text(precioPizzaArmada);
                    $("#tdIngredientes").text($("#tdIngredientes").text() + "Jamon ");
                    break;
                case "Mediana":
                    precioPizzaArmada += ((1300) * ($("#armarPizza_cantidad").val()));
                    $("#tdPrecio").text(precioPizzaArmada);
                    $("#tdIngredientes").text($("#tdIngredientes").text() + "Jamon ");
                    break;
                case "Familiar":
                    precioPizzaArmada += ((1500) * ($("#armarPizza_cantidad").val()));
                    $("#tdPrecio").text(precioPizzaArmada);
                    $("#tdIngredientes").text($("#tdIngredientes").text() + "Jamon ");
                    break;
            }
            break;
        case "Tocineta":
            switch ($("#armarPizza_tamaño").val()) {
                case "Personal":
                    precioPizzaArmada += ((1000) * ($("#armarPizza_cantidad").val()));
                    $("#tdPrecio").text(precioPizzaArmada);
                    $("#tdIngredientes").text($("#tdIngredientes").text() + "Tocineta ");
                    break;
                case "Mediana":
                    precioPizzaArmada += ((1500) * ($("#armarPizza_cantidad").val()));
                    $("#tdPrecio").text(precioPizzaArmada);
                    $("#tdIngredientes").text($("#tdIngredientes").text() + "Tocineta ");
                    break;
                case "Familiar":
                    precioPizzaArmada += ((2000) * ($("#armarPizza_cantidad").val()));
                    $("#tdPrecio").text(precioPizzaArmada);
                    $("#tdIngredientes").text($("#tdIngredientes").text() + "Tocineta ");
                    break;
            }
            break;
        case "Jalapeños":
            switch ($("#armarPizza_tamaño").val()) {
                case "Personal":
                    precioPizzaArmada += ((700) * ($("#armarPizza_cantidad").val()));
                    $("#tdPrecio").text(precioPizzaArmada);
                    $("#tdIngredientes").text($("#tdIngredientes").text() + "Jalapeños ");
                    break;
                case "Mediana":
                    precioPizzaArmada += ((900) * ($("#armarPizza_cantidad").val()));
                    $("#tdPrecio").text(precioPizzaArmada);
                    $("#tdIngredientes").text($("#tdIngredientes").text() + "Jalapeños ");
                    break;
                case "Familiar":
                    precioPizzaArmada += ((1000) * ($("#armarPizza_cantidad").val()));
                    $("#tdPrecio").text(precioPizzaArmada);
                    $("#tdIngredientes").text($("#tdIngredientes").text() + "Jalapeños ");
                    break;
            }
            break;
        case "Salami":
            switch ($("#armarPizza_tamaño").val()) {
                case "Personal":
                    precioPizzaArmada += ((900) * ($("#armarPizza_cantidad").val()));
                    $("#tdPrecio").text(precioPizzaArmada);
                    $("#tdIngredientes").text($("#tdIngredientes").text() + "Salami ");
                    break;
                case "Mediana":
                    precioPizzaArmada += ((1050) * ($("#armarPizza_cantidad").val()));
                    $("#tdPrecio").text(precioPizzaArmada);
                    $("#tdIngredientes").text($("#tdIngredientes").text() + "Salami ");
                    break;
                case "Familiar":
                    precioPizzaArmada += ((1200) * ($("#armarPizza_cantidad").val()));
                    $("#tdPrecio").text(precioPizzaArmada);
                    $("#tdIngredientes").text($("#tdIngredientes").text() + "Salami ");
                    break;
            }
            break;
        case "Peperoni":
            switch ($("#armarPizza_tamaño").val()) {
                case "Personal":
                    precioPizzaArmada += ((900) * ($("#armarPizza_cantidad").val()));
                    $("#tdPrecio").text(precioPizzaArmada);
                    $("#tdIngredientes").text($("#tdIngredientes").text() + "Peperoni ");
                    break;
                case "Mediana":
                    precioPizzaArmada += ((1050) * ($("#armarPizza_cantidad").val()));
                    $("#tdPrecio").text(precioPizzaArmada);
                    $("#tdIngredientes").text($("#tdIngredientes").text() + "Peperoni ");
                    break;
                case "Familiar":
                    precioPizzaArmada += ((1200) * ($("#armarPizza_cantidad").val()));
                    $("#tdPrecio").text(precioPizzaArmada);
                    $("#tdIngredientes").text($("#tdIngredientes").text() + "Peperoni ");
                    break;
            }
            break;
        case "Maiz":
            switch ($("#armarPizza_tamaño").val()) {
                case "Personal":
                    precioPizzaArmada += ((500) * ($("#armarPizza_cantidad").val()));
                    $("#tdPrecio").text(precioPizzaArmada);
                    $("#tdIngredientes").text($("#tdIngredientes").text() + "Maiz ");
                    break;
                case "Mediana":
                    precioPizzaArmada += ((900) * ($("#armarPizza_cantidad").val()));
                    $("#tdPrecio").text(precioPizzaArmada);
                    $("#tdIngredientes").text($("#tdIngredientes").text() + "Maiz ");
                    break;
                case "Familiar":
                    precioPizzaArmada += ((1100) * ($("#armarPizza_cantidad").val()));
                    $("#tdPrecio").text(precioPizzaArmada);
                    $("#tdIngredientes").text($("#tdIngredientes").text() + "Maiz ");
                    break;
            }
            break;
        case "Pollo":
            switch ($("#armarPizza_tamaño").val()) {
                case "Personal":
                    precioPizzaArmada += ((850) * ($("#armarPizza_cantidad").val()));
                    $("#tdPrecio").text(precioPizzaArmada);
                    $("#tdIngredientes").text($("#tdIngredientes").text() + "Pollo ");
                    break;
                case "Mediana":
                    precioPizzaArmada += ((1150) * ($("#armarPizza_cantidad").val()));
                    $("#tdPrecio").text(precioPizzaArmada);
                    $("#tdIngredientes").text($("#tdIngredientes").text() + "Pollo ");
                    break;
                case "Familiar":
                    precioPizzaArmada += ((1300) * ($("#armarPizza_cantidad").val()));
                    $("#tdPrecio").text(precioPizzaArmada);
                    $("#tdIngredientes").text($("#tdIngredientes").text() + "Pollo ");
                    break;
            }
            break;
        case "Tomate":
            switch ($("#armarPizza_tamaño").val()) {
                case "Personal":
                    precioPizzaArmada += ((800) * ($("#armarPizza_cantidad").val()));
                    $("#tdPrecio").text(precioPizzaArmada);
                    $("#tdIngredientes").text($("#tdIngredientes").text() + "Tomate ");
                    break;
                case "Mediana":
                    precioPizzaArmada += ((1300) * ($("#armarPizza_cantidad").val()));
                    $("#tdPrecio").text(precioPizzaArmada);
                    $("#tdIngredientes").text($("#tdIngredientes").text() + "Tomate ");
                    break;
                case "Familiar":
                    precioPizzaArmada += ((1800) * ($("#armarPizza_cantidad").val()));
                    $("#tdPrecio").text(precioPizzaArmada);
                    $("#tdIngredientes").text($("#tdIngredientes").text() + "Tomate ");
                    break;
            }
            break;
        case "Procciuto":
            switch ($("#armarPizza_tamaño").val()) {
                case "Personal":
                    precioPizzaArmada += ((1500) * ($("#armarPizza_cantidad").val()));
                    $("#tdPrecio").text(precioPizzaArmada);
                    $("#tdIngredientes").text($("#tdIngredientes").text() + "Procciuto ");
                    break;
                case "Mediana":
                    precioPizzaArmada += ((1800) * ($("#armarPizza_cantidad").val()));
                    $("#tdPrecio").text(precioPizzaArmada);
                    $("#tdIngredientes").text($("#tdIngredientes").text() + "Procciuto ");
                    break;
                case "Familiar":
                    precioPizzaArmada += ((2000) * ($("#armarPizza_cantidad").val()));
                    $("#tdPrecio").text(precioPizzaArmada);
                    $("#tdIngredientes").text($("#tdIngredientes").text() + "Procciuto ");
                    break;
            }
            break;
    }


})

$("#armarPizza_tamaño").change((e) => {
    $("#tdTamaño").text(e.target.value);
    console.log(precioPizzaArmada);
}).change();

$("#armarPizza_cantidad").change((e) => {
    $("#tdCantidad").text(e.target.value);
    switch ($("#armarPizza_tamaño").val()) {
        case "Personal":
            precioPizzaArmada = 7000 * (e.target.value);
            break;
        case "Mediana":
            precioPizzaArmada = 8000 * (e.target.value);
            break;
        case "Familiar":
            precioPizzaArmada = 10000 * (e.target.value);
            break;
    }

    console.log(precioPizzaArmada);
}).change();

// accion del boton armar de nuevo, reinicia los campos de la tabla donde se ve la pizza armada

$("#btnArmarDeNuevo").click(() => {
    $("#armarPizza_tamaño").removeAttr("disabled");
    $("#armarPizza_tamaño").val("Personal");
    $("#armarPizza_cantidad").removeAttr("disabled");
    $("#armarPizza_cantidad").val(1);
    $("#tdPrecio").text(0);
    $("#tdCantidad").text(1);
    $("#tdIngredientes").text("");
    precioPizzaArmada = 7000;
    $("#btnOrdenarArmada").attr("style", "display:none");
});


//codigo que añade pizza a la seccion de confirmacion del pedido 

$("#btnOrdenarArmada").click(function () {
    let nuevoDiv = document.createElement("div");
    nuevoDiv.setAttribute("class", "row pizzasPedidos__pizzas");
    nuevoDiv.innerHTML = `<div class="col-md-2">Armada</div>`;
    nuevoDiv.innerHTML += `<div class="col-md-4">${$("#tdIngredientes").text()}</div>`;
    nuevoDiv.innerHTML += `<div class="col-md-2">${$("#tdTamaño").text()}</div>`;
    nuevoDiv.innerHTML += `<div class="col-md-2">${$("#tdCantidad").text()}</div>`;
    nuevoDiv.innerHTML += `<div class="col-md-2">${$("#tdPrecio").text()}</div>`;
    $("#btnConfirmarCompra").before(nuevoDiv).attr("style", "display:block");
    window.scrollBy(0, window.innerHeight);
});


