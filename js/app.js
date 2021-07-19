let nombreCliente="";
let telefonoCliente="";
let direccionCliente="";
let numeroIngredientes=1;
let tamañoPizza="";
let precioFinal=0;

alert("Bienvenido a la Pizzeria!!" +"\nA continuacion ingresa tus Datos para inciar el proceso de compra");

ingresarDatosCliente();
armarPizza();
precioFinal=calcuparPrecio(tamañoPizza,numeroIngredientes);
alert("El costo de su pedido es " + precioFinal + " e incluye el domicilio");


function ingresarDatosCliente(){
    nombreCliente=prompt("Por favor ingrese su nombre");
    telefonoCliente=parseInt(prompt("Telefono de contacto"));
    direccionCliente=prompt("Direccion de domicilio");
    alert("Los Datos ingresados son:" +"\nNombre: "+nombreCliente+"\nTelefono: "+telefonoCliente+"\nDireccion: "+direccionCliente);
}

function armarPizza(){
   tamañoPizza=prompt("Ingrese el tamaño de su pizza\n"+"Escoja entre las siguientes opciones: familiar, mediana, personal").toLocaleLowerCase();
   numeroIngredientes= parseInt(prompt("Ingrese la cantidad de ingredientes que desea: 1, 2, 3, 4 o 5"));
   debugger 
}

function calcuparPrecio(tamañoPizza,numeroIngredientes){
    switch(tamañoPizza){
        case "familiar":
            return numeroIngredientes * 3000 + 20000;
        case "mediana":
            return numeroIngredientes * 2000 + 15000;
        case "personal":
            return numeroIngredientes * 1000 + 10000;
        default:
            return 45000;
        
    }

}

