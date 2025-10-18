let nombre = 'Melisa Rivas'
nombre[0] = 'm' // Los string son inmutables, este intento de modificacion no tiene efecto
nombre = nombre.toUpperCase() // No se modifica el objeto anterior, sino que se crea un nuevo que se asigna a la misma variable
console.log(nombre);
