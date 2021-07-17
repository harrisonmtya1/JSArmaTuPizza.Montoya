class cliente{

    constructor(nombre,telefono,direccion) {
        this.nombre=nombre;
        this.telefono=telefono;
        this.direccion=direccion;
    }

    solicitarDatos(){
        this.nombre=prompt("Por favor ingrese su nombre");
        this.telefono=prompt("Telefono de contacto");
        this.direccion=prompt("Direccion de domicilio");
        alert("Los Datos ingresados son:" +"\nNombre: "+this.nombre+"\nTelefono: "+this.telefono+"\nDireccion: "+this.direccion);
    }

    

}

class pizza{

    constructor(tamaño,numeroIngredientes){
        this.tamaño=tamaño;
        this.numeroIngredientes=numeroIngredientes;
    }

    armarPizza(){
        this.tamaño=prompt("Ingrese el tamaño de su pizza\n"+"Escoja entre las siguientes opciones: familiar, mediana, personal");
        this.numeroIngredientes=prompt("Ingrese la cantidad de ingredientes que desea: 1, 2, 3, 4 o 5");
    }

    calcuparPrecio(tamañoPizza,numeroIngredientes){
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
    
}

let nombreCliente="";
let telefonoCliente="";
let direccionCliente="";
let numeroIngredientes=1;
let tamañoPizza="";
let precioFinal=0;

let objPizza=new pizza(tamañoPizza,numeroIngredientes);
let objCliente=new cliente(nombreCliente,telefonoCliente,direccionCliente);

alert("Bienvenido a la Pizzeria!!" +"\nA continuacion ingresa tus Datos para inciar el proceso de compra");

objCliente.solicitarDatos();
objPizza.armarPizza();
precioFinal=objPizza.calcuparPrecio(objPizza.tamaño,objPizza.numeroIngredientes);
alert("El costo de su pedido es " + precioFinal + " e incluye el domicilio");










