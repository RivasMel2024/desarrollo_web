// Declaracion de variables

let nombre = 'Melisa Rivas'
console.log(nombre)

const nombres = ['Melisa', 'Rivas', 'Melisa', 'Rivas']
nombres.push('Ale', 'Ali', 'Chris')
console.log(nombres);

// Operadores relacionales

console.log('1' == 1);
console.log('1' === 1);
console.log(1 == true);
console.log(5 == true);
console.log(0 == false);
console.log('' == false);
console.log([] == false );

console.log(1+'1');
console.log(1-'1');
console.log('0' == []); // Compara una cadena vacia con un 0


// For of
for ( const nombre of nombres){
    console.log(nombre);   
}

/* Usar const siempre que sea posible, usar let cuando se quiera sobre escrbir y nunca usar var
typing cohersion, o cohersion es cuando javascript intenta llevar las dos variables a un tipo comun, esto pasa
sobre todo en cuando se esta haciendo comparaciones
El === deshabilita la cohersion
*/




