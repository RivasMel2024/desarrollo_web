const arregloNumeros = [17, 62, 33, 44, 75]
console.log(suma(...arregloNumeros));

// Funcion declarada
function suma(...numeros){
    let resultado = 0
    for(num of numeros){
        resultado += num
    }

    return resultado
}

// Funcion expresada
const calcularMedia = function(...numeros){
    let sumar = suma(...numeros)
    return sumar / numeros.length
}

console.log(calcularMedia(...arregloNumeros));

// Funcion flecha => calcular distancia de un punto al origen

const calcularDistancia = (x, y) => Math.sqrt(x**2 + y**2)

console.log(calcularDistancia(48, 54).toFixed(2)); // toFixed para que se vea con dos decimales

/* #################################################################################################### */

const datosAlumnos = [
    { nombre: "Melisa", edad: 20, materiasInscritas: [
        { codigo: "Req", nota: 10 },
        { codigo: "Agiles", nota: 8 },
        { codigo: "Web", nota: 9 }
    ]},
    { nombre: "Alisson", edad: 18, materiasInscritas: [
        { codigo: "Req", nota: 9 },
        { codigo: "Web", nota: 9 }
    ]},
    { nombre: "Ale", edad: 21, materiasInscritas: [
        { codigo: "Req", nota: 10 },
        { codigo: "Agiles", nota: 5 }
    ]},
    { nombre: "Chris", edad: 19, materiasInscritas: [
        { codigo: "Agiles", nota: 7 },
        { codigo: "Web", nota: 7 }
    ]}
]

// Obtener el arreglo de nombres
const nombres = datosAlumnos.map(alumno => alumno.nombre)
console.log(nombres);

// Filtrar los datos de alumnos que lleven mas de dos materias
const masDosMaterias = datosAlumnos.filter(a => a.materiasInscritas.length > 2)
console.log(masDosMaterias);

// La lista de nombres de estudiantes con promedio >= 8.5
    // Con funcion de calcularMedia()
const listaNombres = datosAlumnos.filter( 
    a => calcularMedia(...a.materiasInscritas.map(m => m.nota)) >= 8.5
).map(a => a.nombre)

console.log(listaNombres);

    // Con .reduce
const listadoNombres = datosAlumnos
    .filter(m => m.materiasInscritas
        .reduce((sum, materia) => sum + materia.nota, 0) / m.materiasInscritas.length >= 8.5
    ).map(a => a.nombre)

console.log(listadoNombres);
 