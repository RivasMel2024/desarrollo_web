// FETCH devuelve una promesa. 
// Si se cumple es porque la api esta contestando correctamentw
fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json()) //JSON.parse es una operacion bloqueante, por eso no se hace con ese convertor
      .then(json => {
            console.log(json.length);        
            const completed = json.filter(todo => todo.completed == true)
            console.log(completed.length);
            console.log(json)}
        )
      .catch(err => console.log(err.message))
      