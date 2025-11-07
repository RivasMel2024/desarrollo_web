import { createRecipe, deleteRecipe, getAllRecipes, getRecipeBy, updateRecipe } from "./service/recipeService.js";

const receta1 = {
    name: "Pupusa",
    category: "almuerzo",
    description: "tortilla de arroz con queso",
    ingredients: ["Harina", "quesillo", "frijoles", "chicharron"],
    imageUrl: ""
}

// Agregar documentos a la coleccion, o una receta a recipies
// const resultado = createRecipe(receta1)
// console.log(resultado);

// Enlistando todas las recetas
const { data } = await getAllRecipes()
console.log(data);

// Actualizar una receta 
// await updateRecipe("tdijrwUW926jt5ynorft", receta1)

// Recuperar una receta en especifico
const receta = await getRecipeBy("tdijrwUW926jt5ynorft")
console.log(receta.data);

// Eliminamos un registro
await deleteRecipe("pVVPuCtL1O3xWsGswtEe")

const receta2 = await getRecipeBy("pVVPuCtL1O3xWsGswtEe")
console.log(receta2);



