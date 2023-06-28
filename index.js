class Carrito {
    constructor() {
        this.lista = []
    }
    agregar(cosa) {
        this.lista.push(cosa)
    }
    remover(eliminado) {
        this.lista.splice(eliminado, 1)
    }
    vaciar() {
        this.lista.splice(0, this.lista.length)
    }
    cojer() {
        return this.lista
    }
}
class Cantidad {
    constructor(cant) {
        this.cantidad = cant
    }
}
class Articulo {
    constructor(nom, pre, clas, cant) {
        this.nombre = nom
        this.precio = pre
        this.clase = clas
        this.cantidad = cant
    }
}

function agregacion() {

    let nombre1 = document.querySelector("#articulo").value
    let precio1 = document.querySelector("#precio").value
    let cantidad1 = document.querySelector("#cantidad").value
    let clase1 = document.querySelector(`input[name="radios"]:checked`).value
    let cantidad_objeto = new Cantidad(cantidad1)
    let articulo_objeto = new Articulo(nombre1, precio1, clase1, cantidad_objeto)

    console.log(clase1)
    carrito_objeto.agregar(articulo_objeto)
    console.log(carrito_objeto)

    localStorage.setItem("carrito_local", JSON.stringify(carrito_objeto.lista))
    escribir()
}
    
function eliminar(index) {
    carrito_objeto.remover(index)
    localStorage.setItem("carrito_local", JSON.stringify(carrito_objeto.lista))
    escribir()  
}

function escribir() {
    escribir_list.innerHTML = ``;
    const compras = carrito_objeto.cojer();
    compras.forEach((compra, index) => {
        const { nombre, precio , clase, cantidad } = compra;
        const list = document.createElement('div');
        list.innerHTML = `       
    <div class="row mt-3 mb-4 mx-3">
        <ul class="col-4 list-group">
            <li class="list-group-item ">${nombre}</li>
            <li class="list-group-item ">${precio}</li>  
            <li class="list-group-item ">${clase}</li>
            <li class="list-group-item ">${cantidad.cantidad}</li>
        </ul>   
        <div class="col-2 d-flex flex-column mt-5">
            <input class="btn btn-danger" type="submit" value="Eliminar" id="eliminar" onclick="eliminar(${index})">  
        </div> 
    </div>
    `;
        escribir_list.appendChild(list);
    });
}

function limpiar() {
    carrito_objeto.vaciar()
    localStorage.setItem("carrito_local", JSON.stringify(carrito_objeto.lista)) 
    escribir()
}

////////////////////////////////////////////////////////////////////////////////////////////////

let carrito_objeto = new Carrito()

window.localStorage.getItem("carrito_local") ? carrito_objeto.lista = JSON.parse(window.localStorage.getItem("carrito_local")) : window.localStorage.setItem("carrito_local", JSON.stringify(carrito_objeto.lista))

let escribir_list = document.querySelector("#listado")
let agregar1 = document.querySelector("#adds")
let vaciar1 = document.querySelector("#clear")

escribir()
vaciar1.onclick = limpiar;
agregar1.onclick = agregacion;
